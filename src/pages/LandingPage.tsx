import { useEffect, useState } from "react";
import StatusOptions from "../components/StatusOptions";
import Subscribe from "../components/Subscribe";
import { Link } from "react-router-dom";
import Operational from "../components/statusComponents/Operational";
import Notoperational from "../components/statusComponents/Notoperational";
import { incidentHistory } from "../api/public";
import moment from "moment";
import Accordion from '../components/Accordion';

const LandingPage = () => {
	const [subscribe, setSubscribe] = useState(false);
	const [incidentsHistory, setIncidentHistory] = useState([]);
	const [operational, setOperational] = useState("Operational");

	const listIncidents = async () => {
		const incidentHistoryresponse: any = await incidentHistory();
		
		if (incidentHistoryresponse.status === 200) {
			setIncidentHistory(incidentHistoryresponse.data);
			
		} else {
			setOperational("Not operational")
			return;
		}
	};


	useEffect(() => {
		listIncidents();
	}, []);

	return (
		<div className='relative h-screen w-full '>
			{subscribe && <Subscribe setSubscribe={setSubscribe} />}

			<nav className='fixed top-0 flex justify-between items-center bg-white border-gray-200 h-[70px] shadow'>
				<div className=' flex flex-wrap w-screen items-center justify-between '>
					<div className=' flex justify-between max-[767px]:w-full'>
						<div className='flex items-center justify-between h-[70px] w-72 bg-[#173255] px-4'>
							<img
								src='instanta-logo-on--menu.svg'
								className='h-11 mr-2'
								alt='Flowbite Logo'
							/>
							<img
								src='in-menu-icon-white.svg'
								className='h-[14px] mr-2'
								alt='Flowbite Logo'
							/>
						</div>
					</div>

					<div className='mr-24 w-96' id='navbar-default'>
						<ul className='font-medium flex items-center justify-between p-4 rounded-lg '>
							<li>
								<div
									className='flex bg-[#1A79F9] h-11 w-48 items-center justify-center cursor-pointer rounded-lg md:p-0 '
									aria-current='page'
									onClick={() => setSubscribe(true)}>
									<p className='p-0 text-white'>Subscribe to updates</p>
								</div>
							</li>
							<li>
								<img
									src='user.svg'
									alt=''
									className='block my-2 ml-3 h-[35px] text-gray-900 rounded  '
								/>
							</li>
							<li>
								<Link to={"/login"} className='block pl-1 py-2 '>
									Login
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div className='flex flex-col items-center w-full bg-[#E9F0F4] pt-[70px]'>
				<div className='flex flex-col justify-between items-center h-40 w-[80%]  mt-16 mb-12'>
					{operational === "Operational" ? <Operational /> : <Notoperational />}
					<StatusOptions />
				</div>
				<div className='flex flex-col w-[80%] '>
					<div className='flex gap-8 w-full mb-5'>
						<p className=' font-bold cursor-pointer'>All</p>
						<p className=' font-bold text-[#A3A8AB] hover:text-black cursor-pointer'>
							Components
						</p>
						<p className=' font-bold text-[#A3A8AB] hover:text-black cursor-pointer'>
							Incidents
						</p>
					</div>

					{/* Accordion */}
					<Accordion/>
				</div>

				<StatusOptions />

				{/* Incident History */}
				<div className='flex flex-col w-[80%]  mt-14'>
					<div className='flex gap-8 w-full mb-5'>
						<p className='text-xl font-extrabold '>Incident History</p>
					</div>

					{/* Incident  */}

					{incidentsHistory
						.filter((e: any) => e.type == "Incident")
						.map((each: any) => (
							<div
								className='flex flex-col w-full bg-white border border-[#C8E2F1] rounded-md  my-6 p-10'
								key={each.id}>
								<div className='flex gap-6 items-center h-fit w-fit mb-6'>
									<p className='font-bold text-lg'>{each.componentGroup}</p>

									{each.status == "Operational" ? (
										<div className='flex items-center border-2 border-[#12CD9C] h-fit w-fit rounded-3xl'>
											<p className='p-2 m-0 text-sm text-[#12CD9C]'>Resolved</p>
										</div>
									) : (
										<div className='flex items-center border-2 border-[#FF8181] h-fit w-fit rounded-3xl'>
											<p className='p-2 m-0 text-sm text-[#FF8181]'>
												Unresolved
											</p>
										</div>
									)}
								</div>
								<div className='flex gap-12 mb-10'>
									<p className='text-xs '>
										<span className='font-bold'>Date:</span>{" "}
										{moment(each.startTime).format("MMMM Do YYYY")}
									</p>
									<p className='text-xs '>
										<span className='font-bold'>Time:</span>{" "}
										{moment(each.startTime).format("h:mm:ss a")} WAT
									</p>
									{/* <p className='text-xs '>
										<span className='font-bold'>Duration:</span> 20 minutes
									</p> */}
								</div>
								<p className='mb-10'> {each.message}</p>
								<p className='text-xs'>Affected Services</p>
								<div className='flex gap-6 mt-5'>
									<div className='flex items-center border border-black h-fit rounded-3xl'>
										<p className='p-2 m-0 text-sm '>{each.componentName}</p>
									</div>
									{/* <div className='flex items-center border border-black h-fit  rounded-3xl'>
								<p className='p-2 m-0 text-sm'>Email Authentication</p>
							</div> */}
								</div>
							</div>
						))}
				</div>

				<footer className=' flex justify-between items-start w-[80%] h-60 mb-40 mt-20'>
					<div className='flex flex-col w-[345px] items-start justify-center gap-2'>
						<div className=' flex items-center justify-center'>
							<img src='sysserve-logo.svg' alt='' />
							<div className='flex flex-col ml-3'>
								<p className='p-0 m-0 text-4xl font-bold'>sysserve</p>
								<p className='p-0 m-0 text-xs'>...be productive</p>
							</div>
						</div>
						<p className='p-0 m-0 text-[#000000A6]'>
							10 Hughes Avenue Alagomeji, Yaba, Lagos, Nigeria.
						</p>
						<p className='p-0 m-0 text-[#000000A6]'>Phone: +234 (0) 12914837</p>
						<p className='p-0 m-0 text-[#000000A6]'>
							Email: info@sysservesolutions.com
						</p>
					</div>
					<div className='flex flex-col gap-2 items-start'>
						<p className='m-0 p-0 text-xl'>Sitemap</p>
						<p className='m-0 p-0 text-[#000000A6]'>Home</p>
						<p className='m-0 p-0 text-[#000000A6]'>Dashboard</p>
						<p className='m-0 p-0 text-[#000000A6]'>Subscribe to update</p>
						<p className='m-0 p-0 text-[#000000A6]'>Support</p>
					</div>
					<div className='flex flex-col gap-2 items-start'>
						<p className='m-0 p-0 text-xl'>Connect with us</p>
						<div className='flex gap-2'>
							<img src='linkedin.svg' alt='' className=' w-8 h-8' />
							<img src='twitter.svg' alt='' className=' w-8 h-8' />
							<img src='youtube.svg' alt='' className=' w-8 h-8' />
							<img src='instagram.svg' alt='' className=' w-8 h-8' />
							<img src='facebook.svg' alt='' className=' w-8 h-8' />
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default LandingPage;
