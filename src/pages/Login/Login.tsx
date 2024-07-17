import { useState, ChangeEvent, FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import './login.scss'
import Navbar from '../../components/Navbar/Navbar'
import useUserStore from '../../stores/userStore'

async function loginUser(email: string, password: string) {
	try {
		const response = await fetch('http://localhost:5000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		if (response.ok) {
			const data = await response.json()
			return data.token
		} else {
			console.log('Login failed')
			return null
		}
	} catch (error) {
		console.error('Error during login:', error)
		return null
	}
}

export default function Login(): JSX.Element {
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

		const token = await loginUser(email, password)
		if (token) {
			document.cookie = `token=${token}; path=/;`
			console.log('Token:', token)
			login(token) // Вызываем метод `login` из `userStore`
		}
	}

	const isLoggedIn = useUserStore(state => state.isLoggedIn)

	if (isLoggedIn) {
		return <Navigate to='/' replace />
	}

	return (
		<>
			<Navbar />
			<div className='login-container mt-3'>
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
