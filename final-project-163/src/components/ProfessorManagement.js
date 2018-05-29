import React, {Component} from 'react';
import { Grid, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';

import Professor from './Professor';
import NewProfessor from './NewProfessor';
import db from '../firebase/db';

class ProfessorManagement extends Component {
  constructor (props) {
    super(props);

    this.state = {
      professors: {},
      newProfessor: '',
      loaded: false
    };

    this.updateModel();
  }

  updateModel () {
    db.professors().then((snapshot) => {
      this.setState({
        loaded: true
      });
      this.setState({
        professors: snapshot.val()
      }, () => {
        console.log(this.state.professors);
        this.forceUpdate();
      });
    });
  }

  handleNewProfessorChange (val) {
    this.setState({
      ...this.state,
      newProfessor: val
    });
  }

  removeProfessor (id) {
    db.removeProfessor(id);
    this.updateModel();
  }

  addNewProfessor () {
    db.createProfessor({ name: this.state.newProfessor });
    this.updateModel();
  }

  handleNameChange (model, index) {
    var newModel = [...this.state.professors];
    newModel[index] = model;

    this.setState({
      professors: newModel
    }, () => {
      db.setProfessor(index, this.state.professors[index]);
    });
  }

  render () {
    var loader = (
      <Dimmer active>
        <Loader size='massive'/>
      </Dimmer>
    );

    var professors = (
      this.state.professors &&
        Object.keys(this.state.professors).length > 0?
        Object.keys(this.state.professors).map((key) => {
          return (
            <Professor
               name={ this.state.professors[key].name }
               assignatures={ this.state.professors[key].assignatures }
               key={'professor-' + key}
               id={key}
               onProfessorDelete={ (id) => this.removeProfessor(id) }
              onChange={ (model) => this.handleNameChange(model, key) }
              />
          );
        }): ''
    );

    var normal = (
      <Grid
         textAlign='center'
         style={{ height: '100%' }}
         verticalAlign='middle'
         >
        <Grid.Column style={{ maxWidth: '500px' }}>


          <Segment>
            <NewProfessor
               name={this.state.newProfessor}
               onChange={(e) => this.handleNewProfessorChange(e)}
              onOK={(e) => this.addNewProfessor()}
              />

              <Header color='teal'>
                Docentes contratados
              </Header>

              { professors }

          </Segment>

        </Grid.Column>
      </Grid>
    );


    return (
      <div>
        <Header as='h1' textAlign='center'>
          Bienvenido administrador!
        </Header>

        { this.state.loaded? normal: loader }
      </div>
    );
  }
}

export default ProfessorManagement;
