
import { createStore } from 'redux';
import dataReducer from './reducer/dataReducer';

export const store = createStore(dataReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())