import { StrictMode } from 'react';

import ReactDOM from 'react-dom';

// import i18n:
import "./utilities/i18n";

// import Cookie Provider:
import { CookiesProvider } from "react-cookie";

// import react query provider:
import { QueryClient, QueryClientProvider } from "react-query";

// import react query dev tools:
import { ReactQueryDevtools } from "react-query/devtools";

// import spinner Context:
import { SpinnerProvider } from "./contexts/spiner/SpinnerContext";

// import language context:
import { ConfigProvider } from "./contexts/config/ConfigContext";

// import user  context:
import { UserProvider } from "./contexts/user/UserContext";

/*import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";*/

// import Application:
import App from './App';

// initial query client:
const queryClient = new QueryClient();

/*Sentry.init({
  dsn: "https://fa9d9d9d6d4448e4a01fd5b98d5520f1@o1154697.ingest.sentry.io/6234525",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});*/

const Application = () => {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <SpinnerProvider>
          <ConfigProvider>
            <UserProvider>
              <StrictMode>
                <App />
              </StrictMode>
              {/*<ReactQueryDevtools />*/}
            </UserProvider>
          </ConfigProvider>
        </SpinnerProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('AlaedeenApp'));
