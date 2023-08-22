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
  if (gpa >= 3.6) return 'Excellent';
  else if (gpa >= 3) return 'Very Good';
  else if (gpa >= 2.4) return 'Good';
  else if (gpa >= 2) return 'Sufficient';
  else if (gpa >= 1.6) return 'Weak';
  else return 'Very Weak';
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
  const gpaPercentage = getGpaPercentage(+gpa.toFixed(2));
  const gradeLetter = getGradeLetter(gpaPercentage);
  const estimateGrade = getEstimateGrade(+gpa.toFixed(2));

  console.log(gpa, gpaPercentage, gradeLetter, estimateGrade);

  if (target === 'gpa') return gpa.toFixed(2);
  else if (target === 'estimate') return `${gpaPercentage.toFixed(2)}% | ${gradeLetter} | ${estimateGrade}`;
  else return '';
};
