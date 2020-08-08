import { UPDATE_TAB, ADD_TASK, EDIT_TASK, DELETE_TASK } from "../actions";

const initialState = {
  activeTab: "All Task",
  taskList: [{
    taskName: 'Eat',
    isCompleted: false,
    isEditable: false
  },
  {
    taskName: 'Pray',
    isCompleted: false,
    isEditable: false
  },
  {
    taskName: 'Love',
    isCompleted: false,
    isEditable: false
  }]
};

const taskReducer = (state = initialState, action) => {
    const {type, payload} = action;
  switch (type) {
    case UPDATE_TAB:
      return {taskList: [...state.taskList], activeTab: payload};
    
    case ADD_TASK:
      return {taskList: [...state.taskList, payload], activeTab: state.activeTab};
    
    case EDIT_TASK:
      return {taskList: payload, activeTab: state.activeTab};

    case DELETE_TASK:
      return {taskList: payload, activeTab: state.activeTab};
    default:
        return state
  }
};

export default taskReducer;