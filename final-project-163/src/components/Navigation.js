import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

import * as routes from '../constants/routes.js';

class Navigation extends React.Component {
  handleClick (route) {
    window.open(route, '_self');
  }

  render () {
    return (
      <div>
        <Menu attached='top'>
          <Dropdown item icon='content' simple>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>this.handleClick(routes.LOG_IN.route)}>
                Acceder
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>this.handleClick(routes.ASSIGNATURE_CONFIGURATION.route)}>
                Panel del Docente
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>this.handleClick(routes.PROFESSOR_MANAGEMENT.route)}>
                Panel del Administrador
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

        <hr/>
      </div>
    );
  };
};

export default Navigation;
