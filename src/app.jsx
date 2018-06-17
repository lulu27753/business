/**
 * @author lulu
 * @email lulu27753@163.com
 * @create date 2018-06-14 09:59:55
 * @modify date 2018-06-14 09:59:55
 * @desc [description]
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
// import ProductRouter    from 'page/product/router.jsx';
import Login from 'page/login/index.jsx';
// import OrderList        from 'page/order/index.jsx';
// import OrderDetail      from 'page/order/detail.jsx';
// import UserList         from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/' render={(props) => (
                <Layout>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/product' component={Home} />
                    <Route path='/product-category' component={Home} />
                    <Route component={ErrorPage} />
                  </Switch>
                </Layout>

              )} />
            </Switch>
          </Router>
        )
    }
}


ReactDOM.render(
  <App />,
    document.getElementById('app')
);
