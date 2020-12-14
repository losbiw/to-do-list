import React, { Component } from 'react'
import ContextMenu from '../ContextMenu/ContextMenu'
import Category from '../Category/Category'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import './Categories.css'

export default class Categories extends Component{
    constructor(props){
        super(props);

        this.state = {
            contextMenu: undefined,
            activeIndex: undefined
        }
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside);
    }

    parseElementProperty = (e, property) => {
        const value = e.target.dataset[property];
        
        try{
           return parseInt(value, 10)
        }
        catch(err){
            throw err
        }
    }

    handleStateChange = data => {
        this.setState(data)
    }

    handleDragEnd = result => {
        const { tasks, handleAppStateChange, current } = this.props;
        const { destination, source } = result;

        if(destination){
            const dragged = tasks[source.index];
            const { key } = tasks[current];

            tasks.splice(source.index, 1);
            tasks.splice(destination.index, 0, dragged);

            const updatedIndex = tasks.findIndex(category => category.key === key);

            handleAppStateChange({ 
                tasks,
                currentGroupIndex: updatedIndex
            });
        }
    }

    render(){
        const { tasks, current, handleAppStateChange } = this.props;
        const { contextMenu, activeIndex } = this.state;

        return(
            <DragDropContext onDragEnd={ this.handleDragEnd }>
                <Droppable droppableId='categories' 
                           direction='horizontal'
                           ignoreContainerClipping={ true }>
                    { provided => 
                        <ul id='categories' 
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                        >
                            {
                                tasks.map((task, index) => {
                                    const { category, key } = task;
                                    
                                    return <Category task={ task }
                                                     index={ index }
                                                     category={category}
                                                     dragKey={ key }
                                                     current={ current }
                                                     tasks={ tasks }
                                                     activeIndex={ activeIndex }
                                                     handleStateChange={ this.handleStateChange }
                                                     handleAppStateChange={ handleAppStateChange }
                                                     key={ key } /> 
                                })
                            }
                            { provided.placeholder }
                        </ul>
                    }
                </Droppable>

                { contextMenu && <ContextMenu data={ contextMenu }/> }
            </DragDropContext>
        )
    }
}