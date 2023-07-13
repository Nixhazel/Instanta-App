import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Allcomponents, getTotalComponentGroup } from "../../api/admin";
import { incidentHistory } from "../../api/public";
import Accordion from '../../components/Accordion';

const AdminHome = () => {
	const [totalComponentsGroup, setTotalComponentsGroup] = useState(0);
	const [totalComponents, setTotalComponents] = useState(0);
	const [operationalSystems, setOperationaSystems] = useState(0);
	const [notoperationalSystems, setNotOperationaSystems] = useState(0);
	const [incidentsHistory, setIncidentHistory] = useState(0);
	const [incidentsDown, setIncidentDown] = useState(0);
	const [incidentsUp, setIncidentUp] = useState(0);

	const getcomponentGroup = async () => {
		const getComponentsGroup = await getTotalComponentGroup();

		if (getComponentsGroup.data) {
			// toast.success(getComponentsGroup.message);
			// console.log('first', getComponentsGroup.data)

			setTotalComponentsGroup(getComponentsGroup.data.result);
			return;
			// } else if (getComponentsGroup.status == 'error') {
			// toast.error(getComponentsGroup.message);
			// return;
		}
	};

	const getcomponent = async () => {
		const getComponents: any = await Allcomponents();

		if (getComponents.data) {
			// toast.success(getComponentsGroup.message);
			setOperationaSystems(
				getComponents.data.filter((e: any) => e.status === "Operational").length
			);
			setNotOperationaSystems(
				getComponents.data.filter((e: any) => e.status === "Not Operational")
					.length
			);

			setTotalComponents(getComponents.data.length);
			return;
			// } else if (getComponentsGroup.status == 'error') {
			// toast.error(getComponentsGroup.message);
			// return;
		}
	};

	const listIncidents = async () => {
		const incidentHistoryresponse: any = await incidentHistory();

		// console.log("responce", incidentHistoryresponse.data);
		if (incidentHistoryresponse.status === 200) {
			setIncidentHistory(
				incidentHistoryresponse.data.filter((e: any) => e.type == "Incident")
					.length
			);
			setIncidentUp(
				incidentHistoryresponse.data.filter(
					(e: any) => e.type == "Incident" && e.status == "Operational"
				).length
			);
			setIncidentDown(
				incidentHistoryresponse.data.filter(
					(e: any) => e.type == "Incident" && e.status == "Not Operational"
				).length
			);
			return;
		} else {
			return;
		}
	};

	useEffect(() => {
		getcomponentGroup();
		getcomponent();
		listIncidents();
	}, []);
	return (
		<>
			<AdminLayout />
			<div className=' flex flex-col pt-32 pl-[340px] pr-8 w-full bg-[#E9F0F4] max-[1669px]:pl-72 max-[1669px]:pt-28'>
				<div className='flex flex-col justify-center gap-2 rounded-lg bg-white border border-[#C8E2F1] h-56 px-6'>
					<p className='p-0 font-bold text-lg'>System Status</p>
					<div className='flex justify-between gap-7 items-center w-full'>
						<div className='flex w-full h-28'>
							<div className='flex flex-col items-center justify-center gap-2 w-full bg-[#12CD9C] rounded-l-md'>
								<p className=' p-0 text-white font-bold '> Operational</p>
								<p className=' p-0 text-white font-bold '> Systems</p>
							</div>
							<div className='flex items-center justify-center  w-full bg-[#F8F8F8] gap-10'>
								<p className='p-0 font-bold text-3xl'>{operationalSystems}</p>
								<img
									src='in-smile-face-green.svg'
									alt=''
									className=' h-14 w-14'
								/>
							</div>
						</div>
						<div className='flex w-full h-28'>
							<div className='flex flex-col items-center justify-center gap-2 w-full bg-[#FF8181] rounded-l-md'>
								<p className=' p-0 text-white font-bold '>Not operational</p>
								<p className=' p-0 text-white font-bold '>Systems</p>
							</div>
							<div className='flex items-center justify-center w-full bg-[#F8F8F8]  gap-10'>
								<p className='p-0 font-bold text-3xl'>
									{notoperationalSystems}
								</p>
								<img src='sad-face.svg' alt='' className=' h-14 w-14' />
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-between gap-7 w-full my-12'>
					<div className='flex flex-col justify-start rounded-lg py-14 gap-4 px-6 bg-white border border-[#C8E2F1] h-[550px] w-full'>
						<p className='p-0 font-bold text-lg'>Components</p>
						<div className='flex flex-wrap items-center justify-between w-full gap-4'>
							<div className='flex flex-col justify-center items-start rounded-md h-44 w-[330px] px-10 gap-5 bg-gradient-to-r text-white from-[#5AADE8] to-[#008FF4] max-[1669px]:w-[47%]'>
								<p className=' text-5xl font-extrabold'>
									{totalComponentsGroup}
								</p>
								<p className='text-lg font-bold'>Component group</p>
							</div>
							<div className='flex flex-col justify-center items-start rounded-md h-44 w-[330px] px-10 gap-5 bg-gradient-to-r text-white from-[#5AADE8] to-[#008FF4] max-[1669px]:w-[47%]'>
								<p className=' text-5xl font-extrabold'>{totalComponents}</p>
								<p className='text-lg font-bold'>Components</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-start rounded-lg py-14 gap-4 px-6 bg-white border border-[#C8E2F1] h-[550px] w-full '>
						<p className='p-0 font-bold text-lg'>Incidents & Downtime</p>
						<div className='flex flex-wrap gap-5 items-center justify-between w-full'>
							<div className='flex flex-col justify-center items-start rounded-md h-44 w-[330px] px-10 gap-5 bg-[#327BAF] text-white max-[1669px]:w-[47%]'>
								<p className=' text-5xl font-extrabold'>{incidentsHistory}</p>
								<p className='text-lg font-bold'>All Incident</p>
							</div>
							<div className='flex flex-col justify-center items-start rounded-md h-44 w-[330px] px-10 gap-5 bg-gradient-to-r text-white from-[#CAB35C] to-[#837138] max-[1669px]:w-[47%]'>
								<p className=' text-5xl font-extrabold'>{incidentsDown}</p>
								<p className='text-lg font-bold'>Current incident/downtime</p>
							</div>
							<div className='flex flex-col justify-center items-start rounded-md h-44 w-[330px] px-10 gap-5 bg-[#12CD9C] text-white max-[1669px]:w-[47%]'>
								<p className=' text-5xl font-extrabold'>{incidentsUp}</p>
								<p className='text-lg font-bold'>Resolved</p>
							</div>
						</div>
					</div>
				</div>

				{/* To be mapped through  ACCORDION*/}

				<Accordion/>
				
			</div>
		</>
	);
};

export default AdminHome;
