import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactGA from 'react-ga';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Home } from './Home';
import React, { Suspense } from 'react';
import { Loading } from './Loading';

const Main = React.lazy(() => import('./main'));
const TheConvent = React.lazy(() => import('./the-convent'));

function initializeTracking() {
    ReactGA.initialize('UA-51754530-1'); // poorclaresarundel.org

    const historyListener = (pathname: string) => {
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
    };

    history.listen((update) => historyListener(update.location.pathname));
    historyListener(window.location.pathname);
}

const history = createBrowserHistory();

initializeTracking();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/*',
        element: (
            <Suspense fallback={<Loading />}>
                <Main />
            </Suspense>
        ),
    },
    {
        path: 'the-convent',
        element: (
            <Suspense fallback={<Loading />}>
                <TheConvent />
            </Suspense>
        ),
    },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
