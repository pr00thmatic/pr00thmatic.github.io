import React, {Component} from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

import DaySelector from './DaySelector';
import HourSelector from './HourSelector';

class Assignature extends Component {
  constructor (props) {
    super(props);

    this.state = {
      model : {
        name: this.props.name,
        day: null,
        hour: null,
      }
    };

    this.hourSelector = React.createRef();
    this.daySelector = React.createRef();

    this.setSchedule = this.setSchedule.bind(this);
  }

  handleChange (selected, type) {
    if (this.props.onChange) {
      if (type === 'day') {
        this.setState({
          model: {
            ...this.state.model,
            day: selected
          }
        }, () => this.props.onChange(this.state.model));
      } else {
        this.setState({
          model: {
            ...this.state.model,
            hour: selected
          }
        }, () => this.props.onChange(this.state.model));
      }
    }
  }

  setSchedule (day, hour) {
    this.setState({
      model: {
        ...this.state.model,
        day,
        hour,
      }
    }, ()=>{
      this.forceUpdate();
    });
  }

  componentDidUpdate () {
    this.hourSelector.current.setHour(this.state.model.hour);
    this.daySelector.current.setDay(this.state.model.day);
  }

  render () {
    return (
      <div className="container">
        <Segment style={{ padding: '2em' }}>
          <Header textAlign='center' as='h2'>{ this.props.name }</Header>
          <Grid
             textAlign='center'
             >

            <Segment>
              <Grid.Row>
                <Grid.Column
                   style = {{ maxWidth: '250px' }}
                   >
                  Seleccione un horario <br/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column
                   style = {{ maxWidth: '250px' }}
                   >
                  <HourSelector
                     ref={this.hourSelector}
                     selected={this.props.model.hour || []}
                     onChange={(e) => this.handleChange(e, 'hour')}
                    />
                  <DaySelector
                     selection={2}
                     ref={this.daySelector}
                     selected={this.props.model.day || []}
                     onChange={(e) => this.handleChange(e, 'day')}
                    />
                </Grid.Column>
              </Grid.Row>
            </Segment>

          </Grid>
        </Segment>
      </div>
    );
  }
}

export default Assignature;
