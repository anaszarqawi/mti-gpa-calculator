import { Semester, Course, Grade } from '../types/types';

const bestSemester = (semesters: Semester[]) => {
  let bestSemester = semesters[0];
  for (const semester of semesters) {
    if (semester.gpa > bestSemester.gpa) {
      bestSemester = semester;
    }
  }
  return bestSemester;
};

const worstSemester = (semesters: Semester[]) => {
  let worstSemester = semesters[0];
  for (const semester of semesters) {
    if (semester.gpa < worstSemester.gpa) {
      worstSemester = semester;
    }
  }

  return worstSemester;
};

const averageGPA = (semesters: Semester[]) => {
  let sum = 0;
  for (const semester of semesters) {
    sum += +semester.gpa;
  }
  return sum / semesters.length;
};

const totalCourses = (semesters: Semester[]) => {
  let sum = 0;
  for (const semester of semesters) {
    sum += semester.courses.length;
  }
  return sum;
};

const totalSemesters = (semesters: Semester[]) => {
  return semesters.length;
};

const bestCourses = (semesters: Semester[]) => {
  let bestCourses = [];
  for (const semester of semesters) {
    for (const course of semester.courses) {
      if (course.grade === 'A+' || course.grade === 'A' || course.grade === 'A-') {
        bestCourses.push(course);
      }
    }
  }

  return sortCoursesByGrade(bestCourses);
};

const worstCourses = (semesters: Semester[]) => {
  let worstCourses = [];
  for (const semester of semesters) {
    for (const course of semester.courses) {
      if (course.grade === 'F' || course.grade === 'D' || course.grade === 'D+') {
        worstCourses.push(course);
      }
    }
  }

  return sortCoursesByGrade(worstCourses);
};

export const getInsights = (semesters: Semester[]) => {

  const insights = {
    bestSemester: bestSemester(semesters),
    worstSemester: worstSemester(semesters),
    averageGPA: averageGPA(semesters),
    totalCourses: totalCourses(semesters),
    totalSemesters: totalSemesters(semesters),
    bestCourses: bestCourses(semesters),
    worstCourses: worstCourses(semesters),
  };

  console.log(insights);

  return insights;
};


function sortCoursesByGrade(courses: Course[]): Course[] {
  const gradeOrder: Record<Grade, number> = {
    "A+": 1,
    "A": 2,
    "A-": 3,
    "B+": 4,
    "B": 5,
    "B-": 6,
    "C+": 7,
    "C": 8,
    "C-": 9,
    "D+": 10,
    "D": 11,
    "F": 12,
  };

  const gradeKey = (course: Course): number => gradeOrder[course.grade] ?? 14; // Default to lowest if not found

  return courses.sort((course1, course2) => gradeKey(course1) - gradeKey(course2));
}

