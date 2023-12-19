import './styles/index.css';
import ReactDOM from 'react-dom';
import { App } from '@/pages/routes/app';
import { BrowserRouter } from 'react-router-dom';

import ReactGA from 'react-ga';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Main = () => {
  const [queryClient] = useState(() => new QueryClient());
  const TRACKING_ID = 'G-1T5FV8QQ0N';

  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById('root')
);
