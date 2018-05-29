import React, {Component} from 'react';
import { Header, Segment } from 'semantic-ui-react';

import MultipleSelector from './MultipleSelector';

class DaySelector extends Component {
  constructor (props) {
    super(props);

    this.setDay = this.setDay.bind(this);
  }

  handleChange (selected) {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }
  }

  setDay (dayIndex) {
    // this.selector.current.setSelection(dayIndex);
  }

  render () {
    return (
      <div>
        <Segment>
          <Header textAlign='center'>Día</Header>
          <MultipleSelector
             options={DaySelector.days}
             selection={this.props.selection}
             selected={this.props.selected}
             ref={this.selector}
             onChange={(e)=>this.handleChange(e)}
            />
        </Segment>
      </div>
    );
  }

}

DaySelector.days=['L', 'M', 'X', 'J', 'V', 'S'];

export default DaySelector;
