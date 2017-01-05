import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import PuzzleContainer from './containers/PuzzleContainer';
import store from './Store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Provider store={store}>
            <PuzzleContainer />
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;
