import React from 'react';

import ApiService from '../api/ApiService';

const MAX_RATE = 10;

export default class Criteria extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...props
    };
  };

  handleVoteClick(value) {
    this.props.onVoteClick(value, this.state.idCriteria);
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2 vote-buttons" role="group" aria-label="First group">
            {[...Array(MAX_RATE).keys()].map(i => <button type="button"
                                                          key={`${this.state.idCriteria}-${i}`}
                                                          onClick={() => this.handleVoteClick(i + 1)}
                                                          className="btn secondary">{i + 1}</button>)}
          </div>
        </div>
      </div>
    );
  }
}