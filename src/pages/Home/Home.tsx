import { Navigate } from 'react-router-dom'
import Table from '../../components/Table/Table'
import useUserStore from '../../stores/userStore'

export default function Home() {
	const token = useUserStore(state => state.token)

	if (!token) {
		return <Navigate to='/login' />
	}
	return (
		<>
			<Table />
		</>
	)
}
