import React from 'react';

function Footer(){
 
  const GITHUB_PROFILE_PATH='https://github.com/stephendyoungjr'

  return (
    <nav className={`footer`}>
        <a className="nav-link" href={GITHUB_PROFILE_PATH} style={{ marginLeft: '20px' }}>Github</a>

    </nav>
  );
}

export default Footer;