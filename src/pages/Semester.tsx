import React from 'react';
import { Semester } from '../types/types';
import CoursesList from '../components/CoursesList';

interface year {
  title: string;
  semesters: Semester[];
}

const Semester = ({ years }: { years: year[] }) => {
  return (
    <div className="page">
      <div className="years">
        {years.map((year, index) => {
          return (
            <div className="year" key={index}>
              <div className="title"></div>
              <div className="semesters">
                {year.semesters.map((semester, index) => {
                  return <CoursesList key={index} title={semester.name} courses={semester.courses} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Semester;
