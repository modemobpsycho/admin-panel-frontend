import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import axios from 'axios'
import { AccessButton } from '../Tools/AccessButton'
import { DeleteButton } from '../Tools/DeleteButton'

interface User {
	id: number
	email: string
	username: string
	password: string
	access: boolean
}

export default function Table() {
	const [data, setData] = useState<User[]>([])

	useEffect(() => {
		axios
			.get<User[]>('http://localhost:5000/api/users')
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

	const handleUpdateAccess = (userId: number, access: boolean) => {
		axios
			.put(`http://localhost:5000/api/users/${userId}`, { access })
			.then(response => {
				setData(prevData => {
					const updatedData = prevData.map(item => {
						if (item.id === userId) {
							return { ...item, access }
						}
						return item
					})
					return updatedData
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	const handleDeleteUser = (userId: number) => {
		axios
			.delete(`http://localhost:5000/api/users/${userId}`)
			.then(() => {
				setData(prevData => prevData.filter(item => item.id !== userId))
			})
			.catch(error => {
				console.log(error)
			})
	}

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'email', headerName: 'Email', width: 200 },
		{ field: 'username', headerName: 'Username', width: 130 },
		{ field: 'password', headerName: 'Password', width: 130 },
		{
			field: 'access',
			headerName: 'Access',
			type: 'boolean',
			width: 90,
			renderCell: params => (
				<AccessButton
					access={params.value as boolean}
					userId={params.row.id as number}
					onUpdateAccess={handleUpdateAccess}
				/>
			),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			type: 'boolean',
			width: 90,
			renderCell: params => (
				<div>
					<DeleteButton
						userId={params.row.id as number}
						onDelete={handleDeleteUser}
					/>
				</div>
			),
		},
	]

	const rows = data.map(item => ({
		id: item.id,
		email: item.email,
		username: item.username,
		password: item.password,
		access: item.access,
	}))

	return (
		<div
			style={{ height: 800, width: '80%', margin: 'auto', marginTop: '40px' }}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				disableRowSelectionOnClick
				disableColumnSelector
			/>
		</div>
	)
}
