import React from 'react';
import logo from 'src/icons/dzik-logo.png';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src={logo}
      style={{ height: '30px' }}
      {...props}
    />
  );
};

export default Logo;
