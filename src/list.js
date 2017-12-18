import React, {Component} from 'react';
import Card from './card';
import './list.css';

class List extends Component {
    render(){
        const cards = this.props.cards.map( card => <Card 
            key={card.id} 
            desc={card.desc}
            color={card.color}
            tasks={card.tasks}
            title={card.title} /> 
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