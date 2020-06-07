import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout'
import Checkout from './containers/Checkout/Checkout';
import Store from './containers/Store/Store';
import Ingredients from './containers/Ingredients/Ingredients';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/ingredients" component={Ingredients} />
        <Route path="/" exact component={Store} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);
