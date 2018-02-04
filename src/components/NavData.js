import React from 'react';
import { Link } from 'react-router-dom';
import { Router } from 'react-router';
import { history } from '../helpers'
import Icon from 'material-ui/Icon';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { routerItems, secondaryRouterItems } from '../router-items.js';

export const NavItems = (
  <div>
    <Router history={history}>
      <div>
        {routerItems.map(item => (
          <ListItem key={item.viewValue} button component={Link} to={item.route}>
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.viewValue} />
          </ListItem>
        ))}
      </div>
    </Router>
  </div>
);

export const SecondaryNavItems = (
  <div>
    <Router history={history}>
      <div>
        {secondaryRouterItems.map(item => (
          <ListItem key={item.viewValue} button component={Link} to={item.route}>
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.viewValue} />
          </ListItem>
        ))}
      </div>
    </Router>
  </div>
);
