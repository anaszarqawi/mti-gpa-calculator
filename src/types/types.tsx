export type Grade = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "F";


export interface Semester {
  name: string;
  gpa: string;
  estimate: string;
  credits: string;
  gradePoints: string;
  courses: Course[];
}

export interface Course {
  name: string;
  grade: Grade;
  code: string;
}

export interface Insights {
  bestSemester: Semester;
  worstSemester: Semester;
  averageGPA: number;
  totalCourses: number;
  totalSemesters: number;
  bestCourses: Course[];
  worstCourses: Course[];
}
