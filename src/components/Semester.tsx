import React from 'react';
import { Semester as SemesterType } from '../types/types';

const Semester = ({
  semester,
  currentSemester,
  handelRemoveSemester,
}: {
  semester: SemesterType;
  currentSemester?: string;
  handelRemoveSemester?: (name: string) => void;
}) => {
  React.useEffect(() => {
    console.log('semester', semester);
  }, [semester]);
  return (
    <div
      className="semester">
      {handelRemoveSemester && (
        <div className="remove-btn" onClick={() => handelRemoveSemester && handelRemoveSemester(semester.name)}>
          Remove
        </div>
      )}
      <div className="name">{semester.name}</div>
      <div className="gpa">{semester.gpa}</div>
      <div className="estimate">{semester.estimate}</div>
    </div>
  );
};

export default Semester;
