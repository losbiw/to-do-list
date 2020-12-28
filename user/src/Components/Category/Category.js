import React from 'react'
import { Draggable } from 'react-smooth-dnd'
import { ReactComponent as Edit } from 'assets/Context/edit.svg'
import { ReactComponent as Deletable } from 'assets/Context/deletable.svg'
import { ReactComponent as Delete } from 'assets/Context/delete.svg'
import './Category.css'

export default function Category(props){
    const { index, tasks, category, current, activeIndex,  menuIndex } = props.data;
    const { handleAppStateChange, handleStateChange, handleCategoryDelete } = props.handlers;

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
        if(e.cancelable) e.preventDefault();

        const { clientX, clientY } = e.nativeEvent;
        const { offsetTop, offsetLeft, offsetParent, clientHeight, clientWidth } = e.nativeEvent.target;
        const { offsetTop: parentOffsetTop, offsetLeft: parentOffsetLeft } = offsetParent;

        const parsed = parseElementProperty(e, 'index');

        const Menu = {
            coords: {
                height: clientY || offsetTop + parentOffsetTop + clientHeight / 1.8,
                width: clientX || offsetLeft + parentOffsetLeft + clientWidth / 1.75
            },
            actions: [
                {
                    title: 'Rename',
                    Icon: Edit,
                    action: () => handleStateChange({ activeIndex: parsed })
                },
                {
                    title: 'Deletable',
                    Icon: Deletable,
                    action: () => {
                        const { deletable } = tasks[parsed];
                        tasks[parsed].deletable = !deletable;
                        handleAppStateChange({ tasks })
                    }
                },
                {
                    title: 'Delete',
                    disabled: !tasks[parsed].deletable,
                    Icon: Delete,
                    action: () => handleCategoryDelete(parsed)
                }
            ]
        }
        
        handleStateChange({
            contextMenu: Menu,
            menuIndex: undefined
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
                        const index = parseElementProperty({ target: item }, 'index');
                       
                        if(index === menuIndex){
                            const contextMenuEvent = document.createEvent('HTMLEvents');
                            contextMenuEvent.initEvent('contextmenu', true, false);

                            item.dispatchEvent(contextMenuEvent);
                        }
                    }
                }}
            >
                <div className='hidden'>{ category }</div>

                <input className={ activeIndex !== index ? 'disabled' : '' }
                    data-index={ index }
                    value={ category }
                    spellCheck='false'
                    ref={ input => { 
                        if(input && activeIndex === index){
                            input.focus()
                        }  

                        if(input){
                            const item = input.parentElement;
                            const hidden = item.querySelector('div');

                            const width = Math.round(hidden.scrollWidth);
                            input.style.width = width + 'px';
                        }
                    } }
                    onChange={ handleNameChange } />
            </li> 
        </Draggable>
    )
}