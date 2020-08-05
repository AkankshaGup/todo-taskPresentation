import { act } from "@testing-library/react";

const iState=[{
    task:"Eat",
    completed:true
},
{
    task:"Sleep",
    completed:false
},
{
    task:"Repeat",
    completed:false
},
];

export const TaskReducer=(state=iState, action)=>{
    switch(action.type){
        case "ADDTASK":
            return[
                ...state,
                {
                task:action.payload,
                completed:false
            }]
     case "DELETETASK":
         console.log(state);
        state.splice(action.payload, 1);
         return [...state];

    case "EDITTASK":
        console.log(action.payload);
        const checked=state[action.payload.index].completed;
       state.splice(action.payload.index, 1, {
           task:action.payload.task,
           completed:checked
       });
       console.log(state)
      return state
    case "TASKDONE":
        console.log(action.payload);  
        const Tak=state[action.payload.index].task;
        state.splice(action.payload.index, 1, {
            task:Tak,
            completed:action.payload.check
        });
    }
    return state;
}