import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { incidentHistory } from "../../api/public";
import moment from "moment";
import IncidentDetails from '../../components/details/IncidentDetails';

const Incidents = () => {
	const navigate = useNavigate();
	const [incidentsHistory, setIncidentHistory] = useState([]);
	const [resolved, setResolved] = useState([]);
	const [unresolved, setUnresolved] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [dId, setDId] = useState({});


	const handleIncidents  = (data: any) => {
		setDId(data);
		setShowModal(true);
	}

	const listIncidents = async () => {
		const incidentHistoryresponse: any = await incidentHistory();
		// console.log("responce", incidentHistoryresponse.data);
		if (incidentHistoryresponse.status === 200) {
			setIncidentHistory(incidentHistoryresponse.data);
			setResolved(
				incidentHistoryresponse.data.filter(
					(e: any) => e.status == "Operational"
				)
			);
			setUnresolved(
				incidentHistoryresponse.data.filter(
					(e: any) => e.status == "Not Operational"
				)
			);
		} else {
			return;
		}
	};

	useEffect(() => {
		listIncidents();
	}, []);
	return (
		<>
			{showModal && <IncidentDetails id={dId} setShowModal={setShowModal} />}
			<AdminLayout />
			<div className={incidentsHistory.length == 0 ? ' flex flex-col  pt-[70px] pl-80 w-full h-screen bg-[#E9F0F4] max-[1669px]:pt-[65px] max-[1669px]:pl-64' : ' flex flex-col  pt-[70px] pl-80 w-full  bg-[#E9F0F4] max-[1669px]:pt-[65px] max-[1669px]:pl-64'}>
				<div className='flex items-center justify-between w-full h-16 bg-white px-5'>
					<p className='m-0 p-0 font-bold text-xl'> Incidents</p>
					<div
						className='flex h-12 w-28 border border-[#A9DBFF] rounded-md items-center justify-between px-4 cursor-pointer'
						onClick={() => navigate("/newincidents")}>
						<img src='blueplus.svg' alt='' className=' h-5 w-5' />
						<p className='m-0 p-0 text-[#008FF4] font-bold'>New</p>
					</div>
				</div>
				<div className='flex items-center justify-center '>
					{/* Details */}
					<div className='flex justify-center h-full w-full'>
						{incidentsHistory.length == 0 ? (
							<img src='sleeping.svg' alt='' className='h-44 mt-64' />
						) : (
							<div className='flex flex-col justify-start items-center gap-8 w-full  p-8'>
								<div
									className={
										unresolved.length == 0
											? "hidden flex-col border border-[#C8E2F1] w-full bg-white rounded-md"
											: "flex flex-col border border-[#C8E2F1] w-full bg-white rounded-md"
									}>
									<div className='flex items-center border-b-2 p-5 h-20 w-full '>
										<p className='m-0 p-0 font-bold text-xl'>Unresolved</p>
									</div>
									<div className='flex flex-wrap items-center h-full p-5 gap-4 w-full '>
										{unresolved.map((e: any) => (
											<div
												className='flex  rounded-md shadow-md h-52 w-[30rem] cursor-pointer max-[1669px]:w-[22.5rem]'
												key={e.id} onClick={()=> handleIncidents(e.id)} >
												<div className='flex flex-col justify-center gap-3 items-start p-6 bg-[#F5F5F5] w-full h-full font-bold text-xl'>
													<p className='m-0 p-0'>Name</p>
													<p className='m-0 p-0'>Status</p>
													<p className='m-0 p-0'>Incident visibility</p>
													<p className='m-0 p-0'>Date & time</p>
												</div>
												<div className='flex flex-col justify-center gap-4 p-6 items-start rounded-r-md border-r-4 text-[#00000099] border-[#FF8181] h-full w-full'>
													<p className='m-0 p-0'>{e.componentName}</p>
													<p className='m-0 p-0'>Unresolved</p>
													<p className='m-0 p-0'>Public</p>
													<p className='m-0 p-0'>
														{moment(e.startTime).format("MMM Do YY, h:mm a")}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>

								<div
									className={
										resolved.length == 0
											? "hidden flex-col border border-[#C8E2F1] w-full bg-white rounded-md"
											: "flex flex-col border border-[#C8E2F1] w-full bg-white rounded-md"
									}>
									<div className='flex items-center border-b-2 p-5 h-20 w-full '>
										<p className='m-0 p-0 font-bold text-xl'>Resolved</p>
									</div>

									<div className='flex flex-wrap items-center h-full p-5 w-full '>
										{resolved.map((e: any) => (
											<div className='flex  rounded-md shadow-md h-52 w-[30rem] cursor-pointer max-[1669px]:w-[22.5rem]' key={e.id} onClick={()=> handleIncidents(e.id)}>
												<div className='flex flex-col justify-center gap-3 items-start p-6 bg-[#F5F5F5] w-full h-full font-bold text-xl'>
													<p className='m-0 p-0'>Name</p>
													<p className='m-0 p-0'>Status</p>
													<p className='m-0 p-0'>Incident visibility</p>
													<p className='m-0 p-0'>Date & time</p>
												</div>
												<div className='flex flex-col justify-center gap-4 p-6 items-start rounded-r-md border-r-4 text-[#00000099] border-[#12CD9C] h-full w-full'>
													<p className='m-0 p-0'>{e.componentName}</p>
													<p className='m-0 p-0'>Resolved</p>
													<p className='m-0 p-0'>Public</p>
													<p className='m-0 p-0'>
														{moment(e.startTime).format("MMM Do YY, h:mm a")}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			
		</>
	);
};

export default Incidents;
