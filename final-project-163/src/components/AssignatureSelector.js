import React, {Component} from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

import db from '../firebase/db';

class AssignatureSelector extends Component {
  constructor (props) {
    super(props);

    if (!AssignatureSelector.assignatures) {
      db.assignatures().then((snapshot) => {
        var assignatureKeys = [];

        Object.keys(snapshot.val()).forEach((key, index) => {
          assignatureKeys.push({
            key: key,
            value: key,
            text: key + ': ' + snapshot.val()[key].name
          });
        });
        AssignatureSelector.assignatures = assignatureKeys;

        this.forceUpdate();
      });
    }
  }

  handleChange (event, data) {
    if (this.props.onChange) {
      this.props.onChange(data.value);
    }
  }

  render () {
    return (
      <div>
        <Dropdown
           fluid search selection
           options={AssignatureSelector.assignatures || []}
           placeholder='Seleccione una materia'
           value={this.props.assignatureKey}
           action={<Form.Button color='red' icon='plus'/>}
           onChange={(event, data) => this.handleChange(event, data)}/>
      </div>
    );
  }
}

export default AssignatureSelector;
