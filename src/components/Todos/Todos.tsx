import React, { useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addTodo, deleteCompletedTodos, setFilterShow, FilterType,
   selectTodos, selectActiveTodoCount, selectFilterShow } from '../../app/slices/todoSlice';

import { TodoItem } from './TodoItem';

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export function Todos() {
  const [inputValue, setInputValue] = useState('');

  const todos = useAppSelector(selectTodos);
  const filter = useAppSelector(selectFilterShow);
  const activeTodoCount = useAppSelector(selectActiveTodoCount);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  }
  const handleSubmit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const listItems = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed}>
      </TodoItem>
    )
  });

  return (
    <>
      <TextField fullWidth label="What needs to be done" id="todo-input"
        value={inputValue}
        onChange={(event) => handleInputChange(event)}
        onKeyDown={(event) => handleSubmit(event)} />
      <List>
        {listItems}
      </List>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={3}>
          <GridItem>
            <Typography variant="body2" component="div">
              {activeTodoCount !== 1 ? `${activeTodoCount} items left` : `${activeTodoCount} item left`} 
            </Typography>
          </GridItem>
        </Grid>
        <Grid item xs={5}>
          <GridItem>
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button size="small" sx={{ lineHeight: '1', padding: '0px 5px' }}
              onClick={() => dispatch(setFilterShow(FilterType.All))}
              variant={filter === FilterType.All ? 'outlined' : 'text'}
            >
              All
            </Button>
            <Button size="small" sx={{ lineHeight: '1', padding: '0px 5px' }}
              onClick={() => dispatch(setFilterShow(FilterType.Active))}
              variant={filter === FilterType.Active ? 'outlined' : 'text'}
            >
              Active
            </Button>
            <Button size="small" sx={{ lineHeight: '1', padding: '0px 5px' }}
              onClick={() => dispatch(setFilterShow(FilterType.Completed))}
              variant={filter === FilterType.Completed ? 'outlined' : 'text'}
            >
              Completed
            </Button>
          </ButtonGroup>
          </GridItem>
        </Grid>
        <Grid item xs={4}>
          <GridItem>
            <Button size="small" sx={{ lineHeight: '1', padding: '0px 1px' }}
              onClick={() => dispatch(deleteCompletedTodos())}
            >
              Clear Completed
            </Button>
          </GridItem>
        </Grid>
      </Grid>
    </>
  );
}
