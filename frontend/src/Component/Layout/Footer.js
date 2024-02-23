import React from "react";
import "./footer.css"

function Footer() {


  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <h5>About Us</h5>
            <p>We are a company that specializes in creating amazing choths for all categories.</p>
          </div>
          <div className="col-sm-4">
            <h5>Address</h5>
            <p>Near indore-dewas bypass</p>
            <p>indore</p>
          </div>
          <div className="col-sm-4">
            <h5>Contact Us</h5>
            <p>Phone: 93432xx322</p>
            <p>Email: ecommercecloth@gmail.com</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 text-center">
            <hr />
            <p className="text-muted">&copy; 2024 developed by Ecommerce. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;