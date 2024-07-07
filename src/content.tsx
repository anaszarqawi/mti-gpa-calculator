import { getGPAInfo } from './utils/calculator_methods';
import { getInsights } from './utils/insights_methods';

const getGrades = (): string[] => {
  const grades: HTMLCollectionOf<HTMLTableSectionElement> = document.getElementsByTagName('tbody');
  const gradesList: { name: string; grade: string }[] | any = [];
  let allPASS: boolean = true;
  for (let i = 0; i < grades[0].children.length; i++) {
    let name: any = grades[0].children[i].children[0].textContent?.trim();
    let code: any = name.slice(name.indexOf('('), name.indexOf(')') + 1);
    const grade: any = grades[0].children[i].children[1].textContent;

    if (name !== null) {
      name = name.replace('  ', ' ').slice(0, name.indexOf('\n')).trim();
    }

    if (grade !== 'PASS') {
      allPASS = false;
      gradesList.push({
        name,
        grade,
        code,
      });
    }
  }
  // console.log(gradesList);
  return allPASS ? ['PASS'] : gradesList;
};

const addGPAContainer = () => {
  const table = document.getElementsByTagName('table');

  const gpa = document.createElement('div');
  gpa.classList.add('gpa-container');
  gpa.style.cssText = `
    position: relative;
    padding: 16px;
    border: 1px solid #eaeaed;
    background-color: #eaeaed;
    border-radius: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
    text-align: center;
    color: #373740;`;
  table[0].insertAdjacentElement('afterend', gpa);

  // *add GPA in gpa-container
  const gpaValue = document.createElement('div');
  gpaValue.classList.add('gpa-value');
  gpaValue.textContent = getGPAInfo(getGrades(), 'gpa');
  gpaValue.style.cssText = `
        font-size: 42px;
        font-weight: bold;`;
  gpa.insertAdjacentElement('beforeend', gpaValue);

  // *add estimate after the gpa
  const estimate = document.createElement('div');
  estimate.classList.add('estimate');
  estimate.textContent = getGPAInfo(getGrades(), 'estimate');
  estimate.style.cssText = `
    text-align: center;
    font-size: 16px;
    margin-bottom: 8px;
    opacity: 0.8;
    color: #373740;`;
  gpa.insertAdjacentElement('beforeend', estimate);

  // *add 'Calculated by' after the estimate
  const calculateBy = document.createElement('div');
  calculateBy.classList.add('calculate-by');
  calculateBy.textContent = 'Calculated with ❤️ by';
  calculateBy.style.cssText = `
    margin-bottom: 16px;
    text-align: center;
    font-size: 12px;
    color: #999;`;
  gpa.insertAdjacentElement('afterend', calculateBy);

  // *add 'anaszarqawi_' with a link to my github account after the 'Calculated by'
  const anaszarqawi = document.createElement('a');
  anaszarqawi.classList.add('anaszarqawi');
  anaszarqawi.textContent = 'anaszarqawi_';
  anaszarqawi.href = 'https://www.github.com/anaszarqawi/';
  anaszarqawi.target = '_blank';
  anaszarqawi.style.cssText = `
    margin-left: 4px;
    color: #333;
    font-weight: bold;
    text-decoration: none;`;
  calculateBy.insertAdjacentElement('beforeend', anaszarqawi);

  // *add button to copy summary of results
  // const copyButton = document.createElement('button');
  // copyButton.classList.add('copy-button');
  // copyButton.textContent = 'Copy';
  // copyButton.style.cssText = `
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   padding: 8px 12px;
  //   border: none;
  //   border-radius: 0 8px 0 8px;
  //   background-color: #fff;
  //   border: 1px solid #eaeaed;
  //   border-top: none;
  //   border-right: none;
  //   color: #373740;
  //   cursor: pointer;`;
  // copyButton.addEventListener('click', () => {
  //   const courses = getCoursesWithGrades();
  //   const summary = generateSummary(courses);
  //   copyToClipboard(summary);
  // });
  // gpa.insertAdjacentElement('beforeend', copyButton);
};

const changeTableStyle = () => {
  const table = document.getElementsByTagName('table');
  table[0].style.cssText = `
    background-color: #eaeaed;
    border-radius: 8px;
    margin-top: 16px;
    overflow: hidden;
    border-collapse: collapse;`;

  const tableElements = document.getElementsByTagName('td');
  for (let i = 0; i < tableElements.length; i++) {
    tableElements[i].style.cssText = `
    font-size: 16px;
      transition: all 0.3s;
      padding: 10px 15px;`;
  }
  const tableHeaders = document.getElementsByTagName('th');
  for (let i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].style.cssText = `
      font-size: 16px;
      padding: 16px;
      transition: all 0.3s;
      text-align: left;`;
  }
};

const changeMenuStyle = () => {
  const menuItems: any = document.getElementsByClassName('panel panel-primary');
  const listBody: any = document.getElementsByClassName('list-group');
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].style.cssText = `
    border-color: #eaeaed;
    border-radius: 8px;
    `;
    menuItems[i].children[0].style.cssText = `
    background-color: #eaeaed;
    color: #373740;
    `;
    const menu: any = document.getElementsByClassName('accordion');
    menu[0].style.cssText = `
    margin-top: 16px;
    `;
    menuItems[i].children[1].children[0].style.cssText = `
      border-top: none;
      `;
    listBody[i].style.cssText = `
      margin-bottom: 0;
      `;
  }
};

