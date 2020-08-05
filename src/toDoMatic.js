import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class ToDoMatic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edit:false
        }
    }
    componentDidUpdate=(preProps,preState)=>{
        debugger;
        if(preState.edit!==true){
            if(this.props.index!==null){
                const ind=this.props.index;
                let obj=this.props.task.filter((val,index)=>{
                   return index===ind;
                });
                this.refs.task.value=obj[0].task;
                this.setState(()=>({
                  edit:true
                }))
             }
               
        }
  }
    addTask=(e)=>{
       e.preventDefault();
       debugger;
       const task=e.target[0].value;
       if(task===""){
           alert("please Enter your task");
           return false;
       }
       if(this.state.edit){
        this.props.dispatch(editTaskToReducer(task,this.props.index));
       }else{
        this.props.dispatch(addTaskToReducer(task));
       }
       
    }
render(){
    console.log('render',this.props);
    return (
        <div>
     <h1>ToDo Matic</h1>
     <h2>What need to be done ?</h2>
     <form onSubmit={this.addTask}>
    <input type="text" className="form-control" ref="task" style={{width:"50%", marginLeft:"2%", float:"left",marginRight:"5px"}} />
  <button type="submit" className="btn btn-primary">add</button><br /><br/>
  <Link to="/">  <button type="button" className="btn btn-info">Show all task</button></Link>
  <Link to="/activetask"><button type="button" className="btn btn-warning">Show active task</button></Link>
  <Link to="/complededtask"><button type="button" className="btn btn-success">show completed task</button></Link>
     </form>
     <br/><br/><br/>
     <h1>task Remaining</h1>
     <br/>
        </div>
      );
}
}
const addTaskToReducer=(task)=>{
return (dispatch)=>
dispatch({
    type:"ADDTASK",
    payload:task,
})
}
const editTaskToReducer=(task, i)=>{
    return (dispatch)=>
    dispatch({
        type:"EDITTASK",
        payload:{
            task,
            index:i
        },
    })
    }
const mapStateToProp=(state)=>{
    return{
        task:state
    }
}
export default connect(mapStateToProp,null)(ToDoMatic);