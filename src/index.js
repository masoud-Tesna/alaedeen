import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import i18n:
import './translations';

// import language context:
import { LanguageProvider } from "./contexts/language/LanguageContext";

import { ConfigProvider } from 'antd';

import * as serviceWorker from './serviceWorker';

const Application = () => {
  return (
    <LanguageProvider>
      <ConfigProvider direction="ltr">
        <App />
      </ConfigProvider>
    </LanguageProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('HornApp'));

serviceWorker.register();
