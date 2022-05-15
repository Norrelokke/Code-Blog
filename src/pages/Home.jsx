import React from 'react'
import Blogposts from '../components/Blogposts'
import useGetposts from '../hooks/useGetposts'
import { Container } from 'react-bootstrap'

const HomePage = () => {
const postQuery = useGetposts()
	return (
		<Container fluid className="greyback">
			<Blogposts query={postQuery}/>
		</Container>
	)
}

export default HomePage
