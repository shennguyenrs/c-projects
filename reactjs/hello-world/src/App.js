import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import Counters from './components/Counters';

export default class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  render() {
    return (
      <>
        <NavBar
          info={this.state.counters.filter((c) => c.value !== 0).length}
        />
        <Counters
          counters={this.state.counters}
          onReset={this.handleReset}
          onDelete={this.handleDelete}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </>
    );
  }

  handleDelete = (id) => {
    let counters = this.state.counters.filter((c) => c.id !== id);
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    let counters = [...this.state.counters];
    let index = this.state.counters.indexOf(counter);
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    let counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    let counters = [...this.state.counters];
    let index = this.state.counters.indexOf(counter);
    counters[index].value--;
    this.setState({ counters });
  };
}
