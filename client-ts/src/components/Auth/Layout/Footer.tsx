function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="bg-light fixed-bottom p-2">
        <div className="row">
          <div className="col-md-7 offset-5">
            <span className="text-bold text-center ">
              Copyright ©<b>{currentYear}</b> Event Management CC..
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
