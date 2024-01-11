import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Layout from './AllComponent/Layout/Layout.jsx';
import Home from './AllComponent/Home/Home.jsx';
import Login from './AllComponent/Login/Login.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import SignUp from './AllComponent/SignUp/SignUp.jsx';
import PetListing from './AllComponent/PetListing/PetListing.jsx';
import PetDetails from './AllComponent/PetDetailsPage/PetDetails.jsx';
import DonationCampaing from './AllComponent/DonationCampaing/DonationCampaing.jsx';
import DonationDetails from './AllComponent/DonationCampaing/DonationsDetails/DonationDetails.jsx';
import Dashboard from './AllComponent/Dashboard/Dashboard.jsx';
import AddAPet from './AllComponent/Dashboard/Pages/AddAPet/AddAPet.jsx';
import AllUsers from './AllComponent/Dashboard/Pages/AllUsers/AllUsers.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AdminRoutes from './AllComponent/AdminRoutes/AdminRoutes.jsx';
import AllPets from './AllComponent/Dashboard/Pages/AllPets/AllPets.jsx';
import UpdatePetItem from './AllComponent/Dashboard/Pages/AllPets/UpdatePetItem/UpdatePetItem.jsx';
import AllDonation from './AllComponent/Dashboard/Pages/AllDonation/AllDonation.jsx';
import UpdateDonation from './AllComponent/Dashboard/Pages/AllDonation/IpdateDonation/UpdateDonation.jsx';
import MyAddedPets from './AllComponent/Dashboard/Pages/MyAddedPets/MyAddedPets.jsx';
import CreateDonationCampaign from './AllComponent/Dashboard/Pages/CreateDonationCampaign/CreateDonationCampaign.jsx';
import MyDonationCampaign from './AllComponent/Dashboard/Pages/MyDonationCampaign/MyDonationCampaign.jsx';
import EditDonationPage from './AllComponent/Dashboard/Pages/MyDonationCampaign/EditDonationPage.jsx';
import AdoptionRequest from './AllComponent/Dashboard/Pages/AdoptionRequest/AdoptionRequest.jsx';
import MYDonation from './AllComponent/Dashboard/Pages/MyDonations/MYDonation.jsx';
import ErrorPage from './ErrorPage/ErrorPage.jsx';
import PrivateRoutes from './AllComponent/PrivateRoutes/PrivateRoutes.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement:<ErrorPage></ErrorPage>,
    children : [
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/petListing',
        element: <PetListing></PetListing>
      },
      {
        path: '/details/:id',
        element: <PetDetails></PetDetails>,
        loader: ()=> fetch('https://project-twelve-omega.vercel.app/petLIsting')
      },
      {
        path: '/donationDetails/:id',
        element: <DonationDetails></DonationDetails>,
        loader: ()=> fetch('https://project-twelve-omega.vercel.app/donationCampaign')
      },
      {
        path: '/donation',
        element: <DonationCampaing></DonationCampaing>
      },
    ]
  },
  // {
  //   path: '/dashboard',
  //   element: <Dashboard></Dashboard>,
  //   errorElement:<ErrorPage></ErrorPage>,
  //   children:[
  //     {
  //       path:'/dashboard/AddAPet',
  //       element:<PrivateRoutes><AddAPet></AddAPet></PrivateRoutes> 
  //     },
  //     // admin routes
  //     {
  //       path:'/dashboard/users',
  //       element:<AllUsers></AllUsers>
  //     },
  //     {
  //       path:'/dashboard/AllPets',
  //       element:<AllPets></AllPets>
  //     },
  //     {
  //       path:'/dashboard/updateItem/:id',
  //       element: <PrivateRoutes><UpdatePetItem></UpdatePetItem></PrivateRoutes> ,
  //       loader:({params})=>fetch(`https://project-twelve-omega.vercel.app/petLIsting/${params.id}`)
  //     },
  //     {
  //       path:'/dashboard/updateDonation/:id',
  //       element: <UpdateDonation></UpdateDonation>,
  //       loader:({params})=>fetch(`https://project-twelve-omega.vercel.app/donationCampaign/${params.id}`)
  //     },
  //     {
  //       path:'/dashboard/allDonation',
  //       element:<AllDonation></AllDonation>
  //     },
  //     {
  //       path:'/dashboard/myAddedPet',
  //       element:<PrivateRoutes><MyAddedPets></MyAddedPets></PrivateRoutes> ,
  //     },
  //     {
  //       path:'/dashboard/createDonation',
  //       element: <PrivateRoutes> <CreateDonationCampaign></CreateDonationCampaign></PrivateRoutes>,
  //     },
  //     {
  //       path:'/dashboard/myDonationCampaigns',
  //       element:<PrivateRoutes> <MyDonationCampaign></MyDonationCampaign></PrivateRoutes>,
  //     },
  //     {
  //       path:'/dashboard/editDonationCampaigns/:id',
  //       element:<PrivateRoutes><EditDonationPage></EditDonationPage></PrivateRoutes> ,
  //       // loader:({params})=>fetch(`https://project-twelve-omega.vercel.app/donationCampaign/${params.id}`)
  //     },
  //     {
  //       path:'/dashboard/adoptionRequest',
  //       element:<PrivateRoutes> <AdoptionRequest></AdoptionRequest></PrivateRoutes>,
  //     },
  //     {
  //       path:'/dashboard/myDonation',
  //       element:<PrivateRoutes><MYDonation></MYDonation></PrivateRoutes> ,
  //     },
  //   ]
  // }
]);



const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-screen-lg mx-auto'>
            <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
