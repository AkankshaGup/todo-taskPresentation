import React from "react";
import {connect} from "react-redux";
import ToDoMatic from '../toDoMatic.js';

class AllTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editTask:null,

        }
    }
    delete=(i)=>{
       this.props.dispatch(deleteTask(i))
     
    }
    edit=(i)=>{
        this.setState(()=>({
            editTask:i
        }))
    }
    checkTask=(i)=>{
        debugger;
        let obj=this.props.task.filter((val,index)=>{
            return index===i;
         });
           console.log(obj)
           this.props.dispatch(taskDone(!obj[0].completed,i))
    }
    render(){
        return(
            <div>
                <ToDoMatic index={this.state.editTask}/>
                <ul>
                    {
                        this.props.task.map((val,index)=>{
                            return <li key={index}>
                                <input className="form-check-input" type="checkbox" onChange={()=>this.checkTask(index)} defaultChecked={val.completed?true:false} />
                                <label className="form-check-label" htmlFor="defaultCheck1">{val.task}</label><br/>
                                <button  onClick={()=>this.edit(index)}>edit {val.task}</button>
                                 <button type="button" onClick={()=>this.delete(index)}>delete {val.task}</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
const deleteTask=(ind)=>{
    return dispatch=>
        dispatch({
            type:"DELETETASK",
            payload:ind
        })
}
const taskDone=(check,ind)=>{
    return dispatch=>
        dispatch({
            type:"TASKDONE",
            payload:{
                check,
                index:ind
            }
        })
}
const mapStateToProp=(state)=>{
    return{
        task:state
    }
}

export default connect(mapStateToProp)(AllTask);