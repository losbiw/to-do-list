import React from 'react'
import ReactDOM from 'react-dom'
import { Draggable } from 'react-smooth-dnd'
import { ReactComponent as Complete } from 'assets/Task/complete.svg'
import './Task.css'

export default function Task(props){
    const { index, task, current, tasks, handleAppStateChange, handleCategoryDelete } = props;

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
        const { list, deletable } = tasks[current];

        list.splice(index, 1);
        
        if(list.length === 0 && deletable){
            handleCategoryDelete(current);
        }

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
                        ref={ input => {
                            if(input){
                                handleResize(input);
                                
                                if(document.activeElement !== ReactDOM.findDOMNode(input) &&
                                    input.value.length === 0)
                                {
                                    handleDelete({ target: input });
                                }
                            } 
                        }}
                        defaultValue={ task.value }
                        onChange={ handleChange }/>
            </li>
        </Draggable>
    )
}