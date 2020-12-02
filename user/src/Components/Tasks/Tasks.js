import React from 'react'
import './Tasks.css'

export default function Tasks(props){
    const { tasks, current, handleTasksChange } = props;
    
    const handleChange = e => {
        const { value, dataset } = e.target;
        
        tasks[current].list[dataset.name] = value;
        handleTasksChange({ tasks });
    }

    return(
        <ul id='tasks' key='tasks'>
            {
                tasks[current].list.map((task, index) => {
                    return(
                        <input key={ `group${current}${index}` } 
                                data-name={ index } 
                                defaultValue={ task }
                                onChange={ handleChange }/>
                    )
                })
            }
        </ul>
    )
}