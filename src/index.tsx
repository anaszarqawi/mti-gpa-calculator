import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './popup';
import './styles/global.scss';
import './styles/header.scss';
import './styles/semester.scss';
import './styles/tabBar.scss';
import './styles/totalGPA.scss';
import './styles/placeholder.scss';
import './styles/button.scss';
import './styles/footer.scss';
import './styles/coursesList.scss';
// import 'material-icons/iconfont/round.scss';

const root = document.createElement('div');
root.className = 'root';
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
