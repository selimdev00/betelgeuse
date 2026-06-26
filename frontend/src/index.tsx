import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { store } from './app/store';
import { antdTheme } from './styles/antdTheme';

import reportWebVitals from './reportWebVitals';

import { RouterProvider } from 'react-router-dom';
import router from './router';

import 'antd/dist/reset.css';
import './assets/scss/main.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>,
  );
}

reportWebVitals();
