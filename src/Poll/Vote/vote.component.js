import React from 'react';

export class VoteComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  };

  render() {
    return(
      <div>Vote Component</div>
    );
  };
};