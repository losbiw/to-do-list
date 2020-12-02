import React from 'react'
import './Categories.css'

export default function Categories(props){
    const { tasks, handleGroupSwitch, current } = props;

    const handleItemClick = e => {
        const { index } = e.target.dataset;
        const parsed = parseInt(index, 10);

        handleGroupSwitch({ currentGroupIndex: parsed });
    }

    return(
        <div id="categories">
            <h2>Categories</h2>
            
            <ul>
                {
                    tasks.map((task, index) => {
                        const { category } = task;

                        return(
                            <li className={ index === current ? 'current' : '' }
                                onClick={ handleItemClick }
                                key={ category }
                                data-index={ index }>
                                { category }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}