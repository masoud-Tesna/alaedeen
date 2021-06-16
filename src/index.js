import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import i18n:
import "./translations";

// import language context:
import { LanguageProvider } from "./contexts/language/LanguageContext";

import { UserProvider } from "./contexts/user/UserContext";

import * as serviceWorker from './serviceWorker';

const Application = () => {
  return (
    <UserProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </UserProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('HornApp'));

serviceWorker.register();
