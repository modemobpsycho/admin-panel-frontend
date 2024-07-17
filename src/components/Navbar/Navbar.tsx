import { Link } from 'react-router-dom'
import './Navbar.scss'
import useUserStore from '../../stores/userStore'

export default function Navbar() {
	const isLoggedIn = useUserStore(state => state.isLoggedIn)
	const logout = useUserStore(state => state.logout)

	const handleLogout = () => {
		logout()
	}
	return (
		<nav className='navbar navbar-expand-lg bg-dark'>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav ml-auto'>
					{isLoggedIn ? (
						<li className='nav-item'>
							<button className='nav-link btn' onClick={handleLogout}>
								Logout
							</button>
						</li>
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
