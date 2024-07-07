import React, { useEffect, useState } from 'react';
import { getInsights } from '../utils/insights_methods';
import Semester from '../components/Semester';
import CoursesList from '../components/CoursesList';
import { Insights } from '../types/types';
import Placeholder from "../components/Placeholder";


const Insights = () => {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    chrome.storage.sync.get(['insights'], function (result) {
      if (result.insights === undefined) {
        return;
      }
      setInsights(result.insights);
    });
  }, []);

  return (
    <div className="page">
      {insights !== null ? (
        <div className="insights">
          <div className="insight">
            <div className="title">Total Semesters</div>
            <div className="semester value">{insights.totalSemesters}</div>
          </div>

          <div className="insight">
            <div className="title">Best Semester</div>
            <Semester semester={insights.bestSemester} />
          </div>

          <div className="insight">
            <div className="title">Worst Semester</div>
            <Semester semester={insights.worstSemester} />
          </div>
          {/* <div className="insight">
            <div className="title">Average GPA</div>
            <div className="value">{insights.averageGPA}</div>
          </div> */}
          <div className="insight">
            <div className="title">Total Courses</div>
            <div className="semester value">{insights.totalCourses}</div>
          </div>

          {insights.bestCourses.length > 0 && (
            <div className="insight">
              <div className="title">Best Courses</div>
              <CoursesList courses={insights.bestCourses} />
            </div>
          )}

          {insights.worstCourses.length > 0 && (
            <div className="insight">
              <div className="title">Worst Courses</div>
              <CoursesList courses={insights.worstCourses} />
            </div>
          )}
        </div>
      ) : (
        <Placeholder icon={
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" /><rect fill="none" height="24" width="24" /></g><g><g><path d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z" /><polygon points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93" /><polygon points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9" /></g></g></svg>
        } title="Your insights awaits!" body="Show me your grades generate your insights." />
      )}
    </div>
  );
};

export default Insights;
