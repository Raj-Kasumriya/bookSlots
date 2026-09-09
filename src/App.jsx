import './App.css'
import Home from './Home'
import { Routes, Route } from 'react-router-dom'
import AboutMe from './AboutMe'
import CreateTimeSlots from './CreateTimeSlots'
import Login from './Login';
import ForgotPass from "./ForgotPass"
import Signup from './Signup'
import StudentViewAvailableS from './StudentViewAvailableS'
import NavbarMentorStudent from "./NavbarMentorStudent"
import { createContext, useState } from 'react'
import StudentMentorHome from './StudentMentorHome'
import StudentBookedSlots from './BookedSessionStudent'
import StudentSubTimeSlots from './StudentSubTimeSlots'
import MentorStudents from './AllMentorStudents'
import MentorSessions from './AllMentorSession'


export const userContexts = createContext()

function App() {

  const userOb = localStorage.getItem("login-User") || "{}"

  const { User } = JSON.parse(userOb) || {}

  const [UserC, setUser] = useState(User)


  const userObj = {
    UserC,
    setUser
  }



  return (

    <div className='w-screen h-screen' >

      <userContexts.Provider value={userObj} >

        <NavbarMentorStudent />

        <div className=' h-full mt-16'>
          <Routes >
            <Route index path="/" element={<Home User={User} />} />
            {/* <Route path="/Home" element={<StudentMentorHome User={User} />} /> */}
            <Route path="About-as" element={<AboutMe />} />
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="forgotPassword" element={<ForgotPass />}></Route>

            {/* <Route path="DashBoard" element={<MentorDashBoard />} /> */}
            <Route path="Mentor/createTimeSlots" element={<CreateTimeSlots User={User} />} />
            <Route path="Mentor/MentorSessions" element={<MentorSessions User={User} />} />
            <Route path="Mentor/timeSlotsSubmittedStudent" element={<StudentSubTimeSlots User={User} />}></Route>
            <Route path="Mentor/Students" element={<MentorStudents User={User} />}></Route>



            <Route path="/Student/viewSession" element={<StudentViewAvailableS User={User} />}></Route>
            <Route path="/Student/viewBookedSession" element={<StudentBookedSlots User={User} />}></Route>

            {/* <Route path="Mentor/Profile" element={<MentorProfile />}></Route>
          <Route path="Mentor/Setting" element={<Setting />}></Route> */}




          </Routes>
        </div>
      </userContexts.Provider>

    </div >

  )
}

export default App
