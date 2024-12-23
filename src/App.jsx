import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./App.css"
import AppLayout from './layouts/app-layout';
import LandingPage from './Page/LandingPage';
import Onboarding from './Page/onboarding';
import JobListing from './Page/JobListing';
import PostJob from './Page/PostJob';
import SaveJob from './Page/SaveJob';
import MyJob from './Page/MyJob';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/Protected-route';
import JobPage from './Page/Job';
import MyJobs from './Page/MyJob';



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job-post",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoute>
            <SaveJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {

  return (

     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App
