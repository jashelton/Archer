import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { filterActions } from '../actions';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
/* global Plotly:true */
import createPlotlyComponent from 'react-plotly.js/factory'

const Plot = createPlotlyComponent(Plotly);

class PlotlyPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.dispatch(filterActions.addFilter(e.points[0].label));
    this.props.updateQuestion();
  }

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
          />
        </CardContent>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const { filters, authentication } = state;
  return { filters, authentication };
}

const connectedPlotlyPieChart = connect(mapStateToProps)(PlotlyPieChart);
export { connectedPlotlyPieChart as PlotlyPieChart };