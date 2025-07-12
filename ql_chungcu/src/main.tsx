import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "@/routes/app-router.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    </StrictMode>,
)
