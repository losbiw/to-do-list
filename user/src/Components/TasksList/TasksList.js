import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Task from '../Task/Task'
import './TasksList.css'

export default function Tasks(props){
    const { tasks, current, handleAppStateChange } = props;

    const handleDragEnd = result => {
        const { list } = tasks[current];
        const { destination, source } = result;

        if(destination){
            const dragged = list[source.index];
        
            list.splice(source.index, 1);
            list.splice(destination.index, 0, dragged);

            handleAppStateChange({ tasks });
        }
    }

    return(
        <DragDropContext onDragEnd={ handleDragEnd }>
            <Droppable droppableId='tasks'>
                { provided =>
                    <ul id='tasks' key='tasks'
                        ref={ provided.innerRef }
                        { ...provided.droppableProps }
                    >
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

                        { provided.placeholder }
                    </ul>
                }
            </Droppable>
        </DragDropContext>
    )
}