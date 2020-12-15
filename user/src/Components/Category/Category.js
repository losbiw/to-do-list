import React from 'react'
import { Draggable } from 'react-smooth-dnd'

export default function Category(props){
    const { index, tasks, category, current, activeIndex, handleAppStateChange, handleStateChange } = props;

    const parseElementProperty = (e, property) => {
        const value = e.target.dataset[property];
        
        try{
           return parseInt(value, 10)
        }
        catch(err){
            throw err
        }
    }

    const handleItemClick = e => {
        const parsed = parseElementProperty(e, 'index');

        handleAppStateChange({ currentGroupIndex: parsed });
    }

    const handleNameChange = e => {
        const parsed = parseElementProperty(e, 'index');
        
        tasks[parsed].category = e.target.value;
        handleAppStateChange({ tasks });
    }

    const handleRightClick = e => {
        e.preventDefault();

        const Menu = {
            coords: {
                height: e.clientY,
                width: e.clientX
            },
            actions: [
                {
                    title: 'Delete',
                    action: () => {
                        const index = parseElementProperty(e, 'index');
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
                        const index = parseElementProperty(e, 'index');
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
        <Draggable key={ index }>
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
        </Draggable>
    )
}