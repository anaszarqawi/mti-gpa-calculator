import React from 'react';

const Placeholder = ({ icon, title, body, buttonName, link }: { icon: any; title: string; body: string; buttonName?: string, link?: string }) => {
  return (
    <div className="empty-placeholder">
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="body">{body}</div>
      {buttonName && (
        <a className="button" href="http://www.mti.edu.eg/university/student" target="blank">
          {buttonName}
        </a>
      )}
    </div>
  );
};

export default Placeholder;
