import { Course, Semester } from '../types/types';
import { getInsights } from './insights_methods';

export const DEFAULT_GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  A: 3.8,
  'A-': 3.6,
  'B+': 3.4,
  B: 3.2,
  'B-': 3.0,
  'C+': 2.8,
  C: 2.6,
  'C-': 2.4,
  'D+': 2.2,
  D: 2.0,
  F: 0,
};

/** Min percentage required for each letter */
export const DEFAULT_GRADE_LETTERS: Record<string, number> = {
  'A+': 95,
  A: 90,
  'A-': 85,
  'B+': 82,
  B: 79,
  'B-': 75,
  'C+': 72,
  C: 69,
  'C-': 65,
  'D+': 60,
  D: 50,
  F: 0,
};

/** Min GPA required for each estimate label */
export const DEFAULT_ESTIMATE_GRADES: Record<string, number> = {
  Excellent: 3.6,
  'Very Good': 3.0,
  Good: 2.4,
  Sufficient: 2.0,
  Weak: 1.6,
  'Very Weak': 0,
};

const GRADE_POINTS_KEY = 'gradePoints';
const GRADE_LETTERS_KEY = 'gradeLetters';
const ESTIMATE_GRADES_KEY = 'estimateGrades';

let gradePointsCache: Record<string, number> = { ...DEFAULT_GRADE_POINTS };
let gradeLettersCache: Record<string, number> = { ...DEFAULT_GRADE_LETTERS };
let estimateGradesCache: Record<string, number> = { ...DEFAULT_ESTIMATE_GRADES };

const syncToChromeStorage = (key: string, value: Record<string, number>) => {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    chrome.storage.local.set({ [key]: value });
  }
};

const loadMapFromLocalStorage = (
  key: string,
  defaults: Record<string, number>
): Record<string, number> => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) };
    }
  } catch {
    /* ignore */
  }
  return { ...defaults };
};

export const getDefaultGradePoints = (): Record<string, number> => ({ ...DEFAULT_GRADE_POINTS });
export const getDefaultGradeLetters = (): Record<string, number> => ({ ...DEFAULT_GRADE_LETTERS });
export const getDefaultEstimateGrades = (): Record<string, number> => ({ ...DEFAULT_ESTIMATE_GRADES });

export const setGradePointsCache = (points: Record<string, number>) => {
  gradePointsCache = { ...DEFAULT_GRADE_POINTS, ...points };
};

export const setGradeLettersCache = (letters: Record<string, number>) => {
  gradeLettersCache = { ...DEFAULT_GRADE_LETTERS, ...letters };
};

export const setEstimateGradesCache = (estimates: Record<string, number>) => {
  estimateGradesCache = { ...DEFAULT_ESTIMATE_GRADES, ...estimates };
};

export const loadGradePointsFromLocalStorage = (): Record<string, number> => {
  gradePointsCache = loadMapFromLocalStorage(GRADE_POINTS_KEY, DEFAULT_GRADE_POINTS);
  return { ...gradePointsCache };
};

export const loadGradeLettersFromLocalStorage = (): Record<string, number> => {
  gradeLettersCache = loadMapFromLocalStorage(GRADE_LETTERS_KEY, DEFAULT_GRADE_LETTERS);
  return { ...gradeLettersCache };
};

export const loadEstimateGradesFromLocalStorage = (): Record<string, number> => {
  estimateGradesCache = loadMapFromLocalStorage(ESTIMATE_GRADES_KEY, DEFAULT_ESTIMATE_GRADES);
  return { ...estimateGradesCache };
};

export const loadAllSettingsFromLocalStorage = () => {
  const gradePoints = loadGradePointsFromLocalStorage();
  const gradeLetters = loadGradeLettersFromLocalStorage();
  const estimateGrades = loadEstimateGradesFromLocalStorage();
  return { gradePoints, gradeLetters, estimateGrades };
};

export const saveGradePoints = (points: Record<string, number>) => {
  gradePointsCache = { ...DEFAULT_GRADE_POINTS, ...points };
  localStorage.setItem(GRADE_POINTS_KEY, JSON.stringify(gradePointsCache));
  syncToChromeStorage(GRADE_POINTS_KEY, gradePointsCache);
};

