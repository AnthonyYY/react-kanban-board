import React, {Component} from 'react';
import './check-list.css';

class CheckList extends Component {

    checkInputKeyPress(e){
        if(e.key === 'Enter'){
            this.props.taskCallbacks.add(this.props.cardId, e.target.value);
            e.target.value = '';
        }
    }

    render(){
        let callbacks = this.props.taskCallbacks;
        let tasks = this.props.tasks.map( (task, index) => (
            <li className="checklist-task" key={task.id}>
                <input 
                    type="checkbox" 
                    onChange={ () => callbacks.toggle(task.id, index, this.props.cardId) }
                    defaultChecked={task.done}/>
                {task.name}{' '}
                <a href="#" className="checklist-task--remove" onClick={ () => callbacks.delete(task.id, index, this.props.cardId) }></a>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task" 
                       onKeyPress={this.checkInputKeyPress.bind(this)}
                       placeholder="Type then hit enter to add a task"/>
            </div>
        );
    }
}

export default CheckList;
