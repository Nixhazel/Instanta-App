import { FC, ReactElement, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

const AdminLayout: FC<any> = (): ReactElement => {
	const navigate = useNavigate()
	// const {userInfo}  = useSelector((state: any) => state.userData)
	const [componentActive, setComponentActive] = useState(false);
	const data:any = localStorage.getItem('userdata');
	const user = JSON.parse(data)

	return (
		<>
			<div className='flex flex-col z-10 fixed left-0 w-80 bg-[#173255] h-screen max-[1669px]:w-64'>
				<div className='flex items-center justify-between h-[70px] w-full  px-4'>
					<img
						src='instanta-logo-on--menu.svg'
						className='h-11 mr-2 cursor-pointer'
						alt='Flowbite Logo'
						onClick={()=> navigate('/')}
					/>
					<img
						src='in-menu-icon-white.svg'
						className='h-[14px] mr-2'
						alt='Flowbite Logo'
					/>
				</div>
				<div className=' flex flex-col mt-7'>
					<NavLink
						to={"/adminhome"}
						className={({ isActive }) =>
							isActive
								? "flex h-16 my-3 bg-[#1B61BE] cursor-pointer  items-center gap-7 px-6"
								: "flex h-16 my-3 hover:bg-[#1B61BE] cursor-pointer  items-center gap-7 px-6"
						}>
						<img src='houseicon.svg' alt='' className=' h-5' />
						<p className='m-0 p-0 font-bold  text-white'>Dashboard</p>
					</NavLink>
					<div
						className={
							componentActive
								? "flex h-16 mt-3 hover:bg-[#1B61BE] cursor-pointer items-center justify-between px-6"
								: "flex h-16 my-3 hover:bg-[#1B61BE] cursor-pointer items-center justify-between px-6"
						}
						onClick={() => setComponentActive(!componentActive)}>
						<div className='flex gap-7'>
							<img src='componenticon.svg' alt='' className=' h-5' />
							<p className='m-0 p-0 font-bold  text-white'>Component</p>
						</div>
						<img src='white-arrow-down.svg' alt='' className='' />
					</div>
					{componentActive && (
						<>
							<NavLink
								to={"/componentgroup"}
								onClick={()=> setComponentActive(true) }
								className={({ isActive }) =>
									isActive
										? "flex items-center border-l-4 border-[#1A79F9] h-14 px-6 bg-[#1B61BE]"
										: "flex items-center border-l-2 border-[#1A79F9] h-14 px-6 bg-[#1d2935ab] hover:bg-[#1B61BE]"
								}>
								<p className='m-0 p-0 text-white font-extralight'>
									Component groups
								</p>
							</NavLink>
							<NavLink
								to={"/component"}
								className={({ isActive }) =>
									isActive
										? "flex items-center border-l-2 border-[#1A79F9] h-14 px-6 bg-[#1B61BE]"
										: "flex items-center border-l-2 border-[#1A79F9] h-14 px-6 bg-[#1d2935ab] hover:bg-[#1B61BE]"
								}>
								<p className=' text-white font-extralight'>Components</p>
							</NavLink>
						</>
					)}
					<NavLink
						to={"/incidents"}
						className={({ isActive }) =>
							isActive
								? "flex h-16 my-3 bg-[#1B61BE] cursor-pointer  items-center gap-7 px-6"
								: "flex h-16 my-3 hover:bg-[#1B61BE] cursor-pointer  items-center gap-7 px-6"
						}>
						<img src='warningicon.svg' alt='' className=' h-5' />
						<p className='m-0 p-0 font-bold  text-white'>Incidents</p>
					</NavLink>
					<div className='flex h-16 my-3 hover:bg-[#1B61BE] cursor-pointer items-center gap-7 px-6'>
						<img src='referenceicon.svg' alt='' className=' h-5' />
						<p className='m-0 p-0 font-bold  text-white'>Reference</p>
					</div>
				</div>
			</div>

			<nav className=' flex fixed top-0 justify-between items-center bg-white border-gray-200 h-[70px] w-full shadow max-[1669px]:h-[65px]'>
				<div className=' ml-[340px] max-[1669px]:ml-[280px]'>
					<img src='sysserve-logo.svg' alt='' className=' h-11' />
				</div>

				<div className=' mr-10 w-[450px]' id='navbar-default'>
					<ul className='font-medium flex items-center justify-between p-4 rounded-lg '>
						<li>
							<div
								className='flex bg-[#1A79F9] h-11 w-48 items-center justify-center cursor-pointer rounded-lg md:p-0 '
								aria-current='page' onClick={() => navigate("/newincidents")}>
								<p className='p-0 text-white'>Report an Incident</p>
							</div>
						</li>
						<li>
							<img
								src='user.svg'
								alt=''
								className='block my-2 ml-3 h-[35px] text-gray-900 rounded  '
							/>
						</li>
						<li>
							<p className='block pl-1 py-2 '>{ user.userName}</p>
						</li>
						<li>
							<img src='arrow-right.svg' alt='' className=' cursor-pointer' />
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default AdminLayout;
