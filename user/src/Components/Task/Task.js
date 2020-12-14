import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
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
        el.rows = 1;

        const lineHeight = 2.5 * (window.innerWidth / 100);
        console.log(lineHeight);
        const rows = Math.round(el.scrollHeight / lineHeight);
        el.rows = rows;
    }

    const handleDelete = e => {
        const { index } = e.target.dataset;

        tasks[current].list.splice(index, 1);
        handleAppStateChange({ tasks });
    }

    return(
        <Draggable draggableId={ `${task.key}` } index={ index }>
            { provided => 
                <li className='task'
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    ref={ provided.innerRef }
                >
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
                            onChange={ handleChange }/>
                </li>
            }
        </Draggable>
    )
}