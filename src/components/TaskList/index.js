import React from "react";
import { connect } from "react-redux";
import { editTask, deleteTask } from "../../actions";
import "./style.scss";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    };
  }

  componentDidMount() {
    const newList = this.getTaskList();
    this.setState({
      taskList: newList,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.taskList !== this.props.taskList) {
      this.setState({
        taskList: this.props.taskList,
      });
    }
    if (prevProps.activeTab !== this.props.activeTab) {
      const newList = this.getTaskList();
      this.setState({
        taskList: newList,
      });
    }
  }

  getTaskList = () => {
    const { taskList = [], activeTab } = this.props;
    let newList = taskList;
    if (activeTab === "Active Task") {
      return newList = newList.filter((d) => d.isCompleted === false);
    } else if (activeTab === "Completed Task") {
      return newList = newList.filter((d) => d.isCompleted === true);
    } else {
      return newList;
    }
  };

  handleItemClick = (item, key, value, index) => {
    const { taskList: newTaskList } = this.state;
    newTaskList.find((d, i) => {
      if (i === index) {
        d[key] = value;
      }
    });
    this.setState(
      {
        taskList: [...newTaskList],
      },
      () => this.props.editTask(this.state.taskList)
    );
  };

  deleteItem = (index) => {
    const { taskList: newTaskList } = this.state;
    newTaskList.splice(index, 1);
    this.setState(
      {
        taskList: [...newTaskList],
      },
      () => this.props.deleteTask(this.state.taskList)
    );
  };

  render() {
    const { value, taskList } = this.state;
    const activetab=this.props.activeTab;
    return (
      <div className="task-component">
       {(taskList.length>0) ? <div className="remainingTask">{taskList.length} {(activetab=="All Task")&&"Total Tasks"}
        {(activetab=="Active Task")&&"Remaining Tasks"}{(activetab=="Completed Task")&&"Completed Task"}</div>
        : <div className="remainingTask">Have something in Mind. Make a task and complete it</div>}
        {taskList.map((item, index) => {
          return (
            <div key={index} className="list-item">
              <div className="flex-box">
             
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) =>
                    this.handleItemClick(
                      item,
                      "isCompleted",
                      e.target.checked,
                      index
                    )
                  }
                  checked={!!item.isCompleted}
                />
                <input
                  type="text"
                  className={`input ${item.isCompleted ? "completed" : ""}`}
                  placeholder="Add Your Task Here"
                  value={item.taskName || value || ''}
                  disabled={!item.isEditable}
                  onChange={(e) =>
                    this.handleItemClick(
                      item,
                      "taskName",
                      e.target.value,
                      index
                    )
                  }
                  onBlur={() =>
                    this.handleItemClick(item, "isEditable", false, index)
                  }
                />
                <div
                  className="filled-btn"
                  onClick={() =>
                    this.handleItemClick(item, "isEditable", item.isEditable ? false :true, index)
                  }
                >
                  {item.isEditable ? 'Save' : 'Edit'}
                </div>
                <div
                  className="filled-btn"
                  onClick={() => this.deleteItem(index)}
                >
                  Delete
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProp = ({ taskReducer: { taskList, activeTab } }) => ({
  taskList,
  activeTab,
});
const mapDispatchToProps = {
  editTask,
  deleteTask,
};

export default connect(mapStateToProp, mapDispatchToProps)(TaskList);
