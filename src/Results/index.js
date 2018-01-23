import React from 'react';

export class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return(
      <div>
        Hello from results component.
      </div>
    )
  }
}