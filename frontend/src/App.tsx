import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { useAuthContext } from "./context/AuthContext"

function App() {
  const { authUser, isLoading } = useAuthContext()

  if(isLoading) return

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
  			<Routes>
				<Route path='/' element={ authUser ?  <Home /> : <Navigate to='/login' /> } />
				<Route path='/signup' element={ authUser ? <Navigate to='/' /> : <SignUp /> } />
				<Route path='/login' element={ authUser ? <Navigate to="/" /> : <Login /> } />
			</Routes>
    </div>
  )
}

export default App
