import { useState } from "react";
import InstantaStaticImg from "../components/InstantaStaticImg";
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../api/auth";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
	const [send, setSend] = useState({});
	const navigate = useNavigate();

	const updateSendData = (event: { target: { name: any; value: any } }) => {
		setSend({
			...send,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async () => {
		
		const sendResponce: any = await requestPasswordReset(send);
		
		console.log("response", sendResponce);

		if (sendResponce.data.isSuccessful) {
			toast.success("Reset Link Sent to your Mail");
			navigate("/login");
			return;
		} else {
			//   toast.error(sendResponce.response.result);
			// navigate('/emailconfirmpassword');
			return;
		}
	};

	return (
		<>
			<div className='flex w-screen'>
				<InstantaStaticImg />
				<div className=' flex bg-white h-screen w-[900px] items-center justify-center'>
					<div className='flex flex-col w-full h-[750px] bg-white  items-center  py-11 '>
						<img
							src='sysserve-logo.svg'
							alt='sysserve logo'
							className='h-14 w-10 mb-28'
						/>
						<h1 className='p-0 mb-16 font-semibold text-xl text-gray-700'>
							FORGOT PASSWORD
						</h1>
						<p className='p-0 text-gray-700 w-96 font-semibold mb-14'>
							Happens! Just tell us the email you registered with, and we will
							send you an email to change it.
						</p>

						<div className='flex item-center justify-center w-96 mb-16'>
							<input
								type='email'
								name='email'
								onChange={updateSendData}
								placeholder='Email'
								className='outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full'
							/>
						</div>

						<div
							onClick={handleSubmit}
							className='flex bg-[#008FF4]  justify-between items-center px-4 rounded-md w-96 h-11 cursor-pointer shadow-md shadow-gray-500  mb-7'>
							<p className='text-white p-0'>Send Email</p>
							<img src='right-arrow.svg' alt='' />
						</div>
						<Link
							to={"/login"}
							className='p-0 text-[#1A79F9] w-96 font-semibold mb-5 cursor-pointer'>
							LOGIN
						</Link>

						<div>
							<p className='p-0 text-gray-700 w-96 font-semibold'>
								For every minute spent in organising, an hour is earned.
							</p>
							<p className='p-0 text-gray-700 w-96 font-semibold'>
								- Benjamin Franklin
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
