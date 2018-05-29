import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Sidebar, Segment } from 'semantic-ui-react';

import Navigation from './Navigation';
import SignUpPage from './SignUp';
import LoginPage from './Login';
import AssignatureConfiguration from './AssignatureConfiguration';
import ProfessorManagement from './ProfessorManagement';

import 'semantic-ui-css/semantic.min.css';

import * as routes from '../constants/routes';

const App = () => (
  <Router>
    <div className="container">
      <Navigation />

      <Route exact path={'/'}
             component={() => <LoginPage />}
        />

      <Route exact path={(routes.SIGN_UP.route)}
             component={() => <SignUpPage />}
        />
        
        <Route exact path={routes.LOG_IN.route}
               component={() => <LoginPage />}
          />

          <Route exact path={routes.ASSIGNATURE_CONFIGURATION.route}
                 component={() => <AssignatureConfiguration name='Lic. Solid Snake'/>}
            />

            <Route exact path={routes.PROFESSOR_MANAGEMENT.route}
                   component={() => <ProfessorManagement />}
              />
          <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js">
          </script>
          <script src="./firebase-config.js">
          </script>

          <Sidebar as={Segment} direction='bottom' visible={true}>
            Creado por: Ruth Margarita García López
          </Sidebar>
    </div>
  </Router>
);

export default App;
