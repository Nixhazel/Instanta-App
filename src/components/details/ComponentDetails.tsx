import { useEffect } from "react";

const ComponentDetails = ({ data, setCurrentComponentDetails }: any) => {

     useEffect(() => {
      setCurrentComponentDetails(data)
     }, [data])
     
	return (
		<div className='flex flex-col items-center justify-start p-5 h-[30rem] w-[60rem] mt-14 border border-[#C8E2F1] rounded-md bg-white max-[1669px]:w-[53rem]'>
			<div className='flex justify-between items-center mb-6 w-full h-10'>
				<p className='p-0 m-0 font-bold text-xl'>Detail</p>
				<img src='arrow-right.svg' alt='' className=' rotate-90' />
			</div>
			<hr className='w-full h-1 border-[#bbb8b8] ' />
			<div className='flex flex-col w-full p-4 gap-5 mt-4 h-[20rem] border bg-[#F6F6F6]'>
				<div className='flex justify-between items-center gap-3 h-16 w-full  '>
					<div className='w-48'>
						<p className='p-0 m-0  font-bold text-lg'>Name</p>
						<p className='p-0 m-0  font-light'>{data.name}</p>
					</div>
					<div className='w-48'>
						<p className='p-0 m-0  font-bold text-lg'>Type</p>
                              <p className='p-0 m-0  font-light'> {data.type }</p>
					</div>
					<div className=' w-48 '>
						<p className='p-0 m-0  font-bold text-lg'>Group</p>
                              <p className='p-0 m-0  font-light'>{data.group }</p>
					</div>
				</div>
				<div className='flex justify-between items-center gap-3 h-16 w-full  '>
					<div className='w-48'>
						<p className='p-0 m-0 font-bold text-lg'>Status</p>
                              <p className='p-0 m-0 font-light'>{data.status }</p>
					</div>
					<div className='w-48'>
						<p className='p-0 m-0  font-bold text-lg'>Port number</p>
                              <p className='p-0 m-0  font-light'>{data.portNumber }</p>
					</div>
					<div className='w-48'>
						<p className='p-0 m-0  font-bold text-lg'>Url</p>
                              <p className='p-0 m-0  font-light overflow-clip'>{data.url }</p>
					</div>
				</div>
				<div className='flex flex-col h-24 w-full '>
					<p className='p-0 m-0  font-bold text-lg'>Description</p>
                         <p className='p-0 m-0  font-light'>{data.description }</p>
				</div>
			</div>
		</div>
	);
};

export default ComponentDetails;
