import React from 'react'
import './Profile.css'

export default function Profile(props){
    const { userName, photoURL } = props;

    return(
        <div id='profile'>
            <h1>
                <span>Hello, </span>
                <span>{ userName }</span>
            </h1>
            <div id='logout'>
                <img src={ photoURL }/>
                <a href={ process.env.NODE_ENV === 'production' ? 
                          '/data/logout' : 
                          'http://localhost:5000/data/logout' }
                >
                    Log Out 
                </a>
            </div>
        </div>
    )
}