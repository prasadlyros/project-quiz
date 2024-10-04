import Login from "./Login";
import AdminDashboard from "./admin/AdminDashboard";
import AdminTextBoard from "./admin/AdminTextBoard";
import ViewResults from "./admin/ViewResults";
import UserDashboard from "./user/UserDashboard";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import ReactQuiz from './user/ReactQuiz'
import HtmlQuiz from "./user/HtmlQuiz";
import CssQuiz from "./user/Cssquiz";
import JsQuiz from "./user/JsQuiz";
import Context from "./Context/Context";
import { useState } from "react";
import Signin from "./Signin";
import LandingPage from "./LandingPage";
import Update from "./user/update";
import './Css/Landing.css'

function App() { 

  const [globalUser, setGlobalUser] = useState({
    Username : '',
    Email : '',
    Dropdown : ''
  })

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{globalUser : globalUser, setGlobalUser : setGlobalUser}}>
            <Routes>
                <Route path="/" element= {<LandingPage></LandingPage>}></Route>
                <Route path='/login' element= {<Login></Login>}></Route>
                <Route path="/signin" element = {<Signin></Signin>}></Route>
                <Route path='/admin' element={<AdminDashboard></AdminDashboard>}></Route>
                <Route path='/user' element= {<UserDashboard></UserDashboard>}></Route>
                <Route path="/createaquiz" element= {<AdminTextBoard></AdminTextBoard>}></Route>
                <Route path="/viewResults" element= {<ViewResults></ViewResults>}></Route>
                <Route path="/reactQuiz" element= {<ReactQuiz></ReactQuiz>}></Route>
                <Route path="/htmlQuiz" element= {<HtmlQuiz></HtmlQuiz>}></Route>
                <Route path="/CssQuiz" element={<CssQuiz></CssQuiz>}></Route>
                <Route path="/jsQuiz" element={<JsQuiz></JsQuiz>}></Route>
                <Route path="/update" element= {<Update></Update>}></Route>
            </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
