import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './components/NavComponent/Home/Home';
import About from './components/NavComponent/About/About';
import Vans, { loader as vansLoader } from './components/NavComponent/Vans/Vans'
import VanDetail, { loader as vanDetailLoader} from './components/VanDetail/VanDetail';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Host/Dashboard';
import Reviews from './components/Host/Reviews';
import HostVans, {loader as hostVansLoader} from './components/Host/HostVans';
import NotFound from './components/NotFound/NotFound';
import HostVansDetail, { loader as hostVanDetailLoader} from './components/Host/HostVansDetail/HostVansDetail';
import Income from './components/Host/Income';
import HostLayout from './components/Layout/HostLayout';
import Details from './components/Host/HostVanNav/Details'
import Pricing from './components/Host/HostVanNav/Pricing';
import Photos from './components/Host/HostVanNav/Photos';
import Error from './components/Error/Error';
import Login, {loader as loginLoader, action as loginAction } from './components/Auth/Login';
import { requireAuth } from './utils';
import './App.css'
import Signup from './components/Auth/Signup';



const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route 
          path='vans' 
          element={<Vans/>} 
          errorElement={<Error/>}
          loader= { vansLoader } 
          />
          <Route
          path='/login'
          element={<Login/>}
          loader={ loginLoader }
          action={ loginAction }
          />
          <Route
            path='/signup'
            element={<Signup/>}

          />
          <Route 
          path='vans/:id' 
          element={<VanDetail/>}
          errorElement={<Error/>}
          loader={ vanDetailLoader }
          />

          <Route path='host' element={<HostLayout/>} >
            <Route 
            index 
            element={ <Dashboard/> }
            loader={ async ({request})=> await requireAuth(request) }
            errorElement={<Error/>}
            />
            <Route 
            path='income' 
            element={<Income/>}
            loader={async({request})=> await requireAuth(request) }
            />

            <Route 
            path='reviews' 
            element={<Reviews/>}
            loader={async({request})=> await requireAuth(request) }
            />

            <Route 
            path='vans' 
            element={<HostVans/>}
            errorElement={<Error/>}
            loader={ hostVansLoader }
            />
            <Route 
            path='vans/:id' 
            element={<HostVansDetail/>}
            errorElement={<Error/>}
            loader={ hostVanDetailLoader }
            >
            <Route 
            index 
            element={<Details/>}
            loader={async({request})=> await requireAuth(request) }
            />
            <Route 
            path='pricing' 
            element={<Pricing/>}
            loader={async({request})=> await requireAuth(request) }
            />

            <Route 
            path='photos' 
            element={<Photos/>}
             loader={async({request})=> await requireAuth(request) }
            />
            </Route>
           </Route>
           <Route path='*' element={<NotFound/>}/>  
        </Route>
));


function App() {
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  )
}

export default App;
