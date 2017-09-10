import React from 'react';

import Poll from './Poll.jsx';
import ApiService from '../api/ApiService';

export default class PollContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  };


  componentWillMount() {
    ApiService.getPoll()
      .then(poll => this.setState({
          ...poll,
          isLoading: false
        })
      );
  }

  render() {
    if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }

    return (
      <Poll poll={this.state.poll} items={this.state.items} criterias={this.state.criterias}/>
    );
  }
}