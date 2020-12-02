import React, { Component } from 'react'
import './Create.css'

export default class Create extends Component{
    constructor(props){
        super(props);

        this.state = {
            areOptionsActive: false
        }
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = e => {
        const { id } = e.target;

        if(id !== 'add' && id !== 'task' && id !== 'category'){
            this.setState({
                areOptionsActive: false
            })
        }
    }

    handleNewTaskCreation = () => {
        const { handleCreation, tasks, current } = this.props;

        tasks[current].list.push({
            value: 'New Task',
            key: Math.random()
        })
        handleCreation({ tasks })
    }

    handleNewCategoryCreation = () => {
        const { handleCreation, tasks } = this.props;

        tasks.push({
            category: 'category',
            list: []
        });

        handleCreation({ tasks });
    }

    handleAddClick = () => {
        this.setState({
            areOptionsActive: true
        })
    }

    render(){
        const { handleNewTaskCreation, handleNewCategoryCreation, handleAddClick } = this;
        
        return(
            <div id="create">
                { this.state.areOptionsActive 
                  ? <div id="options">
                        <button id='task' onClick={ handleNewTaskCreation }>
                            Task
                        </button>
                        <button id='category' onClick={ handleNewCategoryCreation }>
                            Category
                        </button>
                    </div>
                  : <button id="add" onClick={ handleAddClick }>
                      Cock
                    </button>
                }
            </div>
        )
    }
}