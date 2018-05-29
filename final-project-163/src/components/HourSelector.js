import React, {Component} from 'react';
import { Header, Segment } from 'semantic-ui-react';

import MultipleSelector from './MultipleSelector';

class HourSelector extends Component {
  constructor (props) {
    super(props);

    this.setHour = this.setHour.bind(this);

    this.state = {
      hour: []
    };
  }

  handleChange (selection) {
    if (this.props.onChange) {
      this.props.onChange(selection);
    }
  }

  setHour (hourIndex) {
    // this.selector.current.setSelection(hourIndex);
  }

  render () {
    return (
      <div>
        <Segment>
          <Header textAlign='center'>Hora</Header>
          <MultipleSelector
             options={HourSelector.hours}
             selection={1}
             hop={3}
             ref={this.selector}
             selected={this.props.selected}
             onChange={(e)=>this.handleChange(e)} />
        </Segment>
      </div>
    );
  }
}

HourSelector.hours = ['08:00-10:00', '10:00-12:00', '12:00-14:00',
                      '14:00-16:00', '16:00-18:00', '18:00-20:00'];

export default HourSelector;
