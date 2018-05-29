import React, {Component} from 'react';
import { Modal, Form, Icon, Segment } from 'semantic-ui-react';

class NewProfessor extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleChange (e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  handleOK () {
    if (this.props.onOK) {
      this.props.onOK();
    }

    this.close();
  }

  handleCancel () {
    if (this.props.onCancel) {
      this.props.onCancel();
    }

    this.close();
  }

  open () {
    this.setState({ open: true });
  }

  close () {
    this.setState({ open: false });
  }

  render () {
    return (
      <Modal
         open={this.state.open}
         style={{
           marginTop: '0px !important',
           marginLeft: 'auto',
           marginRight: 'auto'
         }}
         trigger={<Form.Button
                       attached='top'
                       color='teal'
                       onClick={(e)=>this.open()}
         ><Icon name='plus'/>Añadir docente</Form.Button>}>
        <Modal.Header>Añadir un nuevo docente</Modal.Header>

        <Modal.Description>
          <Segment>
            <Segment>
              <Form>
                <Form.Input
                   placeholder='Nombre del docente'
                   value={this.props.name}
                   onChange={(e) => this.handleChange(e)}
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
    );
  }
}

export default NewProfessor;
