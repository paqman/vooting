import React from 'react';

import Item from './item.jsx';

export default class Poll extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
      indexActive: 0
    }
  };

  get currentItem() {
    return this.state.items[this.state.indexActive]
  }

  render() {
    return (
      <div>
        <h1>{this.state.poll.name}</h1>
        <Item {...this.currentItem} criterias={this.state.criterias}/>
        {/*{this.state.items.map(item => <Item key={item.idItem} {...item}/>)}*/}
      </div>
    );
  }
}