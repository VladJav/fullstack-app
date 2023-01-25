import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SignUp } from './pages/RegisterPage';
import { SignIn } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <SignIn />,
        },
        {
          path: '/',
          element: <HomePage />,
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
