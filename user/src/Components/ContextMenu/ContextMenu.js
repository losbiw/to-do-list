import React from 'react'
import './ContextMenu.css'

export default function ContextMenu(props){
    const { coords, actions } = props.data;
    const { height, width } = coords;

    return(
        <div id="context" style={{ top: height, left: width }}>
            {
                actions.map(item => {
                    const { title, action } = item;

                    return(
                        <button onClick={ action }
                                key={ title }
                                id={ title }>
                            { title }
                        </button>
                    )
                })
            }
        </div>
    )
}