import React from 'react'
import { Draggable } from 'react-smooth-dnd'
import { ReactComponent as Complete } from 'assets/complete.svg'
import './Task.css'

export default function Task(props){
    const { index, task, current, handleAppStateChange, tasks } = props;

    const handleChange = e => {
        const { value, dataset } = e.target;
        
        tasks[current].list[dataset.index].value = value;
        handleAppStateChange({ tasks });
    }

    const handleResize = el => {
        const { innerHeight, innerWidth } = window;
        el.rows = 1;

        const lineHeight = innerWidth > innerHeight 
                            ? 2.5 * (innerWidth / 100)
                            : 3.4 * (innerHeight / 100);
        const rows = Math.round(el.scrollHeight / lineHeight);
        el.rows = rows;
    }

    const handleDelete = e => {
        const { index } = e.target.dataset;

        tasks[current].list.splice(index, 1);
        handleAppStateChange({ tasks });
    }

    return(
        <Draggable key={ index }>
            <li className='task'>
                <button className='complete' 
                        onClick={ handleDelete } 
                        data-index={ index }>
                    <Complete />
                </button>
            
                <textarea data-index={ index } 
                        spellCheck='false'
                        rows='1'
                        ref={ input => input && handleResize(input) }
                        defaultValue={ task.value }
                        size={ task.value.length }
                        onChange={ handleChange }/>
            </li>
        </Draggable>
    )
}