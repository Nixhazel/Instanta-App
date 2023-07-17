import { useEffect, useState } from "react";

import { incidentHistory } from "../../api/public";
import moment from "moment";

const IncidentDetails = ({ id, setShowModal }: any) => {
	const [incidentsHistory, setIncidentHistory] = useState<any>([]);

	const listIncidents = async () => {
		const incidentHistoryresponse: any = await incidentHistory();
		if (incidentHistoryresponse.status === 200) {
			setIncidentHistory(
				incidentHistoryresponse.data.filter((e: any) => e.id == id)[0]
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
			<div className=' z-50 flex justify-center h-screen w-full bg-gray-700 bg-opacity-50 fixed'>
				<div className=' flex flex-col h-screen  items-center rounded-md w-[65%] bg-white'>
					<div className='flex relative items-center w-[95%] mt-10 px-3 justify-between '>
						<h1 className='text-lg font-bold'>Incident</h1>

						<img
							src='x.svg'
							alt=''
							className='m-0 p-0 cursor-pointer'
							onClick={() => setShowModal(false)}
						/>
					</div>
					<hr className=' w-[95%] border-b my-7 border-[#EEEEEE]' />

					<div className='flex flex-col items-center bg-[#E9F0F4] w-[95%] h-[83%] '>
						<div className='flex flex-col h-[90%] mt-10 px-7 bg-white w-[96%] border border-[#C8E2F1] rounded-md'>
							<p className=' my-6 font-extrabold text-xl'>Details</p>

							<div className='flex w-full h-16   items-center justify-between'>
								<p className='m-0 p-0 font-bold text-xl'>Update Instance</p>
								<div className=' flex items-center justify-between p-3 h-11 w-24 rounded-md border border-[#979797] cursor-pointer'>
									<img src='editpen.svg' alt='' className=' h-5 w-5' />
									<p className='m-0 p-0 text-black text-lg'>Edit</p>
								</div>
							</div>

							<div className='flex flex-col items-center px-3 py-7 justify-between w-full border-y  bg-[#F6F6F6]'>
								<div className='flex items-center justify-between w-full h-20 '>
									<div className='flex flex-col items-start justify-between'>
										<p className='m-0 p-0 font-bold'>Name</p>
										<p className='m-0 p-0 font-light'>
											{" "}
											{incidentsHistory.componentName}
										</p>
									</div>

									<div className='flex flex-col items-start w-40 justify-between'>
										<p className='m-0 p-0 font-bold'>Status</p>
										<p className='m-0 p-0 font-light'>
											{incidentsHistory.status}
										</p>
									</div>
								</div>
								<div className='flex items-center justify-between w-full h-20 '>
									<div className='flex flex-col items-start justify-between'>
										<p className='m-0 p-0 font-bold'>Incident visibility</p>
										<p className='m-0 p-0 font-light'> Visible to public</p>
									</div>
									<div className='flex flex-col items-start w-36 justify-between'>
										<p className='m-0 p-0 font-bold'>Component group</p>
										<p className='m-0 p-0 font-light'>
											{" "}
											{incidentsHistory.componentGroup}
										</p>
									</div>
									<div className='flex flex-col items-start w-40 justify-between'>
										<p className='m-0 p-0 font-bold'>Type</p>
										<p className='m-0 p-0 font-light'>
											{" "}
											{incidentsHistory.type}
										</p>
									</div>
								</div>
								<div className='flex items-center justify-between w-full h-20 '>
									<div className='flex flex-col items-start justify-between'>
										<p className='m-0 p-0 font-bold'>Affected service</p>
										<p className='m-0 p-0 font-light'>
											{" "}
											{incidentsHistory.componentName}
										</p>
									</div>
									<div className='flex flex-col items-start w-36 justify-between'>
										<p className='m-0 p-0 font-bold'>Date</p>
										<p className='m-0 p-0 font-light'>
											{moment(incidentsHistory.startTime).format("MMM Do YY")}
										</p>
									</div>
									<div className='flex flex-col items-start w-40 justify-between'>
										<p className='m-0 p-0 font-bold'>Time</p>
										<p className='m-0 p-0 font-light'>
											{" "}
											{moment(incidentsHistory.startTime).format("h:mm:ss a")}
										</p>
									</div>
								</div>
								<div className='flex flex-col items-start justify-between w-full h-20 '>
									<p className='m-0 p-0 font-bold'>Message</p>
									<p className='m-0 p-0 font-light'>
										{incidentsHistory.message}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default IncidentDetails;
