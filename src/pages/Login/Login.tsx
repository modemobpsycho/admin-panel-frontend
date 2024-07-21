import { useState, ChangeEvent, FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import './login.scss'
import useUserStore from '../../stores/userStore'
import { API_URL } from '../../helpers/constants'
import useModalStore from '../../stores/modalStore'
import axios from 'axios'
import { errorHandler } from '../../helpers/errorHandler'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const login = useUserStore(state => state.login)
	const { showMessage } = useModalStore(state => state)

	const token = useUserStore(state => state.token)

	if (token) {
		return <Navigate to='/' replace />
	}

	async function loginUser() {
		try {
			const { data } = await axios.post(API_URL + '/login', {
				email,
				password,
			})
			showMessage('Login successful!')
			return { token: data.accessToken, username: data.username }
		} catch (error) {
			errorHandler(error, showMessage)
		}
	}

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		const userInfo = await loginUser()
		if (userInfo && userInfo.token) {
			login(userInfo.token, email, userInfo.username)
		}
	}

	return (
		<>
			<div className='login-container'>
				<form className='login-form' onSubmit={handleSubmit}>
					<h3 className='login-logo'>Log In</h3>
					<div className='form-group'>
						<label htmlFor='email' className='form-label'>
							Email address
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							aria-describedby='emailHelp'
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password' className='form-label'>
							Password
						</label>
						<input
							type='password'
							className='form-control'
							id='password'
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Log In
					</button>
				</form>
			</div>
		</>
	)
}
