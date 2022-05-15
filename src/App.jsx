import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import PageNotFound from './pages/PageNotFound'
import SinglePost from './pages/SinglePost'
import CreatePost from './pages/CreatePost'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SignupForm from './components/SignUpForm'
import RequireAuth from './components/RequireAuth'
import ProfileSettings from './pages/ProfileSettings'
import Profile from './pages/Profile'


function App() {
	return (
		<>
			<Navigation />
			<div id="App">
				<Routes>
					<Route path="/" element={
					<RequireAuth redirectTo={"/login"}>
					<Home />
					</RequireAuth>
					} />
					<Route path="/posts/:id" element={<SinglePost />} />
					<Route path="/createpost" element={<CreatePost />} />

					<Route path="/login" element={<LoginPage/>} />
					<Route path="/logout" element={<LogoutPage/>} />
					<Route path="/signup" element={<SignupForm/>} />
					<Route path="/settings" element={<ProfileSettings/>} />
					<Route path="/profile" element={<Profile/>} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		</>
	)
}

export default App
