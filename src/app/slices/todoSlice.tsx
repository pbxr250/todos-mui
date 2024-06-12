import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface TodoState {
  items: TodoItem[];
  filters: {
    showFilter: FilterType;
  };
}

// Define the initial state using that type
const initialState: TodoState = {
  items: [
    { id: 1, text: 'Тестовое задание', completed: false },
    { id: 2, text: 'Прекрасный код', completed: true },
    { id: 3, text: 'Покрытие тестами', completed: false }
  ],
  filters: {
    showFilter: FilterType.All
  },
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  // reducers
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    deleteCompletedTodos: (state) => {
      state.items = state.items.filter((t) => !t.completed);
    },
    setFilterShow: (state, action: PayloadAction<FilterType>) => {
      state.filters.showFilter = action.payload;
    }
  },
  // selectors
  selectors: {
    selectTodos: (state) => {
      const showFilter = state.filters.showFilter;
      if(showFilter == FilterType.All)
        return state.items;

      return state.items.filter((todo) => {
        if (showFilter === FilterType.Completed && todo.completed ) {
          return true;
        }
        if (showFilter === FilterType.Active && !todo.completed ) {
          return true;
        }
        return false;
      });
    },

    selectFilterShow: (state) => state.filters.showFilter,
      
    selectTodoById: (state, id: number) =>
      state.items.find((todo) => todo.id === id),

    selectCompletedTodos: (state) =>
      state.items.filter((todo) => todo.completed),

    selectActiveTodos: (state) =>
      state.items.filter((todo) => !todo.completed),

    selectActiveTodoCount: (state) =>
      state.items.filter((todo) => !todo.completed).length,
  },
});

export const { addTodo, toggleTodo, deleteTodo, deleteCompletedTodos, setFilterShow } = todoSlice.actions;
export const {
  selectFilterShow,
  selectTodos,
  selectTodoById,
  selectCompletedTodos,
  selectActiveTodos,
  selectActiveTodoCount
} = todoSlice.selectors;
