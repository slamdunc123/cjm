import React from 'react';

import { Switch, Route } from 'react-router-dom';

// view components
import Home from '../views/Home';
import Members from '../views/Members';

const Main = () => {
  return (
    <div>
      Main
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/members' component={Members} />
      </Switch>
    </div>
  );
};

export default Main;
