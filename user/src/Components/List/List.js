import React from 'react'
import './List.css'

export default function List(props){
    const { id, data, handleClick } = props;

    return(
        <ul id={ id }>
            {
                data.map(element => {
                    return(
                        <li key={ element }
                            onClick={ handleClick }
                            data-name={ element }>
                            { element }
                        </li>
                    )
                })
            }
        </ul>
    )
}