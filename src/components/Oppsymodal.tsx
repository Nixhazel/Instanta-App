import { useState } from "react";

const Oppsymodal = () => {
	const [isMinimized, setIsMinimized] = useState(true);

	const toggleSize = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<>
			<div
				className={
					isMinimized
						? "flex flex-col justify-between absolute top-28 left-40 transform -translate-x-1/2 -translate-y-1/2 border border-[#FD8284] bg-[#FFE0E1] rounded-md z-50 w-64 h-36 shadow-md "
						: "flex absolute top-36 left-28 transform -translate-x-1/2 -translate-y-1/2 border border-[#FD8284] bg-[#FFE0E1] rounded-md z-50 h-12 w-32 shadow-md"
				}>
				<div className='flex items-center justify-between px-4'>
					<p className='m-0 p-0 text-[#fd8284] font-bold'>Oopsy</p>
					{isMinimized ? (
						<p onClick={toggleSize} className='m-0 p-0 text-3xl cursor-pointer'>
							-
						</p>
					) : (
						<p
							onClick={toggleSize}
							className='m-0 pl-4 text-3xl cursor-pointer'>
							+
						</p>
					)}
				</div>
				{isMinimized ? (
					<div className='flex flex-col px-4 py-5 '>
						<p className='m-0 p-0 font-bold text-[#fd8284]'>
							1. Enter new password
						</p>
						<p className='m-0 p-0 font-bold text-[#fd8284]'>
							2. Enter confirm password
						</p>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default Oppsymodal;
