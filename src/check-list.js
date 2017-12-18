import React, {Component} from 'react';
import './check-list.css';

class CheckList extends Component {
    render(){
        let tasks = this.props.tasks.map( task => (
            <li className="checklist-task" key={task.id}>
                <input type="checkbox" defaultChecked={task.done}/>
                {task.name}{' '}
                <a href="#" className="checklist-task--remove"></a>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task" 
                       placeholder="Type then hit enter to add a task"/>
            </div>
        );
    }
}

export default CheckList;
