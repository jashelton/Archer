import React from 'react';

export class Question extends React.Component { // LEARN: Difference between 'export default' and 'export class'
  render() {
    return(
      <div>
        <span>{this.props.question.question}</span>
        <ul>
          {this.props.question.answers.map(a => (
            <li key={a.id}>{a.answer}</li>
          ))}
        </ul>
      </div>
    )
  }
}