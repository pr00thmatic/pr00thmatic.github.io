import React, {Component} from 'react';
import { Button, Table } from 'semantic-ui-react';

import './compact.css';

class MultipleSelector extends Component {
  constructor (props) {
    var i;
    var initiallySelected = [];

    super(props);

    for (i=0; i<this.props.selection; i++) {
      initiallySelected.push(i);
    }

    this.state = {
      slices: []
    };

    this.addSelection = this.addSelection.bind(this);
  }

  getIndex (hop, index) {
    if (this.props.hop) {
      return Math.round(hop * (this.props.hop) + index);
    }
    return index;
  }

  getSlices () {
    var i;
    var last = 0;
    var slices = [];

    if (this.props.hop) {
      for (i=1; i<=(this.props.options.length / this.props.hop); i++) {
        slices.push(this.props.options.slice(last, this.props.hop*i));
        last = this.props.hop * i;
      }
    } else {
      slices.push(this.props.options);
    }

    return slices;
  }

  handleClick (hop, index, event) {
    var found;
    index = this.getIndex(hop, index);
    found = this.props.selected.indexOf(index);
    if (found >= 0) {
      this.removeSelection(found);
    } else {
      this.addSelection(index);
    }
  }

  addSelection (index) {
    var arr = [...this.props.selected];

    if (arr.length >= this.props.selection) {
      arr.splice(0,1);
    }

    arr.push(index);
    this.triggerOnChange(arr);
  }

  removeSelection (index) {
    var arr = [...this.props.selected];
    arr.splice(index, 1);
    this.triggerOnChange(arr);
  }

  getColor (index) {
    if (this.props.selected.indexOf(index) >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  }

  triggerOnChange (changes) {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
  }

  render () {
    this.getSlices();

    return (
      <div>
        <Table className="compact-table" compact unstackable>
          <Table.Body>
            {
              this.getSlices().map((item, index) => {
                return (
                  <Table.Row key={"slice-" + index}>
                    {
                      ((hop) => {
                        return item.map((item, index) => {
                          return (
                            <Table.Cell
                               key={"option-" + this.getIndex(hop, index)}>
                              <Button
                                 icon toggle fluid
                                 size='mini'
                                 color={this.getColor(this.getIndex(hop, index))}
                                 onClick={
                                   (e) => this.handleClick(hop, index, e)
                                }
                                >
                                { item }
                              </Button>
                            </Table.Cell>
                          );
                        }, this);
                      })(index)
                    }
                  </Table.Row>
                );
              }, this)
            }
      </Table.Body>
        </Table>
      </div>
    );
  }
}

export default MultipleSelector;
