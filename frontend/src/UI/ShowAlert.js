import React from 'react';

function ShowAlert({ children, className }) {
    return (
      <div className={`alert alert-${className || 'light'}`} role="alert">
        {children || 'Default Success Message'}
        <button type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" />
      </div>
    );
}

export default ShowAlert;
