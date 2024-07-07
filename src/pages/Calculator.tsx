import React, { useEffect, useState } from 'react';
import { getGeneralEstimate, getTotalGPA } from '../utils/calculator_methods';
import Semester from '../components/Semester';
import { Semester as SemesterType } from '../types/types';
import Placeholder from '../components/Placeholder';

const Calculator = () => {
  const [Semesters, setSemesters] = useState<SemesterType[]>([]);
  const [totalGPA, setTotalGPA] = useState<any>('');
  const [currentSemester, setCurrentSemester] = useState('');

  useEffect(() => {
    chrome.storage.sync.get(['semesters'], function (result) {
      if (result.semesters === undefined) {
        setSemesters([]);
        setTotalGPA('0');
        return;
      }
      setSemesters(result.semesters);
      setTotalGPA(getTotalGPA(result.semesters));
    });
    chrome.storage.sync.get(['currentSemester'], function (result) {
      setCurrentSemester(result.currentSemester);
    });
  }, []);

  const handelRemoveSemester = (name: any) => {
    const semesters = Semesters.filter((semester: any) => semester.name !== name);
    setSemesters(semesters);
    chrome.storage.sync.set({
      semesters: semesters,
    });
    getTotalGPA(semesters);
  };

  return (
    <div className="page" style={{ paddingBottom: Semesters.length > 1 ? '86px' : '0px' }}>
      {Semesters.length === 0 ? (
        <Placeholder
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF">
              <g>
                <rect fill="none" height="24" width="24" x="0" />
              </g>
              <g>
                <g>
                  <path d="M19.46,8l0.79-1.75L22,5.46c0.39-0.18,0.39-0.73,0-0.91l-1.75-0.79L19.46,2c-0.18-0.39-0.73-0.39-0.91,0l-0.79,1.75 L16,4.54c-0.39,0.18-0.39,0.73,0,0.91l1.75,0.79L18.54,8C18.72,8.39,19.28,8.39,19.46,8z M11.5,9.5L9.91,6 C9.56,5.22,8.44,5.22,8.09,6L6.5,9.5L3,11.09c-0.78,0.36-0.78,1.47,0,1.82l3.5,1.59L8.09,18c0.36,0.78,1.47,0.78,1.82,0l1.59-3.5 l3.5-1.59c0.78-0.36,0.78-1.47,0-1.82L11.5,9.5z M18.54,16l-0.79,1.75L16,18.54c-0.39,0.18-0.39,0.73,0,0.91l1.75,0.79L18.54,22 c0.18,0.39,0.73,0.39,0.91,0l0.79-1.75L22,19.46c0.39-0.18,0.39-0.73,0-0.91l-1.75-0.79L19.46,16 C19.28,15.61,18.72,15.61,18.54,16z" />
                </g>
              </g>
            </svg>
          }
          title="Your GPA awaits!"
          body="Show me your grades to calculate your total GPA."
          // buttonName="Go to MTI Site"
          link="http://www.mti.edu.eg/university/student"
        />
      ) : (
        <div className="semesters">
          {Semesters.map((semester: any, i) => (
            <Semester
              key={i}
              semester={semester}
              currentSemester={currentSemester}
              handelRemoveSemester={handelRemoveSemester}
            />
          ))}
        </div>
      )}

      {totalGPA !== '0' && Semesters.length > 1 && (
        <div className="semester total-gpa">
          <div className="name">Total GPA</div>
          <div className="gpa">{totalGPA}</div>
          <div className="estimate">{getGeneralEstimate(totalGPA)}</div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
