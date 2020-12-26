import React from 'react'
import './ContextMenu.css'

export default function ContextMenu(props){
    const { coords, actions } = props.data;
    const { height, width } = coords;

    return(
        <div id='context' style={{ top: height, left: width }}>
            {
                actions.map(item => {
                    const { title, action, Icon, disabled } = item;

                    return(
                        <button className={ disabled ? 'disabled' : '' }
                                onClick={ disabled ? undefined : action }
                                key={ title }
                                id={ title }>
                            { Icon && <Icon /> }
                            { title }
                        </button>
                    )
                })
            }
        </div>
    )
}