// import React from "react";
import { resetPassword } from "../api/auth";
import ForgotPassword from "./ForgotPassword";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Oppsymodal from "../components/Oppsymodal";
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
	const navigate = useNavigate();
	const [send, setSend] = useState({});
	const [oopsy, setOopsy] = useState(false);
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const token = params.get("token");

	// VALIDATION STATES
	const [valid, setValid] = useState(false);
	const [lowerValidated, setLowerValidated] = useState(false);
	const [upperValidated, setUpperValidated] = useState(false);
	const [numberValidated, setNumberValidated] = useState(false);
	const [specialValidated, setSpecialValidated] = useState(false);
	const [lengthValidated, setLengthValidated] = useState(false);

	const updateSendData = (event: { target: { name: any; value: any } }) => {
		setValid(true);

		const lower = new RegExp("(?=.*[a-z])");
		const upper = new RegExp("(?=.*[A-Z])");
		const number = new RegExp("(?=.*[0-9])");
		const special = new RegExp("(?=.*[!@#$%^&*])");
		const length = new RegExp("(?=.{8,})");

		lower.test(event.target.value)
			? setLowerValidated(true)
			: setLowerValidated(false);
		upper.test(event.target.value)
			? setUpperValidated(true)
			: setUpperValidated(false);
		number.test(event.target.value)
			? setNumberValidated(true)
			: setNumberValidated(false);
		special.test(event.target.value)
			? setSpecialValidated(true)
			: setSpecialValidated(false);
		length.test(event.target.value)
			? setLengthValidated(true)
			: setLengthValidated(false);

		setSend({
			...send,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async () => {
		if (Object.keys(send).length === 0) {
			setOopsy(true);
			return;
		} else {
			setOopsy(false);
		}
		// dispatch(showLoading());
		const sendResponce: any = await resetPassword(send, token!);
		// dispatch(hideLoading());
		console.log(sendResponce);
		if (sendResponce.data.isSuccessful) {
			toast.success(sendResponce.data.result);
			navigate("/login");
			return;
		} else if (sendResponce.response.result === "No value present") {
			setOopsy(true);
			return;
		} else {
			
		}
	};

	return (
		<>
			<div className=' z-10 flex justify-center h-screen w-full bg-gray-700 bg-opacity-50 fixed'>
				<div className=' flex flex-col h-screen items-center rounded-md w-[40%] bg-white'>
					<div className='flex relative items-center w-[95%] mt-10 px-3 justify-between mb-5'>
						{oopsy && <Oppsymodal />}
						<h1 className='text-lg font-bold'>Reset Password</h1>
						<img
							onClick={handleSubmit}
							src='button.svg'
							alt=''
							className=' cursor-pointer w-24 h-10'
						/>
					</div>

					<div className='flex flex-col items-center bg-[#E9F0F4] w-[95%] h-[80%]'>
						<div className='flex flex-col items-center mt-10 pt-9 pb-6 bg-white w-[94%] '>
							<hr className=' mt-10 w-full mb-6 border' />

							<div className='flex items-center justify-between w-[95%] p-5 bg-[#F6F6F6]'>
								<div className='flex flex-col w-[48%] '>
									<p className='font-bold'>Password</p>
									<input
										onChange={updateSendData}
										type='password'
										name='newPassword'
										placeholder='Password'
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>

								<div className='flex flex-col w-[48%]'>
									<p className='font-bold'>Confirm Password</p>
									<input
										onChange={updateSendData}
										type='password'
										name='confirmPassword'
										placeholder='Password'
										className={
											oopsy
												? "outline-[#008FF4] border-[#FF8181] bg-[#FFE0E1] border-1 rounded-md p-2 w-full"
												: "outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2 w-full"
										}
									/>
								</div>
							</div>
							{valid ? (
								<div className='h-5 w-60 mt-2 overflow-hidden m-0 text-sm text-[#FF8181]'>
									{!lowerValidated && <p>At least one lowercase letter</p>}
									{!upperValidated && <p>At least one uppercase letter</p>}
									{!numberValidated && <p>At least one number</p>}
									{!specialValidated && <p>At least one special character</p>}
									{!lengthValidated && <p>At least 8 characters</p>}
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
			<ForgotPassword />
		</>
	);
};

export default ResetPassword;
