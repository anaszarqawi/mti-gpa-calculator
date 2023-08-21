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

export const getGradeLetter = (gradePoint: number): string => {
  if (gradePoint < 1.6) return 'F';
  else if (gradePoint < 2.0) return 'D';
  else if (gradePoint < 2.2) return 'D+';
  else if (gradePoint < 2.4) return 'C-';
  else if (gradePoint < 2.6) return 'C';
  else if (gradePoint < 2.8) return 'C+';
  else if (gradePoint < 3.0) return 'B-';
  else if (gradePoint < 3.2) return 'B';
  else if (gradePoint < 3.4) return 'B+';
  else if (gradePoint < 3.6) return 'A-';
  else if (gradePoint < 3.8) return 'A';
  else if (gradePoint <= 4.0) return 'A+';
  else return 'Grade Not Found';
};

export const getEstimateGrade = (gpa: number) => {
  if (gpa < 1.6) return 'Very Weak';
  else if (gpa < 2.0) return 'Weak';
  else if (gpa < 2.4) return 'Sufficient';
  else if (gpa < 3.0) return 'Good';
  else if (gpa < 3.6) return 'Very Good';
  else if (gpa <= 4.0) return 'Excellent';
};

export const getGPA = (grades: string[]): number => {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    if (grades[i] !== 'F' && grades[i] !== 'PASS') {
      const gradePoint = getGradePoint(grades[i]);
      const credit = 3;
      totalGradePoints += gradePoint * credit;
      totalCredits += credit;
    }
  }
  if (totalCredits === 0) return 0;
  const gpa = totalGradePoints / totalCredits;
  return gpa;
};

export const getGpaPercentage = (gpa: number): number => {
  return (gpa / 4) * 100;
};

export const getGPAInfo = (grades: string[], target: string): string => {
  if (grades[0] === 'PASS') return 'PASS';
  if (grades.length === 0) return 'No Grades Yet';
  const gpa = getGPA(grades);
  const gradeLetter = getGradeLetter(gpa);
  const estimateGrade = getEstimateGrade(gpa);
  const gpaPercentage = getGpaPercentage(gpa);

  if (target === 'gpa') return gpa.toFixed(2);
  else if (target === 'estimate') return `${gpaPercentage.toFixed(2)}% | ${gradeLetter} | ${estimateGrade}`;
  else return '';
};
