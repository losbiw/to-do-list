import React from 'react'
import './Tasks.css'

export default function Tasks(props){
    const { tasks, current, handleAppStateChange } = props;
    
    const handleChange = e => {
        const { value, dataset } = e.target;
        
        tasks[current].list[dataset.index].value = value;
        handleAppStateChange({ tasks });
    }

    const handleDelete = e => {
        const { index } = e.target.dataset;

        const deleted = tasks[current].list.splice(index, 1);
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
                                Complete
                            </button>
                            
                            <textarea data-index={ index } 
                                   defaultValue={ task.value }
                                   onChange={ handleChange } />
                        </li>
                    )
                })
            }
        </ul>
    )
}