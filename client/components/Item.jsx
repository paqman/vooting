import React from 'react';

import ApiService from '../api/ApiService';
import Criteria from './Criteria.jsx';

export default class Item extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...props
    };

    this.onVote = this.onVote.bind(this)
  };

  onVote(vote, idCriteria) {
    ApiService.vote(this.state.idItem, idCriteria, vote)
      .catch(error => {
        console.log(error);
        alert('Damn, an error occurred.');
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <span className="item-author">By {this.state.author}</span>

        {this.state.criterias.map(criteria => <Criteria key={criteria.idCriteria}
                                                        {...criteria}
                                                        onVoteClick={this.onVote}/>)}
      </div>
    );
  }
}