import React, { Component } from 'react'
import Categories from './Components/Categories/Categories'
import Create from './Components/Create/Create'
import Tasks from './Components/Tasks/Tasks'
import './App.css'
import './Components/ListItem/ListItem.css'

export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
            currentGroupIndex: undefined
        }
    }

    componentDidMount(){
        const data = [
            {
                category: 'general',
                list: [
                    { value: 'clean dishes' },
                    { value: 'go to school' }
                ]
            },
            {
                category: 'programming',
                list: [
                    { value: 'finish erin' },
                    { value: 'todolist' }
                ]
            }
        ];
        const currentGroupIndex = 0;

        data.map(group => {
            group.list.map(item => {
                item.key = Math.random();
            })
        })

        this.setState({
            currentGroupIndex,
            tasks: data,
        })
    }

    handleAppStateChange = data =>{
        this.setState(data)
    }

    render(){
        const { handleAppStateChange } = this;
        const { tasks, currentGroupIndex } = this.state;

        console.log(tasks);

        return(
            <div>
                { typeof currentGroupIndex === 'number' && 
                    <div>
                        <Categories tasks={ tasks }
                                    handleGroupSwitch={ handleAppStateChange }
                                    current={ currentGroupIndex } /> 
                                        
                        <Tasks tasks={ tasks }
                            current={ currentGroupIndex }
                            handleTasksChange={ handleAppStateChange }/>
                    </div>
                }
                <Create handleCreation={ handleAppStateChange }
                        tasks={ tasks }
                        current={ currentGroupIndex }/>
            </div>
        )
    }
}