import React, { useRef, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LoginForm = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { signin } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null);

		try {
			setLoading(true)
			await signin(emailRef.current.value, passwordRef.current.value)
			navigate('/')

		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
	
		<Container fluid className="grey">
				
					<Container className="col-md-4 py-5">
							<div className="text-center">Log In</div>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Button disabled={loading} variant="primary" type="submit">Log In</Button>
							</Form>

							<div className="text-center mt-3">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div>

					<div className="text-center mt-3">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
					</Container>
			</Container>
	)
}

export default LoginForm