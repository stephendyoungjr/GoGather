import React from 'react';

function Footer(){
  const WIKI_PATH='https://github.com/eramsay20/ebrite/wiki'
  const GITHUB_PROFILE_PATH='https://github.com/eramsay20'

  return (
    <nav className={`footer`}>
        <a className="nav-link" href={GITHUB_PROFILE_PATH} style={{ marginLeft: '20px' }}>Github Profile</a>
        <a className="nav-link" href={WIKI_PATH} style={{ marginLeft: '20px' }}>e.brite Wiki</a>
    </nav>
  );
}

export default Footer;