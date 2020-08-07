import React from "react";
import ToDoMatic from "../components/ToDoMatic";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={ToDoMatic} exact={true} />
        </Switch>
      </Router>
    );
  }
}

export default App;
