import React, { Component } from 'react';
import KanbanBoard from './kanban-board';
import logo from './logo.svg';
import cardList from './data.json';

class App extends Component {
  render() {
    return (
      <KanbanBoard cards={cardList}/>
    );
  }
}

export default App;
