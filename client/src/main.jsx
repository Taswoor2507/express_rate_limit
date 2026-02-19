
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
        <RouterProvider router={router} />
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 4000,
                style: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '16px 24px',
                },
                success: {
                    iconTheme: {
                        primary: '#4ade80',
                        secondary: '#ffffff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                },
            }}
        />
    </AuthProvider>
)
