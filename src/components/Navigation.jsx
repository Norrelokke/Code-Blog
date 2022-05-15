import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {
	const { currentUser } = useAuthContext()
	return (
		<Navbar variant="light" expand="md">
			<Container>
				<Link to="/" className="navbar-brand">
					<img role="img" src="/assets/bloglogo.png" height="33px" width="200px" />
				</Link>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">

						{currentUser ? (
							<>
								<NavDropdown title={currentUser.email} id="basic-nav-dropdown">
									<NavLink to="/Profile" className="nav-link">Profile</NavLink>
									<NavDropdown.Divider />
									<NavLink to="/settings" className="nav-link">Settings</NavLink>
									<NavDropdown.Divider />
									<NavLink to="/createpost" className="nav-link">Create Post</NavLink>

									<NavDropdown.Divider />
									<NavLink to="/logout" className="nav-link">Logout</NavLink>
								</NavDropdown>
							</>

						) : (
							<>
								<NavLink to="/login" className="nav-link"><FontAwesomeIcon icon={faUser} /></NavLink>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
