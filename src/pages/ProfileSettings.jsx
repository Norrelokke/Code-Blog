import React, { useRef, useState, useEffect } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import UploadImg from '../components/UploadProfileImg'

const ProfileSettings = () => {

    const displayNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const { currentUser, setDisplayName, setEmail, setPassword } = useAuthContext()
    const [imgUrl, setImgUrl] = useState(currentUser.photoURL)

    useEffect(() => {
        setImgUrl(currentUser.photoURL)
    }, [currentUser.photoURL]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        // make sure user has entered the same password in both input fields
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("The passwords does not match")
        }

        setError(null);
        setMessage(null)
        // update user profile
        try {
            // disable update-button while updating is in progress
            setLoading(true)

            if (displayNameRef.current.value !== currentUser.displayName) {
                await setDisplayName(displayNameRef.current.value)
            }

            if (emailRef.current.value !== currentUser.email) {
                await setEmail(emailRef.current.value)
            }

            if (passwordRef.current.value) {
                await setPassword(passwordRef.current.value)
            }

            setMessage("Profile successfully updated")
            setLoading(false)

        } catch (e) {
            setError("Error updating profile. Try logging out and in again.")
            setLoading(false)
        }
    }
    return (
        <>


            <Container fluid className="grey">
                <Container className="col-md-4 settings">
                    <h1>Hi {currentUser.displayName}, </h1>
                    <div className='photoUrl'> <img className="rounded-circle z-depth-2" src={imgUrl ? imgUrl : "/assets/profile.png"} /><UploadImg /> </div>
                </Container>
                <div className="text-center"><h3>Update Profile </h3></div>
                <Container className="col-md-4">
                    <Card>

                        <Card.Body>
                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                {/*
									Fill the displayName and email form fields with their current value!
								*/}

                                <Form.Group id="displayName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} />
                                </Form.Group>

                                <Form.Group id="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                                </Form.Group>

                                <Form.Group id="password" className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} autoComplete="new-password" />
                                </Form.Group>

                                <Form.Group id="password-confirm" className="mb-3">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} autoComplete="new-password" />
                                </Form.Group>

                                <Button disabled={loading} type="submit">Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </>
    )
}

export default ProfileSettings