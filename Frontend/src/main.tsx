import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import router from './routes/router.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
    <RouterProvider router={router} />
     <Toaster richColors position="top-right" />
  </React.StrictMode>
);