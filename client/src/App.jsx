import './App.css';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFound';
import HomePage from './pages/Home';
import Project from './pages/Project';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incomming) {
                        return incomming;
                    },
                },
                projects: {
                    merge(existing, incomming) {
                        return incomming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: cache,
});

const Layout = () => {
    return (
        <div className="App">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/projects/:id',
                element: <Project />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <RouterProvider router={router} />
            </ApolloProvider>
        </>
    );
}

export default App;
