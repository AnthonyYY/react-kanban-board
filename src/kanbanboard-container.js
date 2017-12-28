import React, {Component} from 'react';
import KanbanBoard from './kanban-board';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERSS = {
    'Content-Type': 'application/json',
    Authorization: 'anthonyyy'
}

class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cards: []
        }
    }

    componentDidMount(){
        fetch(`${API_URL}/cards`, {headers: API_HEADERSS})
        .then( res => res.json() )
        .then( cards => this.setState({
            cards: cards
        }) );
    }

    addTask(cardId, taskName){

    }

    deleteTask(cardId, taskId, taskIndx){

    }

    toggleTask(cardId, taskId, taskIndex){

    }

    render(){
        return (
            <KanbanBoard 
                cards={this.state.cards} 
                taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this)
                }} />
        );
    }
}

export default KanbanBoardContainer;