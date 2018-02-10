import React from 'react';

export class PreviewComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return(
      <div>Preview Component</div>
    )
  }
}