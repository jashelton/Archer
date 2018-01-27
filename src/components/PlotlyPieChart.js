import React from 'react';

import Card, { CardHeader, CardContent } from 'material-ui/Card';

/* global Plotly:true */
import createPlotlyComponent from 'react-plotly.js/factory'
/* (Note that Plotly is already defined from loading plotly.js through a <script> tag) */
const Plot = createPlotlyComponent(Plotly);

export class PlotlyPieChart extends React.Component {
  render() {
    const { question } = this.props;
    
    return(
      <Card>
        <CardHeader
          title={question.question}
          subheader="Subheader"
        />
        <CardContent>
          <Plot
            data={[{
              values: question.answers.map(a => a.response_count),
              labels: question.answers.map(a => a.answer),
              type: 'pie'
            }]}
            layout={{
              height: 400,
              width: 500
            }}
            onClick={this.handleClick}
            onSelected={this.handleSelected}
          />
        </CardContent>
      </Card>
    )
  }
}