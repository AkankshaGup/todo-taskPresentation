export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TAB = 'UPDATE_TAB';

export const addTask = (payload) => {
  return {
    type: ADD_TASK,
    payload
  };
}

export const editTask = (payload) => {
  return {
    type: EDIT_TASK,
    payload
  };
}

export const deleteTask = (payload) => {
  return {
    type: DELETE_TASK,
    payload
  };
}

export const updateActiveTab = (payload) => {
  return {
    type: UPDATE_TAB,
    payload
  };
}

