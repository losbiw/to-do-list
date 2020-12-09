import React, { Component } from 'react'
import ContextMenu from '../ContextMenu/ContextMenu'
import './Categories.css'

export default class Categories extends Component{
    constructor(props){
        super(props);

        this.state = {
            contextMenu: undefined,
            activeIndex: undefined
        }
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = e => {
        const { activeIndex, contextMenu } = this.state;
        const { id, dataset } = e.target;

        if(contextMenu && id !== 'context'){
            this.setState({
                contextMenu: undefined
            })
        }

        if(dataset.index !== activeIndex && id !== 'Rename'){
            this.setState({
                activeIndex: undefined
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

        this.handleResize(e.target);
    }

    handleResize = el => {
        setTimeout(() => {
            el.style.width = 0;

            const { scrollWidth } = el;
            el.style.width = scrollWidth + 'px';
        }, 0)
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
                                <li className={ index === current ? 'current' : 'category' }
                                    onClick={ this.handleItemClick }
                                    onContextMenu={ this.handleRightClick }
                                    data-index={ index }
                                    key={ key }>
                                        <input className={ activeIndex !== index ? 'disabled' : '' }
                                               data-index={ index }
                                               value={ category }
                                               spellCheck='false'
                                               ref={ input => {
                                                        if(input){
                                                            this.handleResize(input);
                                                            activeIndex === index && input.focus();
                                                        }
                                               } }
                                               onChange={ this.handleNameChange } />
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