import React, {Component} from 'react';
import marked from 'marked';
import Checklist from './check-list';
import PropTypes from 'prop-types';
import './card.css';

class Card extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            showDetails: false
        }
    }

    toggleDetail(){
        this.setState({
            showDetails: !this.state.showDetails
        });      
    }

    render(){
        let cardDetails;
        if(this.state.showDetails){
            cardDetails = (
                <div className="card-detail">
                    <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}}></span>
                    <Checklist 
                        cardId={this.props.id}
                        tasks={this.props.tasks} 
                        taskCallbacks={this.props.taskCallbacks} />
                </div>
            );
        }
        return (
            <div className="card">
                <div className="card-side" style={{backgroundColor: this.props.color}} />
                <div
                    className={this.state.showDetails ? "card-title--is-open" : "card-title"}
                    onClick={ this.toggleDetail.bind(this) }>
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        );
    }
}

export default Card;

Card.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    descriotion: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}