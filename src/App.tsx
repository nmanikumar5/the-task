import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PrivateRoute, HomePage, Header, LandingPage } from "./components";
import store from "./redux";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <div className="container">
            <Router>
              <Header />
              <div>
                <Route exact path="/" component={LandingPage} />
                <PrivateRoute exact path="/home" component={HomePage} />
              </div>
            </Router>
          </div>
        </Provider>
      </div>
    );
  }
}
