import { Course } from '../types/types';
import { getInsights } from './insights_methods';

export const getGradePoint = (gradeName: string): number => {
  if (gradeName === 'A+') return 4.0;
  else if (gradeName === 'A') return 3.8;
  else if (gradeName === 'A-') return 3.6;
  else if (gradeName === 'B+') return 3.4;
  else if (gradeName === 'B') return 3.2;
  else if (gradeName === 'B-') return 3.0;
  else if (gradeName === 'C+') return 2.8;
  else if (gradeName === 'C') return 2.6;
  else if (gradeName === 'C-') return 2.4;
  else if (gradeName === 'D+') return 2.2;
  else if (gradeName === 'D') return 2.0;
  else if (gradeName === 'F') return 0;
  else return 0;
};

export const getGradeLetter = (percentage: number): string => {
  if (percentage >= 95) return 'A+';
  else if (percentage >= 90) return 'A';
  else if (percentage >= 85) return 'A-';
  else if (percentage >= 82) return 'B+';
  else if (percentage >= 79) return 'B';
  else if (percentage >= 75) return 'B-';
  else if (percentage >= 72) return 'C+';
  else if (percentage >= 69) return 'C';
  else if (percentage >= 65) return 'C-';
  else if (percentage >= 60) return 'D+';
  else if (percentage >= 50) return 'D';
  else return 'F';
};

export const getEstimateGrade = (gpa: number): string => {
  if (gpa < 1.6) return 'Very Weak';
  else if (gpa < 2) return 'Weak';
  else if (gpa < 2.4) return 'Sufficient';
  else if (gpa < 3.0) return 'Good';
  else if (gpa < 3.6) return 'Very Good';
  else return 'Excellent';
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
      const credit = 3;
      totalGradePoints += gradePoint * credit;
      totalCredits += credit;
    }
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

  // console.log(gpa, gpaPercentage, gradeLetter, estimateGrade);

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
