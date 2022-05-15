import React from 'react'
import { Container } from 'react-bootstrap'

import Blogposts from '../components/Blogposts'
import useGetposts from '../hooks/useGetposts'

const Profile = () => {
	const postQuery = useGetposts({
		fetchUserPosts: true,
	})

	return (
		<Container className="py-3">

			 {postQuery.length ? <Blogposts query={postQuery} /> : 	<Container className="white no-post"> <h1>Sorry, no posts to view </h1></Container>}

		</Container>
	)
}

export default Profile