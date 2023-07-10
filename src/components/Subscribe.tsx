// import React from "react";

const Subscribe = ({ setSubscribe}:any) => {
	return (
		< >
			<div className=' z-10 flex justify-center h-screen w-full bg-gray-700 bg-opacity-50 fixed'>
                    <div className='relative flex flex-col items-center justify-between bg-white py-10 pb-20 mt-40 h-[694px] w-[440px]  rounded-lg'>
                         <img src="x.svg" alt="" className='m-0 p-0 absolute top-6 right-6 cursor-pointer' onClick={()=> setSubscribe(false)}/>
					<img src='sysserve-logo.svg' alt='' className='h-14' />
					<p className='text-center text-lg p-0 text-gray-700 font-semibold w-96'>
						Are you sure you want to subscribe to Sysserve status page? You'll
						get alerts on all incident and updates.
					</p>
					<div className='flex item-center justify-center w-80  h-10'>
						<input
							type='email'
							name='email'
							// onChange={}
							placeholder='Enter your mail'
							className='outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full'
						/>
					</div>
					<div className='flex bg-[#008FF4]  justify-between items-center px-4 rounded-md w-80 h-11 cursor-pointer shadow-md shadow-gray-500  mb-7'>
						<p className='text-white p-0'>Subscribe</p>
						<img src='right-arrow.svg' alt='' />
					</div>
					<div>
						<p className='p-0 text-gray-700 text-base w-96 font-semibold'>
							For every minute spent in organising, an hour is earned.
						</p>
						<p className='p-0 text-gray-700 w-96 text-sm font-semibold'>
							- Benjamin Franklin
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Subscribe;
