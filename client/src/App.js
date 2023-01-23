import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './routes/login-page';

function App() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <SignIn />,
        },
        {
            path: '/register',
            element: <div>Hi</div>,
        },
    ]);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
