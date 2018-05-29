import React, {Component} from 'react';
import { Form, Segment, Header, Icon, Modal } from 'semantic-ui-react';

import AssignatureSelector from './AssignatureSelector';

class Professor extends Component {

  constructor (props) {
    super(props);

    this.state = {
      newAssignature: {
        key: null,
        open: false
      }
    };
  }

  handleOK () {
    var newModel = this.getModel();
    if (!newModel.assignatures[this.state.newAssignature.key]) {
      newModel.assignatures[this.state.newAssignature.key] = true;
    }

    if (this.props.onChange) {
      this.props.onChange(newModel);
    }

    this.resetNewAssignature();
  }

  open () {
    this.setState({ newAssignature: { open: true } });
  }

  resetNewAssignature () {
    this.setState({ newAssignature: { key: null, open: false } });
  }

  handleCancel () {
    this.resetNewAssignature();
  }

  handleNewAssignatureChange (key) {
    this.setState({ newAssignature: { key, open: true } });
  }

  handleNameChange (event) {
    var newModel = this.getModel();

    if (this.props.onChange) {
      newModel.name = event.target.value;
      this.props.onChange(newModel);
    }
  }

  handleAssignatureChange (assignature, key) {
    var newModel = this.getModel();

    if (this.props.onChange) {
      delete(newModel.assignatures[key]);
      newModel.assignatures[assignature] = true;

      this.props.onChange(newModel);
    }
  }

  handleSelfDeletion () {
    if (this.props.onProfessorDelete) {
      this.props.onProfessorDelete(this.props.id);
    }
  }

  handleDeletion (event, key) {
    var newModel = this.getModel();
    delete(newModel.assignatures[key]);
    this.props.onChange(newModel);
  }

  getModel () {
    return {
      name: this.props.name,
      assignatures: {
        ...this.props.assignatures
      }
    };
  }

  render () {
    return (
      <Segment>
        <Form size='small'>

          <Form.Input
             placeholder='Nombre del docente'
             action={ <Form.Button
                           color='red'
                           icon='minus'
                           onClick={() => this.handleSelfDeletion() }
                         /> }
             value={this.props.name}
             onChange={ (e) => this.handleNameChange(e) }
             />

          <Segment>
            <Header color='teal'>
              Materias a impartir
            </Header>
            {
              this.props.assignatures && Object.keys(this.props.assignatures).length > 0?
                Object.keys(this.props.assignatures).map((key, index) => {
                  return (
                    <Form.Group
                       key={'assignature-' + index}
                       >
                      <AssignatureSelector
                         assignatureKey={key}
                         onChange={(e) => this.handleAssignatureChange(e, key)}
                        />
                        <Form.Button
                           icon='minus' color='red'
                           onClick={(e) => this.handleDeletion(e, key)}/>
                    </Form.Group>
                  );
                }) :
              ''
            }

        <Modal trigger={<Form.Button
                        attached='bottom' color='teal'
                        onClick={() => this.open()}
                        >
                        <Icon name='plus'/>
                        Añadir materia
                        </Form.Button>}
      style={{
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      open={this.state.newAssignature.open}
        >

        <Modal.Header>Seleccione la materia</Modal.Header>

        <Modal.Description>
        <Segment>
        <Segment>
        <Form>
        <AssignatureSelector
      assignatureKey={this.state.newAssignature.key}
      onChange={(e) => this.handleNewAssignatureChange(e)}
        />
        <hr/>
        <Form.Group>
        <Form.Button color='green' onClick={(e) => this.handleOK(e)}>
        <Icon name='checkmark' />
        Aceptar
      </Form.Button>
        <Form.Button color='red' onClick={(e) => this.handleCancel(e)}>
        <Icon name='cancel'/>
        Cancelar
      </Form.Button>
        </Form.Group>
        </Form>
        </Segment>
        </Segment>
        </Modal.Description>

        </Modal>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default Professor;
