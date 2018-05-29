import React, {Component} from 'react';
import { Header, Grid, Dimmer, Loader } from 'semantic-ui-react';

import db from '../firebase/db.js';
import auth from '../auth';
import Assignature from './Assignature';

import './centered.css';

class AssignatureConfiguration extends Component {
  loggedIn = false;

  constructor (props) {
    super(props);
    this.updateModel();

    this.state = {
      assignatures: [],
      professorID: -1,
      loaded: false
    };
  }

  updateModel () {
    if (auth.getUserId() !== '') {
      this.loggedIn = true;

      db.professors(auth.getUserId()).then((snapshot) => {
        var val = snapshot.val();
        var assignatures = [];

        Object.keys(val.assignatures).forEach((key) => {
          assignatures.push({
            name: key,
            hour: val.assignatures[key].hour,
            day: val.assignatures[key].day
          });

          this[key] = React.createRef();
        });

        this.setState({
          assignatures,
          professorID: auth.getUserId(),
          name: val.name,
          loaded: true
        });
      });

    }
  }

  handleChange (model, index) {
    var a = [...this.state.assignatures];
    a[index] = {...model};

    this.setState({
      assignatures: a
    });

    var assignature = {...model};
    if (!assignature.day) {
      assignature.day = [];
    }
    if (!assignature.hour) {
      assignature.hour = [];
    }
    delete(assignature.name);
    db.setAssignature(this.state.professorID, assignature, model.name);
    console.log(this.state.professorID, assignature, model.name);
  }

  componentDidUpdate () {
    var i;
    var assignatures = this.state.assignatures;
    var ref;

    if (this.state.loaded && this.state.loggedIn) {
      for (i=0; i<assignatures.length; i++) {
        ref = this[assignatures[i].name].current;
        ref.setSchedule(assignatures[i].day, assignatures[i].hour);
      }
    }
  }

  render () {
    var loader = (
      <Dimmer active>
        <Loader size='massive'/>
      </Dimmer>
    );

    var assignatures = (
      this.state.assignatures.map((item, index) => {
        return (
          <div style={{ margin: '1em' }}
               key={'assignature-' + index}>
            <Assignature
               name={item.name}
               ref={this[item.name]}
               model={item}
               onChange={(model)=>this.handleChange(model, index)}
              />
          </div>
        );
      })
    );

    var loggedInUI = (
      <div>
        <Header as='h1' textAlign='center'>
          Bienvenido {this.state.name}!
        </Header>
        <Grid
           textAlign='center'
           style={{ height: '100%' }}
           verticalAlign='middle'
           >
          <Grid.Column style={{ maxWidth: '80%' }}>
            { assignatures }
          </Grid.Column>
        </Grid>
      </div>
    );

    var notLoggedIn = (
      <div>
        <Header as='h1' textAlign='center' color='teal'>
          Bienvenido!
        </Header>
        <Grid
           textAlign='center'
           style={{ height: '100%' }}
           verticalAlign='middle'
           >
          <Grid.Column style={{ maxWidth: '80%' }}>
            Primero debes <a href='/Log-in'>acceder</a>
          </Grid.Column>
        </Grid>
      </div>
    );

    var body = (
      this.state.loaded? (this.loggedIn? loggedInUI: notLoggedIn): loader
    );

    
    return (
      <div>
        { body }
      </div>
    );
  }
}

export default AssignatureConfiguration;
