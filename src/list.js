import React, {Component} from 'react';
import Card from './card';
import PropTypes from 'prop-types';
import './list.css';

class List extends Component {
    render(){
        const cards = this.props.cards.map( card => <Card 
            key={card.id} 
            taskCallbacks={this.props.taskCallbacks}
            cardCallbacks={this.props.cardCallbacks}
            {...card} /> 
        );

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

export default List;

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}