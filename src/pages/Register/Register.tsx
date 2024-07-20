import axios from 'axios'
import { useState, ChangeEvent, FormEvent } from 'react'
import './register.scss'
import { API_URL } from '../../helpers/constants'

export default function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		position: '',
		password: '',
		access: true,
	})
	const [, setResponse] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		axios
			.post(API_URL + '/user', {
				...formData,
				position:
					formData.position.length === 0 ? undefined : formData.position,
			})
			.then(response => {
				setResponse(response.data)
			})
			.catch(error => {
				console.log(error)
			})

		setFormData({
			username: '',
			email: '',
			position: '',
			password: '',
			access: true,
		})
	}

	return (
		<>
			<div className='register-container'>
				<form className='register-form' onSubmit={handleSubmit}>
					<h2 className='login-logo'>Sign Up</h2>
					<div className='form-group'>
						<label className='form-label' htmlFor='username'>
							Username
						</label>
						<input
							type='text'
							id='username'
							className='form-control'
							name='username'
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label className='form-label' htmlFor='position'>
							Position
						</label>
						<input
							type='text'
							id='position'
							className='form-control'
							name='position'
							value={formData.position}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label className='form-label' htmlFor='email'>
							Email
						</label>
						<input
							type='email'
							id='email'
							className='form-control'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label className='form-label' htmlFor='password'>
							Password
						</label>
						<input
							type='password'
							id='password'
							className='form-control'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Sign up
					</button>
				</form>
			</div>
		</>
	)
}
