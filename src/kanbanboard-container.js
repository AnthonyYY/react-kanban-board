import React, {Component} from 'react';
import KanbanBoard from './kanban-board';
import 'whatwg-fetch';
import update from 'react-addons-update';

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
        .then( cards => {
            this.setState({
                cards: cards
            });
            window.state = this.state;
        } );
    }

    addTask(cardId, taskName){

        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex( card => card.id === cardId );
        let newTask = {
            id: Date.now(),
            name: taskName,
            done: false
        }

        let nextState = update(this.state.cards,{
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });

        this.setState({
            cards: nextState
        });

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERSS,
            body: JSON.stringify(newTask)
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error('server response wasn\'t ok');
            }
        })
        .then(resp => {
            newTask.id = resp.id
            this.setState({
                cards: nextState
            });
        })
        .catch( err => this.setState(prevState));
    }

    deleteTask(cardId, taskId, taskIndex){
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex( card => card.id === cardId );
        let newCards = update(this.state.cards,{
            [cardIndex]: {
                tasks: { $splice: [[taskIndex,1]] }
            }
        });
        this.setState({
            cards: newCards
        });
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method: 'delete',
            headers: API_HEADERSS
        })
        .then( res => {
            if(!res.ok){
                throw new Error("Server response wasn't OK");
            }
        } )
        .catch( err => {
            console.error(err);
            console.log(prevState);
            this.setState(prevState);
        } );
    }

    toggleTask(cardId, taskId, taskIndex){
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex( card => card.id === cardId );
        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }      
            }
        });

        this.setState({
            cards: nextState
        });

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERSS,
            body: JSON.stringify({
                done: newDoneValue
            })
        })
        .then( res => {
            if(!res.ok){
                throw new Error('Server response wasn\'t OK');
            }
        } )
        .catch( err => {
            console.error(err);
            this.setState(prevState);
        } )
    }

    updateCardStatus(cardId, listId){
        let cardIndex = this.state.cards.findIndex( card => card.id === cardId );
        let card = this.state.cards[cardIndex];
        if(card.status !== listId){
            this.setState({
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            });
        }
    }

    updateCardPosition(cardId, afterId){
        if(cardId !== afterId){
            let cardIndex = this.state.cards.findIndex( card => card.id === cardId );
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex( card => card.id === afterId )

            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    render(){
        return (
            <KanbanBoard 
                cards={this.state.cards} 
                taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this)
                }} 
                cardCallbacks={{
                    updateStatus: this.updateCardStatus.bind(this),
                    updateCardPosition: this.updateCardPosition.bind(this)
                }}/>
        );
    }
}

export default KanbanBoardContainer;