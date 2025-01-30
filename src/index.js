
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './component/app/App'
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
     <Provider store={store}>
       <App/>
     </Provider>
    </React.StrictMode>
  );


  window.addEventListener("unhandledrejection", (event) => {
    // Отключаем ошибку в консоли, если это ошибка 500
    if (event.reason && event.reason.message && event.reason.message.includes("HTTP error! Status: 500")) {
        event.preventDefault(); // Отключаем вывод ошибки в консоль
    }
});
