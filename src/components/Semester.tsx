import React from 'react';
import { Semester as SemesterType } from '../types/types';
import CoursesList from "./CoursesList";


const Semester = ({
  semester,
  currentSemester,
  handelRemoveSemester,
}: {
  semester: SemesterType;
  currentSemester?: string;
  handelRemoveSemester?: (name: string) => void;
}) => {
  const [isShowCourses, setIsShowCourses] = React.useState(false);

  React.useEffect(() => {
    // console.log('semester', semester);
  }, [semester]);

  return (
    <div
      className="semester">
      <div className="semester-summary">
        <div className="semester-buttons">
          <div className="semester-button" onClick={() => setIsShowCourses(!isShowCourses)}>
            {isShowCourses ? 'Hide Courses' : 'Show Courses'}
          </div>
          {handelRemoveSemester && (
            <div className="semester-button" onClick={() => handelRemoveSemester && handelRemoveSemester(semester.name)}>
              Remove
            </div>
          )}
        </div>
        <div className="name">{semester.name}</div>
        <div className="gpa">{semester.gpa}</div>
        <div className="estimate">{semester.estimate}</div>
      </div>
      {
        isShowCourses && (
          <CoursesList courses={semester.courses} />
        )
      }
    </div>
  );
};

export default Semester;
