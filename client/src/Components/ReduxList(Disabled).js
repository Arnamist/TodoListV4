import { createSlice, configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { useState, useEffect } from 'react';

import { TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const ListDisplay = () => {
    const todoSlice = createSlice({
    name: 'todo',
    initialState: {todo: JSON.parse(window.localStorage.getItem('taskList')) || []},
    // ACTION
    reducers: {
        addItem: (state, action) => {
        state.todo = [...state.todo, {
            id: Date.now() + Math.random(),
            label: action.payload,  
            completed: false,
            important: false
        }]
        },
        deleteItem: (state, action) => {
            state.todo = state.todo.filter((taskItem) => taskItem.id !== action.payload);
        },
        completeItem: (state, action) => {
            let newTaskList = state.todo.map((taskItem) => {
                if (taskItem.id === action.payload) {
                    return({
                        id: taskItem.id,
                        label: taskItem.label,
                        completed: !taskItem.completed,
                        important: taskItem.important
                    });         
                }else{
                    return (taskItem);
                }
            });
            state.todo = newTaskList;
        },
        importantItem: (state, action) => {
            let newTaskList = state.todo.map((taskItem) => {
                if (taskItem.id === action.payload) {
                    return({
                        id: taskItem.id,
                        label: taskItem.label,
                        completed: taskItem.completed,
                        important: !taskItem.important
                    });         
                }else{
                    return (taskItem);
                }
            });
            state.todo = newTaskList;
        }
    }
    })

    const {addItem, deleteItem, completeItem, importantItem} = todoSlice.actions;
    const todoReducer = todoSlice.reducer;

    // STORE
    const store = configureStore({
        reducer: {
            todoReducer: todoReducer
        }
    })


    // SUBSCRIBE
    const ListDisplay = () => {

        const [task, setTask] = useState(() => {
            return window.localStorage.getItem('task') || ''
        });

        const [listItems, setListItems] = useState(() => {
            return JSON.parse(window.localStorage.getItem('taskList')) || []
        });
        
        useEffect(()=>{
            store.subscribe(() => {
            const items =  store.getState().todoReducer.todo;
            window.localStorage.setItem('task', task);
            window.localStorage.setItem('taskList', JSON.stringify(listItems));
            setListItems([...items]);
            })
        }, [task, listItems]);

        function populateList(item){
            return (
              <div key={item.id}>
                <div className="divItem">
                  <CompleteCheck item={item}/>
                  {(item.completed)? (<span style={{textDecoration:'line-through'}}>{item.label}</span>):(<span>{item.label}</span>)} 
                </div>                  
                <div className="button-position1">
                  <ImportantCheck item={item} />
                  <DeleteButton item={item} />
                </div>  
              </div>
            );
          }
        
        return(
            <div>
                <div className="grid-container">
                    <div className="item1">
                    <h3>REDUX</h3>
                    {  
                        <TextField
                        color="secondary"
                        label="Enter task here" 
                        style={{display:"inline", paddingTop:15}}  
                        value={task}
                        onChange={(e) => { setTask(e.target.value); }}
                        sx={{
                        input: {
                            color: "black",
                            background: "white",
                        }}}/>
                    }
                    <AddButton item={task} />
                    </div>
            
                    <div className="item2">
                    <h3>My Todos</h3><hr/>
                    {listItems.map((item) => {
                        if (!item.completed && item.important){
                            return populateList(item);
                        }           
                    })}  
                    {listItems.map((item) => {
                        if (!item.completed && !item.important){
                            return populateList(item);
                        }           
                    })} 
                    </div>
            
                    <div className="item3">
                    <h3>Completed</h3><hr/>
                    {listItems.map((item) => {
                        if (item.completed && item.important){
                            return populateList(item);
                        }           
                    })}  
                    {listItems.map((item) => {
                        if (item.completed && !item.important){
                            return populateList(item);
                        }           
                    })}  
                    </div>
            
                </div>
            </div>
        );
    }

    // DISPATCH
    const AddButton = ({item}) => {
        return <Button 
            size="large" 
            variant="contained" 
            onClick={() => {store.dispatch(addItem(item))}} 
            >Add</Button>
    }
    const DeleteButton = ({item}) => {
        return <Button 
              style={{marginLeft:10}} 
              size="small" 
              variant="contained"
              onClick={() => store.dispatch(deleteItem(item.id))}
            ><DeleteIcon /></Button>
    }
    const ImportantCheck = ({item}) => {
        return <Button 
            size="small" 
            variant="contained" 
            onClick={() => store.dispatch(importantItem(item.id))}
            >{(item.important)?(<StarIcon />):(<StarBorderOutlinedIcon />)}</Button>
    }

    const CompleteCheck = ({item}) => {
        return <input 
            className="checkbox-size" 
            type="checkbox" 
            onChange={() => store.dispatch(completeItem(item.id))}
            checked={item.completed} /> 
    }

    return (
        <div className="App">
          <ListDisplay />
        </div>
    );
}

export default ListDisplay