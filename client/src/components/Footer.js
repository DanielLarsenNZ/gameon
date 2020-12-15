import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-12">
            Crafted with <i className="uil uil-heart text-danger font-size-12"></i> by
            <a href="https://linkedin.com/in/olafwrieden/" target="_blank" rel="noopener noreferrer" className="ml-1">
              Olaf Wrieden
            </a>{' '}
            &
            <a
              href="https://linkedin.com/in/daniellarsennz/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1">
              Daniel Larsen
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
