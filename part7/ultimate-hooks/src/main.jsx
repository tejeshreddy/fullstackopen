import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import noteReducer from './slices/noteSlice';
import personReducer from './slices/personSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    persons: personReducer,
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
