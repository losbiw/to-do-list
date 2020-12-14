import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function Category(props){
    const { task, index, tasks, category, current, activeIndex, handleAppStateChange, handleStateChange } = props;

    const handleItemClick = e => {
        const parsed = this.parseElementProperty(e, 'index');

        handleAppStateChange({ currentGroupIndex: parsed });
    }

    const handleNameChange = e => {
        const parsed = this.parseElementProperty(e, 'index');
        
        tasks[parsed].category = e.target.value;
        handleAppStateChange({ tasks });
    }

    const handleClickOutside = e => {
        const { activeIndex, contextMenu } = this.state;
        const { id, dataset } = e.target;

        if(contextMenu && id !== 'context'){
            handleStateChange({
                contextMenu: undefined
            })
        }

        if(dataset.index !== activeIndex && id !== 'Rename'){
            handleStateChange({
                activeIndex: undefined
            })
        }
    }

    const handleRightClick = e => {
        e.preventDefault();
        const { tasks, handleAppStateChange, current } = this.props;

        const Menu = {
            coords: {
                height: e.clientY,
                width: e.clientX
            },
            actions: [
                {
                    title: 'Delete',
                    action: () => {
                        const index = this.parseElementProperty(e, 'index');
                        tasks.splice(index, 1);

                        const updatedIndex = current >= tasks.length ? tasks.length - 1 : current;

                        handleAppStateChange({ 
                            tasks,
                            currentGroupIndex: updatedIndex
                        });
                        handleStateChange({ contextMenu: undefined })
                    }
                },
                {
                    title: 'Rename',
                    action: () => {
                        const index = this.parseElementProperty(e, 'index');
                        handleStateChange({ activeIndex: index })
                    }
                }
            ]
        }
        
        handleStateChange({
            contextMenu: Menu
        });
    }

    return(
        <Draggable draggableId={ `${task.key}` } index={ index }>
            { provided => 
                <div 
                { ...provided.draggableProps }
                        { ...provided.dragHandleProps }
                        ref={ provided.innerRef }
                >
                    <li className={ index === current ? 'current' : 'category' }
                        onClick={ index !== current ? handleItemClick : undefined }
                        onContextMenu={ handleRightClick }
                        data-index={ index }
                        ref={ item => {
                            if(item){
                                const hidden = item.querySelector('div');
                                const input = item.querySelector('input');

                                const width = Math.round(hidden.scrollWidth);
                                input.style.width = width + 'px';
                            }
                        }}
                        >
                        <div className='hidden'>{ category }</div>

                        <input className={ activeIndex !== index ? 'disabled' : '' }
                            data-index={ index }
                            value={ category }
                            spellCheck='false'
                            ref={ input => { if(input && activeIndex === index) input.focus() } }
                            onChange={ handleNameChange } />
                    </li> 
                </div>
            }
        </Draggable>
    )
}