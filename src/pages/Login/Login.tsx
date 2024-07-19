import { useState, ChangeEvent, FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import './login.scss'
import useUserStore from '../../stores/userStore'
import { API_URL } from '../../helpers/constants'

async function loginUser(email: string, password: string) {
	try {
		const response = await fetch(API_URL + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		if (response.ok) {
			const data = await response.json()
			return { token: data.accessToken, username: data.username }
		} else {
			const errorData = await response.json()
			console.log('Login failed:', errorData.message)
			return null
		}
	} catch (error) {
		console.error('Error during login:', error)
		return null
	}
}

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const login = useUserStore(state => state.login)

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		const userInfo = await loginUser(email, password)
		if (userInfo && userInfo.token) {
			login(userInfo.token, email, userInfo.username)
		}
	}

	const token = useUserStore(state => state.token)

	if (token) {
		return <Navigate to='/' replace />
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
