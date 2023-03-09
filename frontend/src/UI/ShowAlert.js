import React from 'react';

function ShowAlert({ children, className, closeAlert = '' }) {
    return (
      <div className={`alert alert-${className || 'light'}`} role="alert" aria-live="assertive">
        {children || 'Default Success Message'}
        <button type="button" className="btn-close float-end" aria-label="Close" onClick={closeAlert} />
      </div>
    );
}

export default ShowAlert;
