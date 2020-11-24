// import React, { Fragment } from 'react';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// const App = () => (
//   <Provider store={store}>
//     <Router>
//       <Fragment>
//         <h1> Glassdoor </h1>
//       </Fragment>
//     </Router>
//   </Provider>
// );

// export default App;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;