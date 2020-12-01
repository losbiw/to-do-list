import React from 'react'
import List from '../List/List'
import './Categories.css'

export default function Categories(props){
    const { groups, handleGroupSwitch } = props;

    const handleItemClick = e => {
        const { name } = e.target.dataset;
        handleGroupSwitch(name);
    }

    return(
        <div id="categories">
            <h2>Categories</h2>
            
            <List data={ groups }
                  handleClick={ handleItemClick }/>
        </div>
    )
}