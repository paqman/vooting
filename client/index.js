import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap';

import PollContainer from './components/PollContainer.jsx';

class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <PollContainer />
      </div>
    );
  }
}

ReactDOM.render(
  <Main/>
  ,
  document.getElementById('app')
);


import './css/index.scss';