import { useState } from "react";
import Componentgroup from "./Componentgroup";
import { useNavigate } from "react-router-dom";
import { createComponentGroup } from "../../api/admin";
import { toast } from "react-hot-toast";

const NewComponentGroup = () => {
	const navigate = useNavigate();
	const [oopsy, setOopsy] = useState(false);
	const [componentData, setComponentData] = useState({});
	const [bool, setBool] = useState({});
	const visibility = [
		{ visible: true, name: "Visible to public" },
		{ visible: false, name: "Visible only to logged in user" },
	];
	const enable = [
		{ enabled: true, name: "True" },
		{ enabled: false, name: "False" },
	];

	const updateData = (e: any) => {
		setComponentData({
			...componentData,
			[e.target.name]: e.target.value,
		});
	};

	const boolean = (e: any) => {
		setBool({
			...bool,
			[e.target.name]: JSON.parse(e.target.value),
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (Object.keys(componentData).length === 0) {
			setOopsy(true);
			return;
		} else {
			setOopsy(false);
		}

		const createComponentResponce: any = await createComponentGroup({
			...componentData,
			...bool,
		});

		// console.log("createComponentResponce", createComponentResponce);

		if (createComponentResponce.data.isSuccessful) {
			toast.success("Successful");
			navigate("/componentgroup");
		} else {
			toast.error("Error creating group");
		}
	};
	return (
		<>
			<div className=' z-30 flex justify-center h-screen w-full bg-gray-700 bg-opacity-50 fixed'>
				<div className=' flex flex-col h-screen  items-center rounded-md w-[65%] bg-white'>
					<div className='flex relative items-center w-[95%] mt-10 px-3 justify-between '>
						<h1 className='text-lg font-bold'>New Component group</h1>
						<div className='flex w-36 justify-between items-center'>
							<img
								onClick={handleSubmit}
								src='button.svg'
								alt=''
								className=' cursor-pointer w-24 h-10'
							/>
							<img
								src='x.svg'
								alt=''
								className='m-0 p-0 cursor-pointer'
								onClick={() => navigate("/componentgroup")}
							/>
						</div>
					</div>
					<hr className=' w-[95%] border-b my-7 border-[#EEEEEE]' />

					<div className='flex flex-col items-center bg-[#E9F0F4] w-[95%] h-[83%] '>
						<div className='flex flex-col h-[90%] mt-10  bg-white w-[96%] border border-[#C8E2F1] rounded-md'>
							<p className='ml-7 my-7 font-extrabold text-xl'>Details</p>

							<div className='flex flex-wrap items-center justify-between w-full border-y px-5 bg-[#F6F6F6]'>
								<div className='flex flex-col w-[48%]  mt-8'>
									<p className='m-0 p-0 font-bold'>Component name</p>
									<input
										onChange={updateData}
										type='text'
										name='name'
										placeholder=''
										required
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>

								<div className='flex flex-col w-[48%] mt-8'>
									<p className='font-bold'>IP Address</p>
									<input
										onChange={updateData}
										type='text'
										name='ipAddress'
										placeholder=''
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>
								<div className='flex flex-col w-[48%] mt-8'>
									<p className='font-bold'>Port Number</p>
									<input
										onChange={updateData}
										type='number'
										name='portNumber'
										placeholder=''
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>
								<div className='flex flex-col w-[48%] mt-8'>
									<p className='font-bold'>Visibility</p>
									<select
										onChange={boolean}
										name='visibility'
										placeholder=''
										required
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}>
										<option value=''>--Select Options--</option>
										{visibility.map((e: any) => (
											<option value={e.visible} key={e.name}>
												{e.name}
											</option>
										))}
									</select>
								</div>
								<div className='flex flex-col w-[48%] mt-8 mb-7'>
									<p className='font-bold'>Is Enabled</p>
									<select
										onChange={boolean}
										name='isEnabled'
										placeholder=''
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}>
										<option value=''>--Select Options--</option>
										{enable.map((e: any) => (
											<option value={e.enabled} key={e.name}>
												{e.name}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Componentgroup />
		</>
	);
};

export default NewComponentGroup;
