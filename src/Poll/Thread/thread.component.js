import React from 'react';

export class ThreadComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return(
      <div>Thread Component</div>
    )
  }
}