const changeAvatar = () => {
  const avatar: any = document.getElementsByClassName('img-cont')[0];
  const staff: any = document.getElementsByClassName('staff-item')[0];
  const name = staff.children[2].textContent;
  avatar.children[0].src = `https://ui-avatars.com/api/?background=373740&color=eaeaed&name=${name}`;
  staff.style.cssText = `
    background-color: #eaeaed;
    border-radius: 8px;
    border: none;`;
};

const changeHeaderStyle = () => {
  const h2 = document.getElementsByTagName('h2');
  h2[0].style.cssText = `
    margin-top: 10px;
  `;
};

const changeArrowStyle = () => {
  const arrowContainer: any = document.getElementsByClassName('badge label-primary pull-right');
  const arrows: any = document.getElementsByClassName('fa fa-chevron-right');

  for (let i = 0; i < arrowContainer.length; i++) {
    arrowContainer[i].style.cssText = `
      background-color: #373740;
      padding: 0;
      width: 15px;
      height: 15px;
      display: none;
    `;
  }
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].style.cssText = `
      font-size: 7px;
    `;
  }
};

const pushToSemesters = () => {
  // clear semesters
  // chrome.storage.sync.set({
  //   semesters: [],
  // });

  chrome.storage.sync.get(['semesters'], function (result) {
    const semesters = result.semesters || [];

    let name = document.getElementsByTagName('h2')[1].textContent;

    if (name !== null) {
      name = name.trim().slice(14);
    }

    chrome.storage.sync.set({
      currentSemester: name,
    });

    // if currentSemester is already in the array, skip
    if (semesters.length !== 0) {
      for (const semester of semesters) {
        if (semester.name === name) {
          const insights = getInsights(semesters);
          // console.log(insights);
          chrome.storage.sync.set({
            insights: insights,
          });
          return false;
        }
      }
    }

    const gpa = document.getElementsByClassName('gpa-value')[0].textContent;
    const estimate = document.getElementsByClassName('estimate')[0].textContent;
    const credits = getGPAInfo(getGrades(), 'credits');
    const gradePoints = getGPAInfo(getGrades(), 'gradePoints');
    const courses = getGrades();

    // console.log({
    //   name: name,
    //   gpa: gpa,
    //   estimate: estimate,
    //   credits: credits,
    //   gradePoints: gradePoints,
    //   courses: courses,
    // });

    if (name !== null && name !== undefined) {
      semesters.push({ name, gpa, estimate, credits, gradePoints, courses });
    }
    // console.log(semesters);
    const insights = getInsights(semesters);

    chrome.storage.sync.set({
      semesters: semesters,
      insights: insights,
    });

    return false;
  });
};

const checkOnSemesterList = () => {
  const semesters: any = document.getElementsByClassName('list-group-item  ');
  chrome.storage.sync.get(['semesters', 'currentSemester'], function (result) {
    const semestersList = result.semesters || [];
    for (const semester of semestersList) {
      for (let i = 0; i < semesters.length; i++) {
        // console.log({
        //   semester: semester.name,
        //   semesters: semesters[i].textContent.trim(),
        // });
        if (semesters[i].textContent.trim() === semester.name) {
          semesters[i].style.cssText = `
            background-color: #eaf4fa;
          `;
        }
        if (semesters[i].textContent.trim() === result.currentSemester) {
          semesters[i].style.cssText = `
            background-color: #eaeaed;
          `;
        }
      }
    }
  });
};

// const reorderSemesters = (semesters: any) => {

//   // semesters = [{name: 'Fall 2019', ...}, {name: 'Spring 2020', ...}, {name: 'Fall 2020', ...}, {name: 'Spring 2021', ...}]

//   const years: {
//     year: string;
//     semesters: any;
//   }[] = []; // {year: '2019-2020', semesters: [{name: 'Fall 2019', ...}, {name: 'Spring 2020', ...}]}


// }

// const collectGrades = () => {
//   // open the Results panel
//   const allPanels: any = document.getElementsByClassName('panel panel-primary');
//   let resultPanel: HTMLDivElement | any = null;
//   for (const panel of allPanels) {
//     const panelTitle: any = panel.getElementsByClassName('panel-title')[0].textContent;
//     if (panelTitle.includes('Results')) resultPanel = panel;
//   }
//   resultPanel.getElementsByClassName('panel-title')[0].getElementsByTagName('a')[0].click();

//   // get all semesters
//   const AllResults: any = resultPanel.getElementsByClassName('list-group-item  ');
//   console.log({ AllResults });
//   chrome.storage.sync.get(['semesters'], function (result) {
//     for (const result of AllResults) {
//       const ResultName = result.textContent.trim();
//       let isCollected = false;
//       if (result.semesters === undefined) result.click();

//       for (const semester of result.semesters) {
//         const semesterName = semester.name;
//         // if the result in the list of semesters, continue, else click on it
//         if (ResultName === semesterName) {
//           isCollected = true;
//           break;
//         }
//       }
//       if (!isCollected) result.click();

//     }
//   });
// };


if (document.getElementsByTagName('tbody').length !== 0) {
  pushToSemesters();
  addGPAContainer();
  changeTableStyle();
}

if (document.getElementsByClassName('panel panel-primary').length !== 0) {
  changeMenuStyle();
  setTimeout(() => {
    checkOnSemesterList();
    // collectGrades();
  }, 1000);
}

if (document.getElementsByClassName('staff-item').length !== 0) {
  changeAvatar();
}

if (document.getElementsByClassName('badge label-primary pull-right').length !== 0) {
  changeArrowStyle();
}

changeHeaderStyle();
