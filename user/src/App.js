import React, { Component } from 'react'
import Categories from './Components/Categories/Categories'
import Create from './Components/Create/Create'
import TasksList from './Components/TasksList/TasksList'
import './App.css'
import './Components/ListItem/ListItem.css'
import './Components/Scrollbar/Scrollbar.css'

export default class App extends Component{
    constructor(props){
        super(props);

        const { innerHeight, innerWidth } = window;

        this.state = {
            tasks: [],
            currentGroupIndex: undefined,
            size: {
                innerHeight,
                innerWidth
            }
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize);

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
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' },
                    { value: 'todolist' }
                ]
            },
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
            },
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
            },
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
            },
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
            },
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
            group.key = Math.random();

            group.list.map(item => {
                item.key = Math.random();
            })
        })

        this.setState({
            currentGroupIndex,
            tasks: data,
        })
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const { innerHeight, innerWidth } = window;
        
        this.setState({
            size: {
                innerHeight,
                innerWidth
            }
        })
    }

    handleAppStateChange = data => {
        this.setState(data)
    }

    render(){
        const { handleAppStateChange } = this;
        const { tasks, currentGroupIndex, size } = this.state;

        const childProps = {
            size,
            tasks: [ ...tasks ],
            handleAppStateChange,
            current: currentGroupIndex,
        }

        return(
            <div id='container'>
                { tasks.length !== 0 && 
                    <div id="data">
                        <h2>Categories</h2>
                        <Categories { ...childProps } />      
                        <h2>Tasks</h2>                 
                        <TasksList { ...childProps } />
                    </div>
                }
                <Create { ...childProps }/>
            </div>
        )
    }
}