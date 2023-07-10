// import React from "react";

const StatusOptions = () => {
	return (
		<>
			<div className='flex justify-between items-center gap-14'>
				<div className='flex items-center gap-1'>
					<img src='green.svg' alt='' />
					<p className='text-xs'>Operational</p>
				</div>
			
				<div className='flex items-center gap-1'>
					<img src='red.svg' alt='' />
					<p className='text-xs'>Not Operational</p>
				</div>
				
			</div>
		</>
	);
};

export default StatusOptions;
