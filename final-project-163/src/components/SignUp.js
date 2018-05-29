import React, {Component} from 'react';
import { Button, Grid, Header, Form, Segment, Message } from 'semantic-ui-react';

import './centered.css';
import { auth } from '../firebase';

class SignUp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleBinding = this.handleBinding.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleBinding (propName, event) {
    var o = {};
    o[propName] = event.target.value;
    this.setState(o);
  }

  handleSubmission (event) {
    auth.register(this.state.email);
  }

  render () {
    return (
      <div className="container">
        <Grid
           textAlign='center'
           style={{ height: '100%' }}
           verticalAlign='middle'
           >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Regístrate
            </Header>
            <Form size='large' onSubmit={this.handleSubmission}>
              <Segment>
                <Form.Input
                   fluid
                   icon='user'
                   iconPosition='left'
                   placeholder='e-mail'
                   value={ this.state.email }
                   onChange={(e) => this.handleBinding('email', e)}
                  />
                  <Button type="submit"
                          color='teal'
                          fluid size='large'>Registrarse</Button>
              </Segment>
            </Form>
            <Message>
              Recibirás un link desde el cual podrás acceder al sitio en cualquier momento.
            </Message>
          </Grid.Column>
        </Grid>

      </div>
    );
  }
}

export default SignUp;
