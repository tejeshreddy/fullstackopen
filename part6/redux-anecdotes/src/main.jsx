import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import anecdoteReducer from './reducers/anecdoteSlice';
import filterReducer from './reducers/filterSlice';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { anecdotes: anecdoteReducer, filter: filterReducer },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