export const saveGradeLetters = (letters: Record<string, number>) => {
  gradeLettersCache = { ...DEFAULT_GRADE_LETTERS, ...letters };
  localStorage.setItem(GRADE_LETTERS_KEY, JSON.stringify(gradeLettersCache));
  syncToChromeStorage(GRADE_LETTERS_KEY, gradeLettersCache);
};

export const saveEstimateGrades = (estimates: Record<string, number>) => {
  estimateGradesCache = { ...DEFAULT_ESTIMATE_GRADES, ...estimates };
  localStorage.setItem(ESTIMATE_GRADES_KEY, JSON.stringify(estimateGradesCache));
  syncToChromeStorage(ESTIMATE_GRADES_KEY, estimateGradesCache);
};

export const getGradePoint = (gradeName: string): number => {
  return gradePointsCache[gradeName] ?? 0;
};

const resolveByMinThreshold = (value: number, map: Record<string, number>, fallback: string): string => {
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
  for (const [label, min] of entries) {
    if (value >= min) return label;
  }
  return fallback;
};

export const getGradeLetter = (percentage: number): string => {
  return resolveByMinThreshold(percentage, gradeLettersCache, 'F');
};

export const getEstimateGrade = (gpa: number): string => {
  return resolveByMinThreshold(gpa, estimateGradesCache, 'Very Weak');
};

export const recalculateSemesters = (semesters: Semester[]): Semester[] => {
  return semesters.map((semester) => {
    const courses = semester.courses as Course[] | string[];
    if (!courses || courses.length === 0 || courses[0] === 'PASS') {
      return semester;
    }
    return {
      ...semester,
      gpa: getGPAInfo(courses as any, 'gpa'),
      estimate: getGPAInfo(courses as any, 'estimate'),
      credits: getGPAInfo(courses as any, 'credits'),
      gradePoints: getGPAInfo(courses as any, 'gradePoints'),
    };
  });
};

export const getGPA = (
  courses: Course[] | any
): {
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
} => {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    if (course.grade !== 'F' && courses[0] !== 'PASS') {
      const gradePoint = getGradePoint(course.grade);
      totalGradePoints += gradePoint * course.credit;
    }
    totalCredits += course.credit;
  }
  if (totalCredits === 0) return { gpa: 0, totalCredits: 0, totalGradePoints: 0 };
  const gpa = totalGradePoints / totalCredits;
  return { gpa, totalCredits, totalGradePoints };
};

export const getGpaPercentage = (gpa: number): number => {
  return (gpa / 4) * 100;
};

export const getTotalGPA = (semesters: any) => {
  if (semesters.length === 0) {
    chrome.storage.sync.set({
      insights: null,
    });
    return 0;
  }
  let totalCredits = 0;
  let totalGradePoints = 0;
  for (const semester of semesters) {
    totalCredits += +semester.credits;
    totalGradePoints += +semester.gradePoints;
  }
  const insights = getInsights(semesters);
  chrome.storage.sync.set({
    insights: insights,
  });
  return (totalGradePoints / totalCredits).toFixed(2);
};

export const getGPAInfo = (grades: string[], target: string): string => {
  if (grades[0] === 'PASS') return 'PASS';
  if (grades.length === 0) return 'No Grades Yet';
  const gpa = getGPA(grades);
  const gpaPercentage = getGpaPercentage(+gpa.gpa.toFixed(2));
  const gradeLetter = getGradeLetter(gpaPercentage);
  const estimateGrade = getEstimateGrade(+gpa.gpa.toFixed(2));

  if (target === 'gpa') return gpa.gpa.toFixed(2);
  else if (target === 'credits') return gpa.totalCredits.toFixed(2);
  else if (target === 'gradePoints') return gpa.totalGradePoints.toFixed(2);
  else if (target === 'estimate') return `${gpaPercentage.toFixed(2)}% | ${gradeLetter} | ${estimateGrade}`;
  else return '';
};

export const getGeneralEstimate = (gpa: string): string => {
  const gpaPercentage = getGpaPercentage(+gpa);
  const gradeLetter = getGradeLetter(gpaPercentage);
  const estimateGrade = getEstimateGrade(+gpa);

  return `${gpaPercentage.toFixed(2)}% | ${gradeLetter} | ${estimateGrade}`;
};
