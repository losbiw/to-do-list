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
        
        this.fetchAddresses = {
            getUserData: 'http://localhost:5000/data/',
            postUserData: 'http://localhost:5000/data/update'
        }

        if(process.env.NODE_ENV === 'production'){
            this.fetchAddresses = {
                getUserData: '/data/',
                postUserData: '/data/update'
            }
        }

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
        const { handleResize, handleDataUpdate, changeKeyProperties } = this;

        window.addEventListener('resize', handleResize);
        window.addEventListener('beforeunload', handleDataUpdate);
        window.addEventListener('visibilitychange', handleDataUpdate);

        const data = await fetch(this.fetchAddresses.getUserData, {
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
            const { tasks, userName, photoURL } = res;

            const updated = changeKeyProperties(tasks, false);

            this.setState({
                userName,
                photoURL,
                currentGroupIndex: 0,
                tasks: updated,
                initialTasks: JSON.parse(JSON.stringify(updated))
            })
        }
        catch{
            this.setState({
                currentGroupIndex: 0,
                tasks: null
            })
        }
    }

    componentDidUpdate(_prevProps, prevState){
        if(prevState.initialTasks !== this.state.initialTasks){
            setTimeout(() => {
                this.handleResize();
            })           
        }
    }

    componentWillUnmount(){
        const { handleResize, handleDataUpdate } = this;

        window.removeEventListener('resize', handleResize);
        window.removeEventListener('visibilitychange', handleDataUpdate);
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

    handleDataUpdate = async() => {
        const { tasks, initialTasks } = this.state;

        if(tasks && !areEqual(tasks, initialTasks)){
            const keylessData = this.changeKeyProperties(tasks, true);

            await fetch(this.fetchAddresses.postUserData, {
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

    handleCategoryDelete = index => {
        const { tasks, currentGroupIndex: current } = this.state;
        let updatedIndex;

        tasks.splice(index, 1);

        if(tasks.length === 0) updatedIndex = 0;
        else if(current >= tasks.length) updatedIndex = tasks.length - 1;
        else if(current > index) updatedIndex = current - 1;
        else updatedIndex = current;

        this.setState({ 
            tasks,
            currentGroupIndex: updatedIndex
        });
    }

    handleAppStateChange = data => {
        this.setState(data)
    }

    render(){
        const { handleAppStateChange, handleCategoryDelete } = this;
        const { tasks, currentGroupIndex, size, userName, photoURL } = this.state;

        if(tasks !== null){
            const childProps = {
                size,
                tasks,
                handleAppStateChange,
                handleCategoryDelete,
                current: currentGroupIndex,
            }
    
            return(
                <div id='container'>
                    <Profile {...{ userName, photoURL }}/>

                    { tasks.length !== 0 && 
                        <div id='data'>
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
        else{
            return <SignIn />
        }
    }
}