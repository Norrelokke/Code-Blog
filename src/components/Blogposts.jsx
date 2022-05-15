import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import deletePost from '../hooks/useDelete';
import { useAuthContext } from '../contexts/AuthContext'

const Blogposts = ({ query }) => {
	const { currentUser } = useAuthContext()
    const navigate = useNavigate();
    return (

        <Container fluid className="grey py-3">
            <Container className=" py-3">
                {query.data && query.data.map((post) => (
                    <Container className="white" key={post.postid}>
                       {currentUser &&  <FontAwesomeIcon className="blogpostrashicon" icon={faTrashAlt}  onClick={() =>deletePost(post.postid)}/> }
                        <div className="blogpost" onClick={() => navigate("/posts/" + post.postid)} >
                            <img src={post.url} />
                            <div className="blogpost-text">
                                <h6>   {post.tags} </h6>
                                <h1>   {post.heading} </h1>
                            </div>
                        </div>
                    </Container>
                ))}
            </Container>
        </Container>

    )
}

export default Blogposts