import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Cookies from 'js-cookie';
import { SignUp } from './pages/RegisterPage';
import { SignIn } from './pages/LoginPage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <SignIn />,
        },
        {
          path: '/',
          element: <div>{Cookies.get('auth-token')}</div>,
        },
        {
            path: '/register',
            element: <SignUp />,
        },
    ]);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
