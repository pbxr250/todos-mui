import { render, screen, fireEvent  } from '@testing-library/react';
import { test, describe, it, expect, vi } from 'vitest';

import { Provider } from "react-redux";
import { store } from "./app/store";
import App from './App';


test('renders the App', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Assert that the Todos component is rendered
  expect(screen.getByText('Todos')).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();
});


test('renders the App', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Assert clicks
  const todoItem = screen.getByText('Тестовое задание');
  expect(todoItem).toBeInTheDocument();
  fireEvent.click(todoItem);
  expect(store.getState().todos.items[0].completed).toBe(true);
});

test('renders the App', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
 
  const todoInput = screen.getByLabelText('What needs to be done');
  fireEvent.change(todoInput, { target: { value: 'New Todo Item' } });
  fireEvent.keyDown(todoInput, { key: 'Enter', code: 'Enter' });
  expect(store.getState().todos.items[3].text).toBe('New Todo Item');
});