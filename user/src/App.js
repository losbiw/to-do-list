import React, { Component } from 'react'
import Categories from './Components/Categories/Categories'
import Create from './Components/Create/Create'
import Profile from './Components/Profile/Profile'
import TasksList from './Components/TasksList/TasksList'
import SignIn from './Components/SignIn/SignIn'
import areEqual from 'modules/areEqual'
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

    async componentDidMount(){
        const { handleResize, handleUnload, changeKeyProperties } = this;

        window.addEventListener('resize', handleResize);
        window.addEventListener('beforeunload', handleUnload);

        const data = await fetch('http://localhost:5000/data/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        });

        try{
            const res = await data.json();
            const { tasks } = res;

            const updated = changeKeyProperties(tasks, false);

            this.setState({
                currentGroupIndex: 0,
                tasks: updated,
                initialTasks: updated
            })
        }
        catch{
            this.setState({
                currentGroupIndex: 0,
                tasks: null
            })
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize);
    }

    changeKeyProperties = (obj, isRemoving) =>{
        for(const [_key, value] of Object.entries(obj)){
            if(typeof value === 'object'){
                if(!Array.isArray(value) && !isRemoving){
                    value.key = Math.random();
                }
                else if(!Array.isArray(value)){
                    delete value.key
                }

                this.changeKeyProperties(value, isRemoving);
            }
        }

        return obj
    }

    handleUnload = () => {
        const { tasks, initialTasks } = this.state;

        if(!areEqual(tasks, initialTasks)){
            const keylessData = this.changeKeyProperties(tasks, true);

            fetch('http://localhost:5000/data/update', {
                method: 'POST', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(keylessData)
            })
        }
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

        if(tasks !== null){
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
                    <Profile />
                </div>
            )
        }
        else{
            return <SignIn />
        }
    }
}