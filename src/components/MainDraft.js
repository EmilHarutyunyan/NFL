import React from 'react';
import  nflLogo from './assets/img/nfl-logo.png'
function MainDraft() {
    return (
        <div className='banner'>
            <div className='banner-content'>
                <h1>NFL DRAFT 2023</h1>
                <img src={nflLogo} alt=""/>
            </div>
        </div>
    );
}

export default MainDraft;