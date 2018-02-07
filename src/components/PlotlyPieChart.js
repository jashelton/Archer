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

  handleClick(e, id) {
    console.log(e);
    console.log(id);
    this.props.addFilter(e.points[0].label);
    this.props.dispatch(filterActions.addFilter(e.points[0].label));
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
            onClick={(e) => this.handleClick(e, question.id)}
          />
        </CardContent>
      </Card>
    )
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { filters } = state;
  return { filters };
}

const connectedPlotlyPieChart = connect(mapStateToProps)(PlotlyPieChart); // LEARN: unclear
export { connectedPlotlyPieChart as PlotlyPieChart }; // LEARN: why?