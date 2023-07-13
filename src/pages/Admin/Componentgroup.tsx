import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { componentsgroup } from "../../api/public";
import ComponentGroupDetails from "../../components/details/ComponentGroupDetails";
import EditGroupComponent from "./EditGroupComponent";

const Componentgroup = () => {
	const navigate = useNavigate();
	const [groupofComponents, setGroupofComponents] = useState([]);
	const [showDetails, setShowDetails] = useState(false);
	const [ComponentsGroupDetails, setComponentsGroupDetails] = useState([]);
	const [CurrentComponentGroupDetails, setCurrentComponentGroupDetails] =
		useState<any>({});
	const [searchQuery, setSearchQuery] = useState("");
	const [editPage, setEditPage] = useState(false);

	const handleFilterd = (e: any) => {
		setSearchQuery(e.target.value);
	};

	const filterd = groupofComponents.filter((each: any) =>
		each.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleComponents = (data: any) => {
		setComponentsGroupDetails(data);
		setShowDetails(true);
	};

	const listComponents = async () => {
		const groupComponentsResponce: any = await componentsgroup();

		if (groupComponentsResponce.status === 200) {
			setGroupofComponents(groupComponentsResponce.data);
		} else {
			return;
		}
	};

	useEffect(() => {
		listComponents();
	}, []);
	return (
		<>
			{editPage && (
				<EditGroupComponent
					data={CurrentComponentGroupDetails}
					setEditPage={setEditPage}
				/>
			)}
			<AdminLayout />
			<div className=' flex flex-col pt-[70px] pl-80 w-full h-screen bg-[#E9F0F4] max-[1669px]:pt-[65px] max-[1669px]:pl-64'>
				{showDetails && (
					<div className='flex items-center justify-start w-full h-16 bg-white border-b border-gray-200'>
						<img src='filter.svg' alt='' className=' ml-6 h-5 w-5' />
						<div className='flex items-center gap-2 px-4 w-72 ml-6 bg-[#F0F0F0] border border-[#E5E5E5] rounded-md text-left'>
							<img src='search-icon.svg' alt='' className=' h-6 w-6' />
							<input
								type='text'
								name='search'
								onChange={handleFilterd}
								placeholder='Search component...'
								className=' outline-none focus:outline-none bg-transparent border-none inline-flex overflow-clip w-full  p-2'
							/>
						</div>
						<p className='m-0  p-0 font-bold text-lg ml-12 text-[#008FF4]'>
							{" "}
							Component\ {CurrentComponentGroupDetails.name}
						</p>
					</div>
				)}

				<div className='flex items-center justify-between w-full h-16 bg-white px-5'>
					<p className='m-0 p-0 font-bold text-xl'> Component groups</p>
					<div
						className={
							showDetails
								? " flex items-center justify-between p-3 h-11 w-24 rounded-md border border-[#979797] cursor-pointer "
								: " hidden items-center justify-between p-3 h-12 w-24 rounded-md border border-[#979797] cursor-pointer "
						}
						onClick={() => setEditPage(true)}>
						<img src='editpen.svg' alt='' className=' h-5 w-5' />
						<p className='m-0 p-0 text-black text-lg'>Edit</p>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					<div
						className={
							showDetails
								? "flex flex-col h-[770px]  bg-white w-[500px] border border-gray-200 max-[1669px]:w-[450px] max-[1669px]:h-[695px]"
								: "flex flex-col h-[836px]  bg-white w-[500px] border border-gray-200 max-[1669px]:w-[450px] max-[1669px]:h-[750px]"
						}>
						<div className='flex h-20 w-full border-t border-b items-center pl-5'>
							<div
								className='flex h-12 w-28 border border-[#A9DBFF] rounded-md items-center justify-between px-4 cursor-pointer'
								onClick={() => navigate("/newcomponentGroup")}>
								<img src='blueplus.svg' alt='' className=' h-5 w-5' />
								<p className='m-0 p-0 text-[#008FF4] font-bold'>New</p>
							</div>
						</div>

						{/* Components Group list */}

						<div className='flex flex-col h-full w-full justify-start'>
							{groupofComponents.length == 0 ? (
								<img src='omg.svg' alt='' className=' h-44 mt-44' />
							) : (
								<div className='flex flex-col w-[98%] '>
									{filterd.map((e: any) => (
											<div
												className='flex flex-col w-full justify-between px-5 py-3 h-20 border border-r-[#12CD9C] border-r-4 hover:bg-[#AADDFE] cursor-pointer'
												onClick={() => handleComponents(e)} key={e.id}>
												<div className='flex justify-between'>
													<p className='m-0 p-0 font-bold'>{e.name}</p>
													<p className='m-0 p-0 text-[#777777]'>Operational</p>
												</div>
												<p className='m-0 p-0 text-[#777777]'>
													{e.component.length} components under
												</p>
											</div>
									))}
								</div>
							)}
						</div>
					</div>
					{/* Details */}
					<div className='flex justify-center h-full w-full'>
						{showDetails ? (
							<ComponentGroupDetails
								data={ComponentsGroupDetails}
								setCurrentComponentGroupDetails={
									setCurrentComponentGroupDetails
								}
							/>
						) : (
							<img src='sleeping.svg' alt='' className='h-44 mt-64' />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Componentgroup;
