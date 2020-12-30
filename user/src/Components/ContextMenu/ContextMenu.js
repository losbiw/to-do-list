import React from 'react'
import './ContextMenu.css'

export default function ContextMenu(props){
    const { coords, actions } = props.data;

    return(
        <div id='context' style={ coords }>
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