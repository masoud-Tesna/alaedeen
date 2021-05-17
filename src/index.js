import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ConfigProvider } from 'antd';

import * as serviceWorker from './serviceWorker';

const Application = () => {
  return (
    <ConfigProvider direction="ltr">
      <App />
    </ConfigProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('HornApp'));

serviceWorker.register();
