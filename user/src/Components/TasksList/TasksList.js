import React from 'react'
import { Container } from 'react-smooth-dnd'
import Task from '../Task/Task'
import './TasksList.css'

export default function Tasks(props){
    const { tasks, current, handleAppStateChange } = props;

    const handleDrop = result => {
        const { removedIndex, addedIndex } = result;
        const { list } = tasks[current];

        const dragged = list[removedIndex];
    
        list.splice(removedIndex, 1);
        list.splice(addedIndex, 0, dragged);

        handleAppStateChange({ tasks });
    }

    return(
        <div id='tasks'>
            <Container onDrop={ handleDrop }>
                {
                    tasks[current].list.map((task, index) => {                              
                        return(
                            <Task handleAppStateChange={ handleAppStateChange } 
                                task={ task }
                                index={ index }
                                { ...props }
                                key={ task.key }/>
                        )
                    })
                }
            </Container>
        </div>
    )
}