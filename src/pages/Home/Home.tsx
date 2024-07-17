import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import Table from '../../components/Table/Table'

export default function Home() {
	
	return (
		<>
			<Navbar />
			<Table />
		</>
	)
}
