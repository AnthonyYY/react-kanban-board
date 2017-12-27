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

    render(){
        return <KanbanBoard cards={this.state.cards} />
    }
}

export default KanbanBoardContainer;