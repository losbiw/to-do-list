import React from 'react'
import './Tasks.css'

export default function Tasks(props){
    const { tasks, current, handleAppStateChange } = props;
    
    const handleChange = e => {
        const { value, dataset } = e.target;
        
        tasks[current].list[dataset.index].value = value;
        handleAppStateChange({ tasks });

        handleResize(e.target);
    }

    const handleResize = el => {
        setTimeout(() => {
            el.style.height = 'auto';

            const { scrollHeight } = el;
            el.style.height = scrollHeight + 'px';
        }, 0)
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
                                Complete
                            </button>
                            
                            <textarea data-index={ index } 
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