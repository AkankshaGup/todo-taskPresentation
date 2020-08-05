import React from "react";
import {connect} from "react-redux";
import ToDoMatic from '../toDoMatic.js';


class ActiveTask extends React.Component{
    render(){
        return(
            <div>
                <ToDoMatic />
                <ul>
                    {
                        this.props.task.map((val,index)=>{
                            return <li key={index}>
                                <input className="form-check-input" type="checkbox" defaultChecked={val.completed?true:false} value="" id="defaultCheck1" />
                                <label className="form-check-label" htmlFor="defaultCheck1">{val.task}</label><br/>
                                <button>edit {val.task}</button> <button>delete {val.task}</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProp=(state,props)=>{
    const arr=state.filter((val,ind)=>{
        return val.completed===false;
    })
    console.log(arr);
    return{
        task:arr
    }
}

export default connect(mapStateToProp, null)(ActiveTask);