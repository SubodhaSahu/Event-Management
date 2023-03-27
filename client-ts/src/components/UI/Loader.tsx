type Props = {
  message?: string;
};

function Loader({ message }: Props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">{message || 'Loading...'}</span>
      </div>
    </div>
  );
}
export default Loader;
