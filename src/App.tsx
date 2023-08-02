import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import LandingPage from './pages/LandingPage';
import ResetPassword from "./pages/ResetPassword";
// import AdminLayout from './components/AdminLayout';
import AdminHome from './pages/Admin/AdminHome';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';
import Componentgroup from './pages/Admin/Componentgroup';
import Component from './pages/Admin/Component';
import PrivateRoute from './auth';
import NewComponentGroup from './pages/Admin/NewComponentGroup';
import NewComponents from './pages/Admin/NewComponents';
import Incidents from './pages/Admin/Incidents';
import NewIncident from './pages/Admin/NewIncident';
import IncidentDetails from './components/details/IncidentDetails';


function App() {
	const { loading } = useSelector((state: any) => state.alerts);
	return (
		<>
			{loading && <Loading />}
			<Toaster position='top-center' reverseOrder={false} />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
				<Route path='/resetpassword' element={<ResetPassword />} />
				
				
				<Route path='/adminhome' element={<AdminHome />} />
				<Route path='/component' element={<Component />} />
				<Route path='/componentgroup' element={<Componentgroup />} />
				<Route path='/incidents' element={<Incidents />} />
				<Route path='/incidentsdetails' element={<IncidentDetails />} />
				{/* <Route  path="/adminhome" element={<PrivateRoute />}>
					<Route path='/adminhome' element={<AdminHome/>}/>
				</Route> */}
				{/* <Route  path="/componentgroup" element={<PrivateRoute />}>
					<Route path='/componentgroup' element={<Componentgroup />} />
				</Route> */}
				{/* <Route  path="/component" element={<PrivateRoute />}>
					<Route path='/component' element={<Component />} />
				</Route> */}
				<Route  path="/newcomponentGroup" element={<PrivateRoute />}>
					<Route path='/newcomponentGroup' element={<NewComponentGroup />} />
				</Route>
				<Route  path="/newcomponent" element={<PrivateRoute />}>
					<Route path='/newcomponent' element={<NewComponents />} />
				</Route>
				{/* <Route  path="/incidents" element={<PrivateRoute />}>
					<Route path='/incidents' element={<Incidents />} />
				</Route> */}
				<Route  path="/newincidents" element={<PrivateRoute />}>
					<Route path='/newincidents' element={<NewIncident />} />
				</Route>
				{/* <Route  path="/incidentsdetails" element={<PrivateRoute />}>
					<Route path='/incidentsdetails' element={<IncidentDetails />} />
				</Route> */}
				
			</Routes>
		</>
	);
}

export default App;
