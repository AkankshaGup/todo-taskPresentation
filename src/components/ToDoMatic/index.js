import React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import Footer from "../Footer";
import "./style.scss";
import TaskList from "../TaskList";
import { updateActiveTab, addTask } from "../../actions";

class ToDoMatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  addTask = () => {
    const { value } = this.state;
    
    const task = {
      taskName: value,
      isCompleted: false,
      isEditable: false
    };
    this.setState({
      value: "",
    });
    this.props.addTask(task);
  };

  render() {
    const { value } = this.state;
    const { activeTab } = this.props;

    return (
      <div className="component-wrapper">
        <Header />
        <div className="app-container">
          <div className="app-component">
            <div className="input-container flex-box">
              <input
                type="text"
                className="input"
                placeholder="Add Your Task Here"
                value={value || ""}
                onChange={(e) => this.setState({ value: e.target.value })}
              />
              <div className="filled-btn" onClick={() => this.addTask()}>
                Add Task
              </div>
            </div>
            <div className="flex-box">
              <div
                className={`no-radius ${
                  activeTab === "All Task" ? "filled-btn" : "simple-btn"
                }`}
                onClick={() => this.props.updateActiveTab('All Task')}
              >
                All Task
              </div>
              <div
                className={`no-radius ${
                  activeTab === "Active Task" ? "filled-btn" : "simple-btn"
                }`}
                onClick={() => this.props.updateActiveTab('Active Task')}
              >
                Active Task
              </div>
              <div
                className={`no-radius ${
                  activeTab === "Completed Task" ? "filled-btn" : "simple-btn"
                }`}
                onClick={() => this.props.updateActiveTab('Completed Task')}
              >
                Completed Task
              </div>
            </div>
          </div>
          <TaskList />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProp = ( { taskReducer: { activeTab } } ) => ({
  activeTab
});

const mapDispatchToProps = {
  updateActiveTab,
  addTask
};

export default connect(mapStateToProp, mapDispatchToProps)(ToDoMatic);
