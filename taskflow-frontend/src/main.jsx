import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import taskStore from "./store/taskStore"


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={taskStore}>
    <App />
  </Provider>
  </StrictMode>,
)
