import React, { useState } from 'react'
import Categories from '../Categories/Categories'
import Tasks from '../Tasks/Tasks'
import './App.css'

export default function App(){
    const [tasks, setTasks] = useState({
        general: ['wash balls', 'go to school'],
        programming: ['finish  erin', 'kill myself']
    });
    const keys = Object.keys(tasks);

    const [currentGroup, switchGroup] = useState(keys[0])

    return(
        <div id='container'>
            <Categories groups={ keys }
                    handleGroupSwitch={ switchGroup } />
            <Tasks tasks={ tasks[currentGroup] } />
        </div>
    )
}