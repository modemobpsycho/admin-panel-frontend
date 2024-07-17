import axios from 'axios'
import { useState, ChangeEvent, FormEvent } from 'react'
import './register.scss'
import Navbar from '../../components/Navbar/Navbar'

export default function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		access: true,
		refreshToken: 'sdgjdsklfj213',
	})
	const [response, setResponse] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		axios
			.post('http://localhost:5000/api/user', formData)
			.then(response => {
				setResponse(response.data)
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<>
			<Navbar />
			<div className='register-container'>
				<form className='register-form' onSubmit={handleSubmit}>
					<h2>Register</h2>
					<div className='form-group'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							id='username'
							name='username'
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<button type='submit' className='btn-register'>
						Register
					</button>
				</form>
			</div>
		</>
	)
}
