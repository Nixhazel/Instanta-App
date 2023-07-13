import { useEffect, useState } from "react";
import { editComponent } from "../../api/admin";
import Component from "./Component";
import { componentsgroup } from "../../api/public";
import { toast } from 'react-hot-toast';

const EditComponent = ({ data, setEditPage }: any) => {
	const [oopsy, setOopsy] = useState(false);
	const [componentData, setComponentData] = useState({});
	const [group, setGroup] = useState([]);

	const updateData = (e: any) => {
		setComponentData({
			...componentData,
			[e.target.name]: e.target.value,
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

		const editComponentresponse: any = await editComponent(
			data.id,
			componentData
		);

		console.log("editComponentresponse", editComponentresponse);

		if (editComponentresponse.isSuccessful) {
			// toast.success(editComponentresponse.data.message);
			setEditPage(false)
			window.location.reload();
		} else{
			toast.error('Error Editing');
		}
	};

	const listComponents = async () => {
		const groupComponentsResponce: any = await componentsgroup();

		if (groupComponentsResponce.status === 200) {
			setGroup(groupComponentsResponce.data);
		} else {
			return;
		}
	};

	useEffect(() => {
		listComponents();
	}, []);
	return (
		<>
			<div className=' z-30 flex justify-center h-screen w-full bg-gray-700 bg-opacity-50 fixed'>
				<div className=' flex flex-col h-screen  items-center rounded-md w-[75%] bg-white'>
					<div className='flex relative items-center w-[95%] mt-10 px-3 justify-between '>
						<h1 className='text-lg font-bold'>Edit Component</h1>
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
								onClick={() => setEditPage(false)}
							/>
						</div>
					</div>
					<hr className=' w-[95%] border-b my-7 border-[#EEEEEE]' />

					<div className='flex flex-col items-center bg-[#E9F0F4] w-[95%] h-[83%] '>
						<div className='flex flex-col h-[90%] mt-10  bg-white w-[96%] border border-[#C8E2F1] rounded-md'>
							<p className='ml-7 my-7 font-extrabold text-xl'>Details</p>

							<div className='flex flex-wrap items-center justify-between w-full border-y px-5 bg-[#F6F6F6]'>
								<div className='flex flex-col w-[30%]  mt-8'>
									<p className='m-0 p-0 font-bold'>Name</p>
									<input
										onChange={updateData}
										type='text'
										name='name'
										placeholder=''
										required
										defaultValue={data.name}
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>

								<div className='flex flex-col w-[30%] mt-8'>
									<p className='font-bold'>Type</p>
									<select
										onChange={updateData}
										name='type'
										placeholder=''
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}>
										<option value={data.type}>{data.type}</option>
										<option value='Client'>Client</option>
										<option value='Service'>Service</option>
									</select>
								</div>
								<div className='flex flex-col w-[30%] mt-8'>
									<p className='font-bold'>
										Group <span className='text-[#CCCCCCCC]'>(optional)</span>
									</p>
									<select
										onChange={updateData}
										name='group'
										placeholder=''
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}>
										<option value={data.group}>{data.group}</option>
										{group.map((e: any) => (
											<option value={e.name} key={e.id}>
												{e.name}
											</option>
										))}
									</select>
								</div>

								<div className='flex flex-col w-[30%] mt-8'>
									<p className='font-bold'>Status</p>
									<select
										onChange={updateData}
										name='status'
										placeholder=''
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}>
										<option value={data.status}>{data.status}</option>
										<option value='Operational'>Operational</option>
										<option value='Not Operational'>Not Operational</option>
									</select>
								</div>
								<div className='flex flex-col w-[30%] mt-8'>
									<p className='font-bold'>Port Number</p>
									<input
										onChange={updateData}
										type='number'
										name='portNumber'
										placeholder=''
										defaultValue={data.portNumber}
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>
								<div className='flex flex-col w-[30%] mt-8'>
									<p className='font-bold'>URL</p>
									<input
										onChange={updateData}
										type='text'
										name='url'
										placeholder=''
										defaultValue={data.url}
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>
								<div className='flex flex-col w-full mt-8 mb-20'>
									<p className='font-bold'>Description</p>
									<textarea
										onChange={updateData}
										name='description'
										placeholder=''
										defaultValue={data.description}
										rows={6}
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Component />
		</>
	);
};

export default EditComponent;
