import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Sigma from './routes/Sigma';
import Omega from './routes/Omega';

export default function Router() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/sigma" component={Sigma} />
      <Route path="/omega" component={Omega} />
    </Switch>
  );
}
