import React, { Component } from 'react'
import ContextMenu from '../ContextMenu/ContextMenu'
import Category from '../Category/Category'
import { Container } from 'react-smooth-dnd'
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

    handleStateChange = data => {
        this.setState(data)
    }

    handleDrop = result => {
        const { tasks, handleAppStateChange, current } = this.props;
        const { removedIndex, addedIndex } = result;

        const dragged = tasks[removedIndex];
        const { key } = tasks[current];

        tasks.splice(removedIndex, 1);
        tasks.splice(addedIndex, 0, dragged);

        const updatedIndex = tasks.findIndex(category => category.key === key);

        handleAppStateChange({ 
            tasks,
            currentGroupIndex: updatedIndex
        });
    }

    render(){
        const { tasks, current, handleAppStateChange } = this.props;
        const { contextMenu, activeIndex } = this.state;

        return(
            <div id='categories'>
                <Container orientation='horizontal'
                            onDrop={ this.handleDrop }>
                    {
                        tasks.map((task, index) => {
                            const { category, key } = task;
                            
                            return <Category task={ task }
                                            index={ index }
                                            category={category}
                                            dragKey={ key }
                                            current={ current }
                                            tasks={ tasks }
                                            activeIndex={ activeIndex }
                                            handleStateChange={ this.handleStateChange }
                                            handleAppStateChange={ handleAppStateChange }
                                            key={ key } /> 
                        })
                    }
                </Container>

                { contextMenu && <ContextMenu data={ contextMenu }/> }
            </div>
        )
    }
}