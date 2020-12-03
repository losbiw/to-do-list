import React, { Component } from 'react'
import ContextMenu from '../ContextMenu/ContextMenu'
import './Categories.css'

export default class Categories extends Component{
    constructor(props){
        super(props);

        this.state = {
            contextMenu: undefined
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

        if(id !== 'context'){
            this.setState({
                contextMenu: undefined
            })
        }
    }

    handleRightClick = e => {
        e.preventDefault();

        const { tasks, handleAppStateChange, current } = this.props;

        const Menu = {
            coords: {
                height: e.clientY,
                width: e.clientX
            },
            actions: [
                {
                    title: 'Delete',
                    action: () => {
                        const index = this.parseElementProperty(e, 'index');
                        tasks.splice(index, 1);

                        const updatedIndex = current >= tasks.length ? tasks.length - 1 : current;

                        handleAppStateChange({ 
                            tasks,
                            currentGroupIndex: updatedIndex
                        });
                        this.setState({ contextMenu: undefined })
                    }
                },
                {
                    title: 'Rename',
                    action: () => {
                        const index = this.parseElementProperty(e, 'index');
                        this.setState({ activeIndex: index })
                    }
                }
            ]
        }
        
        this.setState({
            contextMenu: Menu
        })
    }

    parseElementProperty = (e, property) => {
        const value = e.target.dataset[property];
        
        try{
           return parseInt(value, 10)
        }
        catch(err){
            throw err
        }
    }

    handleItemClick = e => {
        const { handleAppStateChange } = this.props;
        const parsed = this.parseElementProperty(e, 'index');

        handleAppStateChange({ currentGroupIndex: parsed });
    }

    handleNameChange = e => {
        const { tasks, handleAppStateChange } = this.props;
        const parsed = this.parseElementProperty(e, 'index');
        
        tasks[parsed].category = e.target.value;
        handleAppStateChange({ tasks });
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.activeIndex !== prevState.activeIndex){
            console.log(this.state);
        }
    }

    render(){
        const { tasks, current } = this.props;
        const { contextMenu, activeIndex } = this.state;

        return(
            <div id="categories">
                <ul>
                    {
                        tasks.map((task, index) => {
                            const { category, key } = task;
    
                            return(
                                <li className={ index === current ? 'current' : '' }
                                    onClick={ this.handleItemClick }
                                    onContextMenu={ this.handleRightClick }
                                    data-index={ index }
                                    key={ key }>
                                        <span role="textbox" 
                                              data-index={ index }
                                              onChange={ this.handleNameChange }
                                              suppressContentEditableWarning={true}
                                              contentEditable={ activeIndex === index } >
                                            { category }
                                        </span>
                                </li>
                            )
                        })
                    }
                </ul>

                { contextMenu && <ContextMenu data={ contextMenu }/> }
            </div>
        )
    }
}