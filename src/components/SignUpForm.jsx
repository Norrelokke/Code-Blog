import React, { useRef, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SignupForm = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { signup } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		// make sure user has entered the same password in both input fields
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}

		setError(null);
		// try to sign up the user with the specified credentials
		try {
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
			navigate('/')

		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<>
		<Container fluid className="grey">
				
				<Container className="col-md-4 py-5">
		
						<div className="text-center">Sign up</div>
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

								<Form.Group id="password-confirm" className="mb-3">
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} required />
								</Form.Group>

								<Button disabled={loading} type="submit">Create Account</Button>
							</Form>

							<div className="text-center mt-3">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div>

					<div className="text-center mt-3">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
			
			</Container>
			</Container>
		</>
	)
}

export default SignupForm