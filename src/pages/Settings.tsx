import React, { useEffect, useState } from 'react';
import {
  getDefaultEstimateGrades,
  getDefaultGradeLetters,
  getDefaultGradePoints,
  loadAllSettingsFromLocalStorage,
  recalculateSemesters,
  saveEstimateGrades,
  saveGradeLetters,
  saveGradePoints,
} from '../utils/calculator_methods';
import { getInsights } from '../utils/insights_methods';
import Footer from '../components/Footer';

const GRADE_ORDER = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
const ESTIMATE_ORDER = ['Excellent', 'Very Good', 'Good', 'Sufficient', 'Weak', 'Very Weak'];

type SettingsMap = Record<string, number>;

const parseNumber = (value: string) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const Settings = () => {
  const [gradePoints, setGradePoints] = useState<SettingsMap>(getDefaultGradePoints());
  const [gradeLetters, setGradeLetters] = useState<SettingsMap>(getDefaultGradeLetters());
  const [estimateGrades, setEstimateGrades] = useState<SettingsMap>(getDefaultEstimateGrades());
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadAllSettingsFromLocalStorage();
    setGradePoints(loaded.gradePoints);
    setGradeLetters(loaded.gradeLetters);
    setEstimateGrades(loaded.estimateGrades);
  }, []);

  const showSaved = (section: string) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 1500);
  };

  const recalculateAll = () => {
    chrome.storage.sync.get(['semesters'], (result) => {
      const semesters = result.semesters || [];
      if (semesters.length === 0) return;
      const updated = recalculateSemesters(semesters);
      const insights = getInsights(updated);
      chrome.storage.sync.set({
        semesters: updated,
        insights,
      });
    });
  };

  const commitPoints = (key: string, value: string) => {
    const next = { ...gradePoints, [key]: parseNumber(value) };
    setGradePoints(next);
    saveGradePoints(next);
    recalculateAll();
    showSaved('points');
  };

  const commitLetters = (key: string, value: string) => {
    const next = { ...gradeLetters, [key]: parseNumber(value) };
    setGradeLetters(next);
    saveGradeLetters(next);
    recalculateAll();
    showSaved('letters');
  };

  const commitEstimates = (key: string, value: string) => {
    const next = { ...estimateGrades, [key]: parseNumber(value) };
    setEstimateGrades(next);
    saveEstimateGrades(next);
    recalculateAll();
    showSaved('estimates');
  };

  return (
    <div className="page settings-page">
      <div className="settings">
        <div className="settings-section">
          <div className="title">Grade Points</div>
          <div className="settings-table">
            <div className="settings-table-header">
              <span>Grade</span>
              <span>Points</span>
            </div>
            {GRADE_ORDER.map((grade) => (
              <div className="settings-table-row" key={grade}>
                <span className="row-label">{grade}</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="4"
                  value={gradePoints[grade] ?? 0}
                  onChange={(e) =>
                    setGradePoints((prev) => ({ ...prev, [grade]: parseNumber(e.target.value) }))
                  }
                  onBlur={(e) => commitPoints(grade, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="settings-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                const defaults = getDefaultGradePoints();
                setGradePoints(defaults);
                saveGradePoints(defaults);
                recalculateAll();
                showSaved('points');
              }}>
              Reset to default
            </button>
            {savedSection === 'points' && <span className="saved-hint">Saved</span>}
          </div>
        </div>

        <div className="settings-section">
          <div className="title">Grade Letters</div>
          <div className="settings-table">
            <div className="settings-table-header">
              <span>Grade</span>
              <span>Min %</span>
            </div>
            {GRADE_ORDER.map((grade) => (
              <div className="settings-table-row" key={grade}>
                <span className="row-label">{grade}</span>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={gradeLetters[grade] ?? 0}
                  onChange={(e) =>
                    setGradeLetters((prev) => ({ ...prev, [grade]: parseNumber(e.target.value) }))
                  }
                  onBlur={(e) => commitLetters(grade, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="settings-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                const defaults = getDefaultGradeLetters();
                setGradeLetters(defaults);
                saveGradeLetters(defaults);
                recalculateAll();
                showSaved('letters');
              }}>
              Reset to default
            </button>
            {savedSection === 'letters' && <span className="saved-hint">Saved</span>}
          </div>
        </div>

        <div className="settings-section">
          <div className="title">Estimate Grades</div>
          <div className="settings-table">
            <div className="settings-table-header">
              <span>Estimate</span>
              <span>Min GPA</span>
            </div>
            {ESTIMATE_ORDER.map((label) => (
              <div className="settings-table-row" key={label}>
                <span className="row-label wide">{label}</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="4"
                  value={estimateGrades[label] ?? 0}
                  onChange={(e) =>
                    setEstimateGrades((prev) => ({ ...prev, [label]: parseNumber(e.target.value) }))
                  }
                  onBlur={(e) => commitEstimates(label, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="settings-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                const defaults = getDefaultEstimateGrades();
                setEstimateGrades(defaults);
                saveEstimateGrades(defaults);
                recalculateAll();
                showSaved('estimates');
              }}>
              Reset to default
            </button>
            {savedSection === 'estimates' && <span className="saved-hint">Saved</span>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
