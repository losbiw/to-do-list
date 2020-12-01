import React from 'react'
import List from '../List/List'
import './Tasks.css'

export default function Tasks(props){
    return <List id='tasks' data={ props.tasks } />
}