import React from "react";
import { Link } from 'react-router-dom'
import iconSprite from "../common/uswds/img/sprite.svg";

export const QuickLinks = () => {
    return(
        <>
        <section id="quicklinks" className="usa-section usa-section--dark">
            
            <div className="grid-container">
                <div className="title"><span>QuickLinks</span></div>
                <div className="grid-row">  
                     
                    <div className="tablet:grid-col">
                        <Link 
                            to='/tools/rate-spread'
                        >   
                            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                                <use href={`${iconSprite}#attach_money`}></use>
                            </svg> <span>Rate Spread<br />Calculator</span>
                        </Link>
                    </div>
                    <div className="tablet:grid-col">
                        <Link 
                            to='/filing/2023-Q1/'
                        >   
                            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                                <use href={`${iconSprite}#account_balance`}></use>
                            </svg> <span>HMDA Filing <br />Platform</span>
                        </Link>
                    </div>
                    <div className="tablet:grid-col">
                        <Link 
                            to='documentation/2023/'
                        >   
                            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                                <use href={`${iconSprite}#help`}></use>
                            </svg>                     
                            <span>Frequently Asked<br />Questions</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}