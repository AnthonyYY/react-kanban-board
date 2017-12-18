import React, {Component} from 'react';
import marked from 'marked';
import Checklist from './check-list';
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
                    <span dangerouslySetInnerHTML={{__html: marked(this.props.desc)}}></span>
                    <Checklist cardId={this.props.id} tasks={this.props.tasks} />
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
