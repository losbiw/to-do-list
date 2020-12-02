import React from 'react'
import './Create.css'

export default function Create(props){
    const { handleCreation, tasks, current } = props;
    
    const handleNewTaskCreation = () => {
        tasks[current].list.push('New task')
        handleCreation({ tasks })
    }

    const handleNewCategoryCreation = () => {
        tasks.push({
            category: 'new',
            list: []
        });

        handleCreation({ tasks });
    }

    return(
        <div id="create">
            <button className="add">Cock</button>

            <div className="options">
                <button onClick={ handleNewTaskCreation }>Task</button>
                <button onClick={ handleNewCategoryCreation }>Category</button>
            </div>
        </div>
    )
}