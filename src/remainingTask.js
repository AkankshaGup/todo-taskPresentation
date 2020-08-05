import React from "react";
import AllTask from "./taskButton/allTask.js";
import ActiveTask from "./taskButton/activeTask.js";
import CompletedTask from "./taskButton/completedTask.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class RemainingTask extends React.Component{
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                    <Route path="/" component={AllTask} exact={true} />
                <Route path="/activetask" component={ActiveTask} />
                <Route path="/complededtask" component={CompletedTask} />
                    </Switch>
                
                </Router>
            </div>
        )
    }
}

const mapStateToProp=(state,props)=>{
    return{
        task:state
    }
}

export default RemainingTask;