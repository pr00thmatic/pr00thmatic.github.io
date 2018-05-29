import React, {Component} from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import db from '../firebase/db';

import './centered.css';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleBinding = this.handleBinding.bind(this);
  }

  handleBinding (propName, event) {
    var o = {};
    o[propName] = event.target.value;
    this.setState(o);
  }

  handleLogin () {
    console.log('UNSAFE PROVITIONAL LOGIN!');
    db.login(this.state.username).then(() => {
      this.setState({ loggedIn: true });
    });
  }

  render () {
    var welcome = (
      <Grid
         textAlign='center'
         style={{ height: '100%' }}
         verticalAlign='middle'
         >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Bienvenido {this.state.username}!
          </Header>
        </Grid.Column>
      </Grid>
    );

    var normal = (
      <Grid
         textAlign='center'
         style={{ height: '100%' }}
         verticalAlign='middle'
         >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Accede
          </Header>
          <Form size='large'>
            <Segment>
              <Form.Input
                 fluid
                 icon='user'
                 iconPosition='left'
                 placeholder='Nombre'
                 value={ this.state.username }
                 onChange={(e) => this.handleBinding('username', e)}
                />
                <Form.Input
                   fluid disabled
                   icon='lock'
                   iconPosition='left'
                   placeholder='Contraseña'
                   type='password'
                   value={ this.state.password }
                   onChange={(e) => this.handleBinding('password', e)}
                  />

                  <Button
                     color='teal' fluid size='large'
                     onClick={(e)=>this.handleLogin(e)}>Login</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );


    return (
      <div className='container'>
        { this.state.loggedIn? welcome: normal }
      </div>
    );
  }
}

export default Login;
