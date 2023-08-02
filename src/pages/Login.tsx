import { useState } from "react";
import { loginUser } from "../api/auth";
import InstantaStaticImg from "../components/InstantaStaticImg";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user } from '../redux/slice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginData, setLoginData] = useState({});
	const [isValid, setIsvalid] = useState(false);

	// VALIDATION STATES
	const [valid, setValid] = useState(false);
	const [lowerValidated, setLowerValidated] = useState(false);
	const [upperValidated, setUpperValidated] = useState(false);
	const [numberValidated, setNumberValidated] = useState(false);
	const [specialValidated, setSpecialValidated] = useState(false);
	const [lengthValidated, setLengthValidated] = useState(false);

	const updateLoginData = (e: any) => {
		if (e.target.name === "password") {
			setValid(true);
			const lower = new RegExp("(?=.*[a-z])");
			const upper = new RegExp("(?=.*[A-Z])");
			const number = new RegExp("(?=.*[0-9])");
			const special = new RegExp("(?=.*[!@#$%^&*])");
			const length = new RegExp("(?=.{8,})");

			lower.test(e.target.value)
				? setLowerValidated(true)
				: setLowerValidated(false);
			upper.test(e.target.value)
				? setUpperValidated(true)
				: setUpperValidated(false);
			number.test(e.target.value)
				? setNumberValidated(true)
				: setNumberValidated(false);
			special.test(e.target.value)
				? setSpecialValidated(true)
				: setSpecialValidated(false);
			length.test(e.target.value)
				? setLengthValidated(true)
				: setLengthValidated(false);
		}

		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		navigate('/adminhome');
		return;

		// dispatch(showLoading());
		const loginResponse: any = await loginUser(loginData);
		// dispatch(hideLoading());

		if (loginResponse.status === 200) {
			setIsvalid(false);
			toast.success("Login Successful");
			const { token } = loginResponse.data;
			dispatch(user(loginResponse.data));
			localStorage.setItem("userToken", JSON.stringify(token));
			localStorage.setItem("userdata", JSON.stringify(loginResponse.data));

			if (loginResponse.data.roles[0].roleName == "ADMIN") {
				navigate('/adminhome');
			} else {
				navigate('/login');
			}
		} else if (loginResponse.response.data.result === "Bad credentials") {
			setIsvalid(true);
			return;
		}
	};

	return (
		<>
			<div className='flex w-screen'>
				<InstantaStaticImg />
				<div className=' flex bg-white h-screen w-[900px] items-center justify-center'>
					<div className='flex flex-col w-full h-[830px] bg-white  items-center  py-11 '>
						<img
							src='sysserve-logo.svg'
							alt='sysserve logo'
							className='h-14 w-10 mb-32'
						/>
						<h1 className='p-0 mb-14 font-semibold text-xl text-gray-700'>
							LOGIN
						</h1>

						{isValid && (
							<div className='flex bg-[#ff04042d] gap-5 w-96 h-12 mb-8 px-4 justify-center items-center rounded-md'>
								<img src='errortriangle.svg' alt='' />
								<p className='p-0 text-gray-700 font-semibold'>
									Invalid Email / Password
								</p>
							</div>
						)}

						<div className='flex flex-col gap-5 w-96 mb-14'>
							<input
								type='email'
								name='email'
								onChange={updateLoginData}
								placeholder='Email'
								className='outline-[#008FF4]  border-[#D9D9D9] border-1 rounded-md p-2'
							/>
							<input
								type='password'
								name='password'
								onChange={updateLoginData}
								placeholder='Password'
								className='outline-[#008FF4] border-[#D9D9D9] border-1 rounded-md p-2'
							/>
							{valid ? (
								<div className='h-5 w-60 overflow-hidden m-0 text-sm text-[#FF8181]'>
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

						<div
							onClick={handleSubmit}
							className='flex bg-[#008FF4]   justify-between items-center px-4 rounded-md w-96 h-11 cursor-pointer shadow-md shadow-gray-500 mb-7'>
							<p className='text-white p-0'>Login</p>
							<img src='right-arrow.svg' alt='' />
						</div>
						<Link
							to={"/forgotpassword"}
							className='p-0 text-[#1A79F9] w-96 font-semibold mb-7 cursor-pointer'>
							FORGOT PASSWORD
						</Link>

						<div>
							<p className='p-0 text-gray-700 w-96 font-semibold'>
								{" "}
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

export default Login;
