import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { registerGamificationEngine } from './store/slices/gamificationEngine';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Start MVP gamification engine
registerGamificationEngine({ dispatch: store.dispatch as any, getState: store.getState });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
