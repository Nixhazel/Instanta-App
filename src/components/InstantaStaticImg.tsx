// import React from "react";

const InstantaStaticImg = () => {
	return (
		<>
			<div className=' flex flex-col h-screen w-full bg-[#ECF4FF] py-24 pl-24 pr-11'>
				<div className='flex flex-col h-56  justify-between'>
					<div className='flex flex-col'>
						<img src="instantawordlogo.svg" alt="" className='w-[190px] h-[50px]'/>
						<p className='p-0 text-xl text-gray-700 font-semibold ml-3'>Status Page</p>
					</div>
					<div>
						<p className='p-0 w-96 h-20 font-bold text-3xl'>Monitor status of all your components and services</p>
					</div>
				</div>
				<div className='flex flex-col relative items-center pt-14   h-[527px]'>
					<img src="insident.svg" alt="" className=' w-[900px] h-[500px] max-[1700px]:w-[700px]'/>
					<img src="uptime.svg" alt="" className='absolute top-52 w-[1300px]' />
				</div>
			</div>
		</>
	);
};

export default InstantaStaticImg;
