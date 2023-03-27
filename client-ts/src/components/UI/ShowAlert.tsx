import { ReactNode } from 'react';

type InputProps = {
  children: ReactNode;
  className: string;
  hideAlert: () => void;
  // handleChange: (event: MouseEvent<HTMLInputElement>) => void;
};

function ShowAlert({ children, className, hideAlert }: InputProps) {
  return (
    <div
      className={`alert alert-${className || 'light'}`}
      role="alert"
      aria-live="assertive"
    >
      {children || 'Default Success Message'}
      <button
        type="button"
        className="btn-close float-end"
        aria-label="Close"
        onClick={hideAlert}
        // onClick={(event: React.MouseEvent<HTMLElement>) => {
        //   handleChange;
        // }}
        // onClick={handleChange}
      />
    </div>
  );
}

export default ShowAlert;
