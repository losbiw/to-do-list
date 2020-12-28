import React from 'react'
import { capitalizeFirstLetter } from 'modules/convert'
import './SignIn.css'

export default function SignIn(_props){
    const options = {
        google: {
            img: 'https://img-authors.flaticon.com/google.jpg',
            url: process.env.NODE_ENV === 'production' ? 
                 '/auth/google' : 
                 'http://localhost:5000/auth/google'
        }
    }
    
    return(
        <div id='sign-in'>
            <h1>Sign in</h1>

            <ul>
                {
                    Object.keys(options).map((strategy) => {
                        const { img, url } = options[strategy];

                        return(
                            <li key={ strategy }>
                                <a href={ url }>
                                    <img src={ img } />
                                    <p>{ `Sign in with ${ capitalizeFirstLetter(strategy) }` }</p>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}