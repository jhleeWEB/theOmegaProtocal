import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';

export default function Router() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
    </Switch>
  );
}
