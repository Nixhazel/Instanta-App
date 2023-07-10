import { useState } from "react";
import { useEffect } from "react";
import { componentsgroup, graphData } from "../api/public";
import moment from "moment";

const Accordion = () => {
	const [isAccord, setIsAccord] = useState(null);
	const [toggle, setToggle] = useState(1);
	const [groupofComponents, setGroupofComponents] = useState([]);
	const [graphBars, setGraphbars] = useState([]);
	const [graphDataBars, setGraphDataBars] = useState<any>([]);

	const toggleAccordion = (index: any) => {
    if (isAccord === index) {
      setIsAccord(null); // Collapse the clicked item if it's already expanded
    } else {
      setIsAccord(index); // Expand the clicked item
    }
  };

	const listComponents = async () => {
		const groupComponentsResponce: any = await componentsgroup();
		if (groupComponentsResponce.status === 200) {
			setGroupofComponents(groupComponentsResponce.data);
		} else {
			return;
		}
	};
	const graphdata = async () => {
		const graphResponce: any = await graphData();
		// console.log("GRAPH responce", graphResponce.data);
		if (graphResponce.status === 200) {
			setGraphDataBars(graphResponce.data);

			// console.log("graphDataBars", graphDataBars);
			const testArray: any = [];
			graphResponce.data.map((e: any) => {
				for (let i = 0; i < e.durationInDays; i++) {
					testArray.push({ status: e.status, componentName: e.componentName });
				}
			});
			// console.log("testArray", testArray);
			setGraphbars(testArray);
			// console.log("graphBars", graphBars);
		} else {
			return;
		}
	};

	useEffect(() => {
		listComponents();
		graphdata();
	}, []);
	return (
		<>
			{groupofComponents.map((e: any, index:any) => (
				<div
					className='flex flex-col w-full p-10 bg-white my-6 border border-[#C8E2F1] rounded-md'
					key={e.id}>
					<div className='flex items-center justify-between w-full'>
						<div
							className='flex items-center gap-2 cursor-pointer'
							onClick={() => toggleAccordion(index)}>
							<img
								src='greaterthan.svg'
								alt=''
								className={
									isAccord ? "rotate-90 duration-300" : " duration-300"
								}
							/>
							<p className='m-0 p-0 font-bold text-lg'>{e.name}</p>
						</div>
						{/* {e.status == "Operational" ? ( */}
						<div className='flex items-center border-2 border-[#12CD9C] rounded-full p-2 gap-2 '>
							<img src='green.svg' alt='' className='ml-1' />
							<p className='mr-1 p-0 text-sm'>Operational</p>
						</div>
						{/* ) : (
									<div className='flex items-center border-2 border-[#FF8181] rounded-full p-2 gap-2 '>
										<img src='red.svg' alt='' className='ml-1' />
										<p className='mr-1 p-0 text-sm'>Not Operational</p>
									</div>
								)} */}
					</div>
					{/* graph */}
					{/* <div className=' flex flex-col items-center  justify-center h-28 w-full mt-3'>
								<div className='flex justify-between w-full mb-3 items-center'>
									<p className='p-0 m-0 text-sm'>Uptime</p>
									<p className='p-0 m-0 text-[#777777] text-sm'>
										100%- No Current Issues
									</p>
									<div className='flex items-center justify-center bg-[#EEEEEE] rounded-3xl'>
										<p className='p-2 m-0'>30 days</p>
									</div>
								</div>
								<div className='flex items-end h-11 justify-center gap-1 w-full'>
									{myArray.map((e: any, index: any) => (
										// <>
										// 	{e % 2 === 0 ? (
										// 		<img src='greenbar.svg' alt='' />
										// 	) : (
										// 		<img src='redbar.svg' alt='' />
										// 	)}
										// </>

										<img src='greenbar.svg' alt='' />
									))}
								</div>
							</div> */}

					{isAccord === index && (
						<div className='pl-10'>
							<div className='flex items-center gap-14 w-full mt-12 mb-5 '>
								<div
									className={
										toggle === 1
											? "flex items-center justify-center border border-black rounded-3xl py-2 px-3 cursor-pointer"
											: "flex items-center justify-center text-[#A3A8AB]  py-2 px-3 cursor-pointer"
									}
									onClick={() => setToggle(1)}>
									<p className='m-0 p-0 font'>Service</p>
								</div>
								<div
									className={
										toggle === 2
											? "flex items-center justify-center border border-black rounded-3xl py-2 px-3 cursor-pointer"
											: "flex items-center justify-center text-[#A3A8AB]  py-2 px-3 cursor-pointer"
									}
									onClick={() => setToggle(2)}>
									<p className='m-0 p-0'>Clients</p>
								</div>
							</div>

							{/* service */}
							<div className={toggle === 1 ? "" : "hidden"}>
								{e.component
									.filter((each: any) => each.type == "Service")
									.map((e: any) => (
										<>
											<div
												className='flex items-center justify-between w-full'
												key={e.id}>
												<div className='flex items-center gap-2 cursor-pointer'>
													<p className='m-0 p-0 font-bold '>{e.name}</p>
												</div>
												<div className='flex items-center p-2 gap-2 '>
													<img
														src={
															e.status == "Operational"
																? "green.svg"
																: "red.svg"
														}
														alt=''
														className='ml-1'
													/>
													<p className='mr-1 p-0 text-sm'>{e.status}</p>
												</div>
											</div>
											{/* Graph */}

											{graphBars.filter((i: any) => i.componentName == e.name)
												.length > 0 && (
												<div className=' flex flex-col items-center justify-between mb-2 h-[5.5rem] w-full'>
													<div className='flex items-end h-14 justify-center gap-1 w-full'>
														{graphBars
															.filter((i: any) => i.componentName == e.name)
															.map((each: any) => (
																<>
																	{each.status === "Operational" ? (
																		<div className=' h-full w-[0.55rem] rounded-sm bg-[#12CD9C]'></div>
																	) : (
																		<div className=' h-3 w-[0.55rem] rounded-sm bg-[#FF8181]'></div>
																	)}
																</>

																// <img src='greenbar.svg' alt='' />
															))}
													</div>
													<div className=' flex justify-between items-center w-full px-8'>
														<p className='m-0 p-0 font-light'>
															{moment(
																graphDataBars.filter(
																	(i: any) => i.componentName == e.name
																)[0].startTime
															).format("MMM Do YY")}
														</p>
														<p className='m-0 p-0 font-light'>
															{moment(
																graphDataBars.filter(
																	(i: any) => i.componentName == e.name
																)[
																	graphDataBars.filter(
																		(i: any) => i.componentName == e.name
																	).length - 1
																].endTime
															).format("MMM Do YY")}
														</p>
													</div>
												</div>
											)}

											<div className='flex justify-end '>
												<p className=' underline cursor-pointer '>View log</p>
											</div>
											<hr className=' w-full border-b mt-8 border-[#EEEEEE]' />
										</>
									))}
							</div>

							{/* client */}

							<div className={toggle === 2 ? "" : "hidden"}>
								{e.component
									.filter((each: any) => each.type == "Client")
									.map((e: any) => (
										<>
											<div
												className='flex items-center justify-between w-full mb-3 '
												key={e.id}>
												<div className='flex items-center gap-2 cursor-pointer'>
													<p className='m-0 p-0 font-bold '>{e.name}</p>
												</div>
												<div className='flex items-center p-2 gap-2 '>
													<img
														src={
															e.status == "Operational"
																? "green.svg"
																: "red.svg"
														}
														alt=''
														className='ml-1'
													/>
													<p className='mr-1 p-0 text-sm'>{e.status}</p>
												</div>
											</div>

											{/* Graph */}
											{graphBars.filter((i: any) => i.componentName == e.name)
												.length > 0 && (
												<div className=' flex flex-col items-center  justify-between mb-2 h-[5.5rem] w-full'>
													<div className='flex items-end h-14 justify-start px-8 gap-1 w-full'>
														{graphBars
															.filter((i: any) => i.componentName == e.name)
															.map((each: any) => (
																<>
																	{each.status === "Operational" ? (
																		<div className=' h-full w-[0.55rem] rounded-sm bg-[#12CD9C]'></div>
																	) : (
																		<div className=' h-3 w-[0.55rem] rounded-sm bg-[#FF8181]'></div>
																	)}
																</>
															))}
													</div>
													<div className=' flex justify-between items-center w-full px-8'>
														<p className='m-0 p-0 font-light'>
															{moment(
																graphDataBars.filter(
																	(i: any) => i.componentName == e.name
																)[0].startTime
															).format("MMM D YY, h:mm a")}
														</p>
														<p className='m-0 p-0 font-light'>
															{moment(
																graphDataBars.filter(
																	(i: any) => i.componentName == e.name
																)[
																	graphDataBars.filter(
																		(i: any) => i.componentName == e.name
																	).length - 1
																].endTime
															).format("MMM D YY, h:mm a")}
														</p>
													</div>
												</div>
											)}

											<hr className=' w-full border-b mt-9 border-[#EEEEEE]' />
										</>
									))}
							</div>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default Accordion;
