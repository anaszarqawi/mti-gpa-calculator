import React from 'react';
import { Course } from '../types/types';

const CoursesList = ({ title, courses }: { title?: string, courses: Course[] }) => {
  return (
    <div className="courses-list">
      {
        title && <div className="title">{title}</div>
      }
      {courses.map((course, index) => {
        return (
          <div key={index} className="course">
            <div className="name">{course.name}</div>
            <div className="grade">{course.grade}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;
