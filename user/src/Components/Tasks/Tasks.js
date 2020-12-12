import React from 'react'
import { ReactComponent as Complete } from 'assets/complete.svg'
import './Tasks.css'

export default function Tasks(props){
    const { tasks, current, handleAppStateChange } = props;
    
    const handleChange = e => {
        const { value, dataset } = e.target;
        
        tasks[current].list[dataset.index].value = value;
        handleAppStateChange({ tasks });
    }

    const handleResize = el => {
        el.rows = 1;

        const lineHeight = 2.5 * (window.innerWidth / 100);
        const rows = Math.round(el.scrollHeight / lineHeight);
        el.rows = rows;
    }

    const handleDelete = e => {
        const { index } = e.target.dataset;

        tasks[current].list.splice(index, 1);
        handleAppStateChange({ tasks });
    }

    return(
        <ul id='tasks' key='tasks'>
            {
                tasks[current].list.map((task, index) => {
                    return(
                        <li className='task' key={ task.key }>
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
                    )
                })
            }
        </ul>
    )
}