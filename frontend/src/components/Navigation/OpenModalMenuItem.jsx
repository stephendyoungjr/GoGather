import React from 'react';
import { Link } from 'react-router-dom';

const OpenModalMenuItem = ({ to, text }) => {
  return (
    <Link to={to} className="menu-item">
      {text}
    </Link>
  );
};

export default OpenModalMenuItem;
