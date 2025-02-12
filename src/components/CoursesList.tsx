import React from 'react';
import { Course } from '../types/types';

const CoursesList = ({ title, courses }: { title?: string, courses: Course[] }) => {
  return (
    <div className="courses-list">
      {
        title && <div className="title">{title}</div>
      }
      {courses.map((course, index) => {
        console.log('course', course);
        return (
          <div key={index} className="course">
            <div className="left-side">
              <div className="name">{course.name}</div>
              <div className="separator">•</div>
              <div className="credit">{course.credit} Credit</div>
            </div>
            <div className="grade">{course.grade}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;
