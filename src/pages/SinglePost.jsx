import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useGetSinglePost from '../hooks/useGetSinglePost'

const SinglePost = () => {

	const { id } = useParams()
	const { data: post } = useGetSinglePost(id)

	return (
		<Container fluid className="grey py-3">
			<Container className="py-3">

				{post && <>

					<div className="singlepost align-items-center mb-3">

						<h1>{post.heading}</h1>
						<h6>{post.tags}</h6>
						<img src={post.url} />
						<h6>{post.desc}</h6>

						<div className="content" dangerouslySetInnerHTML={{ __html: post.value }}></div>
					</div>
				</>}
			</Container>
		</Container>
	)
}

export default SinglePost
