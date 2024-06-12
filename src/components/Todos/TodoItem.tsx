import React, { memo } from 'react';
import { useAppDispatch } from "../../app/hooks";
import { toggleTodo, deleteTodo } from '../../app/slices/todoSlice';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';

export interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
  }

export const TodoItem: React.FC<TodoItemProps> = memo( function( {id, text, completed} ) {
    const dispatch = useAppDispatch()
  
    const handleToggleTodo = (id: number) => {
      dispatch(toggleTodo(id));
    }
  
    const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.stopPropagation();
      dispatch(deleteTodo(id));
    };
  
  
    const todoItem = (todo: TodoItemProps) => {
      switch (todo.completed) {
        case true:
          return (
            <ListItem onClick={() => handleToggleTodo(todo.id)}
              secondaryAction={
                <IconButton onClick={(event) => handleDeleteTodo(event, todo.id)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                backgroundColor: 'grey.100',
                cursor: 'default',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: 'inherit',
                    color: 'inherit',
                  }}
                >
                  <DoneIcon color="success" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={todo.text}
                style={{ textDecoration : 'line-through' }}
              />
            </ListItem>
          );
        case false:
          return (
            <ListItem onClick={() => handleToggleTodo(todo.id)}
              secondaryAction={
                <IconButton onClick={(event) => handleDeleteTodo(event, todo.id)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              sx={{              
                cursor: 'default',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: 'inherit',
                    color: 'inherit',
                  }}
                >
                  <RadioButtonUncheckedTwoToneIcon  color="info"  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={todo.text}
              />
            </ListItem>
          );
        default:
          return null;
      }
    }  
  
    return (
      <>
        {todoItem({id, text, completed})}
      </>
    );
  })