import { Link } from 'react-router-dom'
import './Navbar.scss'
import useUserStore from '../../stores/userStore'

export default function Navbar() {
	const token = useUserStore(state => state.token)
	const logout = useUserStore(state => state.logout)
	const username = useUserStore(state => state.username)
	const handleLogout = () => {
		logout()
	}
	return (
		<nav className='navbar navbar-expand-lg bg-dark'>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav ml-auto d-flex justify-content-end flex-grow-1'>
					{token ? (
						<>
							<li className='nav-item'>
								<span className='nav-link'>Hello, {username}!</span>
							</li>
							<li className='nav-item'>
								<button className='nav-link btn' onClick={handleLogout}>
									Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li className='nav-item'>
								<Link to='/login' className='nav-link'>
									Log in
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/register' className='nav-link'>
									Sign up
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	)
}
