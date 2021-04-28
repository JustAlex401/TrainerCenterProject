import React from 'react';
import './footer.css';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {

  return (
    <footer className="page-footer footer">
      <div className="container">
        <div className="row">
          <div className="container center">
            <SocialIcon url="https://www.instagram.com/" bgColor="#FFD700" className="iconSpacing"></SocialIcon>
            <SocialIcon url="https://www.youtube.com/" bgColor="#FFD700" className="iconSpacing"></SocialIcon>
            <SocialIcon url="https://www.facebook.com/" bgColor="#FFD700" className="iconSpacing"></SocialIcon>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container center">
          © 2021 All Rights Reserved 
        </div>
      </div>
    </footer>
  )
}

export default Footer;
