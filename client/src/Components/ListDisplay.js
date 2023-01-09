import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';
import styled from 'styled-components';
import bgImage from '../Images/background.jpg';

const ListDisplay = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const userHomePage = async () => {
      try {
          const res = await fetch('/getdata', {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              },
          });
          const data1 = await res.json();
          setTaskList(data1.todoList);
          setUserName(data1.name);
          setShow(true);
      } catch (err) {
          console.log(err);
      }
  }

  const postNewTask = async (e) => {
    e.preventDefault();
    const newTask = [{
      task: task,
      completed: false
    }]
    const res = await fetch('/AddTask', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newTask
        })
    });
    const data = await res.json();
    if (!data) {
        console.log("message not send ");
    } else {
        alert("Message Send");
    }
    userHomePage();
  } 

  async function handleCheckChange(item){        
    await fetch('/checkTask', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: item._id
      })
    });
    userHomePage();
  }
  async function handleDeleteTask(item){
    await fetch('/deleteTask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: item._id
        })
    });
    userHomePage();
  }

  function populateList(item) {
    return (
      <div key={item._id}>
        <h2 className="divItem"> 
        <Checkbox onClick={() => handleCheckChange(item)} checked={item.completed}/>
        {(item.completed)? (<Span1 style={{textDecoration:'line-through'}}>{item.task}</Span1>):(<Span1>{item.task}</Span1>)} 
        </h2>                  
        <div className="button-position1">
          <Button style={{marginLeft:10}} size="small" variant="contained" onClick={() => handleDeleteTask(item)}><DeleteIcon /></Button>
        </div>  
      </div>
    );
  }

  useEffect(() => {
      userHomePage();
  }, []);
    return (
      <div>
        <Navbar /> 
        <HomePage>
          <div className="home-div">
            <p>WELCOME {userName}</p><br/>
            { 
              show ? 
              <div>
                <TextField color="primary" label="Enter task here" onChange={(e) => setTask(e.target.value)} style={{display:"inline", paddingTop:15}} sx={{ input: { color: "black", background: "white", }}}/>
                <Button size="large" variant="contained" onClick={postNewTask}>Add</Button>
              </div> 
              :  <p> This is the Prototype MERN TODO APP </p>
            }
            <br/>
          </div>
                
          <Flex1>
            <Item>
              <h3>My Todos</h3><hr />
              { (taskList)? 
                  taskList.map((item) => {
                    if (!item.completed){
                      return populateList(item);
                    }           
                  })
                : <div>value1</div>
              }  
            </Item>
        
            <Item>
              <h3>Completed</h3><hr/>
              { (taskList)? 
                  taskList.map((item) => {
                    if (item.completed){
                      return populateList(item);
                    }           
                  })
                : <div>value2</div>
              } 
            </Item>
          </Flex1>
                
          </HomePage>
      </div>
    );
}


const HomePage = styled.div`
  height: 90vh;
  background-image: url(${bgImage});
  background-attachment: fixed;
	background-repeat: no-repeat;
	background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  .home-div p {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 4px;
    margin-bottom: 0px;
  }
`
const Flex1 = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  width: 70rem;
  height: 30rem;
  background-color: rgb(50, 50, 50);
  border: 2px solid green;
`

const Item = styled.div`
  max-width: 50%;
  min-width: 50%;
  border: 1px solid green;
`

const Span1 = styled.span`
  font-size: 20px;
`
export default ListDisplay;