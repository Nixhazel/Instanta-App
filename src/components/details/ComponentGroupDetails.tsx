import { useEffect } from "react";

const ComponentGroupDetails = ({
	data,
	setCurrentComponentGroupDetails,
}: any) => {
	
	useEffect(() => {
		setCurrentComponentGroupDetails(data);
	}, [data]);

	return (
		<div className='flex flex-col items-between justify-start p-5 h-[25rem] w-[65rem] mt-14 border border-[#C8E2F1] rounded-md bg-white max-[1669px]:w-[53rem]'>
			<div className='flex justify-between items-center mb-5 w-full h-10'>
				<p className='p-0 m-0 font-bold text-xl'>Detail</p>
				<img src='arrow-right.svg' alt='' className=' rotate-90' />
			</div>
			<hr className='w-full h-1 border-[#bbb8b8] ' />
			<div className='flex flex-col w-full p-4 gap-5 mt-4 h-[13rem] border bg-[#F6F6F6]'>
				<div className='flex justify-between items-center gap-3 h-16 w-full  '>
					<div className='w-48'>
						<p className='p-0 m-0  font-bold text-lg'>Component name</p>
						<p className='p-0 m-0  font-light'>{data.name}</p>
					</div>
					<div className='w-60'>
						<p className='p-0 m-0  font-bold text-lg'>Expand/Collapse Option</p>
						<p className='p-0 m-0  font-light'> Always expand</p>
					</div>
				</div>
				<div className='flex justify-start items-center gap-3 h-16 w-full  '>
					<div className='w-48'>
						<p className='p-0 m-0 font-bold text-lg'>Visibility</p>
						<p className='p-0 m-0 font-light'>
							{data.visibility ? "Visible to public" : "Not Visible"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ComponentGroupDetails;
