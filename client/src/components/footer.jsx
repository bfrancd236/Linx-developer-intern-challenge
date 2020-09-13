import React from 'react'
import fcbk from './img/icon-facebook.png'
import twtt from './img/icon-twitter.png'


function Footer(){
    return (
        <div className="footer">
            <p>chr.dc</p>
           <div className='imgs-footer'>
               <img src={fcbk} alt=""/>
               <img src={twtt} alt=""/>
           </div>
        </div>
    )
}

export default Footer