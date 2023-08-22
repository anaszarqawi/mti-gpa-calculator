import { getGPAInfo } from './calculator_methods';

const getGrades = (): string[] => {
  const grades: HTMLCollectionOf<HTMLTableSectionElement> = document.getElementsByTagName('tbody');
  const gradesList: string[] = [];
  let allPASS: boolean = true;
  for (let i = 0; i < grades[0].children.length; i++) {
    const grade: any = grades[0].children[i].children[1].textContent;
    if (grade !== 'PASS') {
      allPASS = false;
      gradesList.push(grade);
    }
  }
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

if (document.getElementsByTagName('tbody').length !== 0) {
  addGPAContainer();
  changeTableStyle();
}

if (document.getElementsByClassName('panel panel-primary').length !== 0) {
  changeMenuStyle();
}

if (document.getElementsByClassName('staff-item').length !== 0) {
  changeAvatar();
}

changeHeaderStyle();
