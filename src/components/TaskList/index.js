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
    this.getTaskList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.taskList !== this.props.taskList) {
      this.setState({
        taskList: this.props.taskList,
      });
    }
    if (prevProps.activeTab !== this.props.activeTab) {
      this.getTaskList();
    }
  }

  getTaskList = () => {
    const { taskList = [], activeTab } = this.props;
    let newList = taskList;
    if (activeTab === "Active Task") {
      newList = newList.filter((d) => d.isCompleted === false);
      console.log('list', newList)
    } else if (activeTab === "Completed Task") {
      newList = newList.filter((d) => d.isCompleted === true);
    }
    this.setState({
      taskList: newList,
    });
  };

  handleItemClick = (item, key, value, index) => {
    console.log('sadda')
    const { taskList: newTaskList } = this.state;
    newTaskList.find((d, i) => {
      if (i === index) {
        item[key] = value;
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
    return (
      <div className="task-component">
        <div className="remainingTask">{taskList.length} Task Remaining</div>
        {taskList.map((item, index) => {
          console.log('item', item)
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
                  defaultChecked={item.isCompleted ? true : false}
                />
                <input
                  type="text"
                  className={`input ${item.isCompleted ? "completed" : ""}`}
                  placeholder="Add Your Task Here"
                  value={item.taskName || value}
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
                    this.handleItemClick(item, "isEditable", true, index)
                  }
                >
                  Edit
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
