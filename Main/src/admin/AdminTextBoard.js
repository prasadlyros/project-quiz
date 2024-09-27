import { useContext, useState } from "react"
import CreateQuiz from "./CreateQuiz"
import { useNavigate } from "react-router-dom"
import home from '../assests/Home.png'
import logo from '../assests/logo.png'
import about from '../assests/about.png'
import contact from '../assests/contact.png'
import entertainment from '../assests/star.png'
import back from '../assests/back.png'
import "../Css/adminTextBoard.css"
import Context from "../Context/Context"

const AdminTextBoard = () => {

    const [dropDownValue, setDropDownValue] =useState(null)
    const [pages, setPages] = useState('')
    const [createQuiz,setCreateQuiz] = useState(false)
    const navigate = useNavigate()
    const {globalUser} = useContext(Context)

    let array = Array.from({length : pages}, (_,i) => i+1)

    const handledropdown =(e) => {
        setDropDownValue(e.target.value)
    }   

    const handleHome = () => {
        navigate('/')
    }

    const handleBack = (e) => {
        navigate('/admin')
    }

    const handlePage = (e) => {
        e.preventDefault()
        if(dropDownValue){
            if(pages > 0){
                setCreateQuiz(true)
                console.log(createQuiz)
            }
            else{
                alert('Please select Questions')
            }
        }
        else{
            alert("Please select technology")
        }
    }

    const handleUpdate = () => {
        navigate('/update')
    }

    const handleCreateQuiz = () => {
        setCreateQuiz(false)
    }

    const handleques = (e) => {
        e.preventDefault()
        setPages(e.target.value)
    }
    return(
        <>
            <div className = 'header'>
                <div className = "logo-container">
                    <img src = {logo} alt= "logo" className = 'logo'></img>
                </div>
                <div className ="search-container">
                <input  type = "text" placeholder = " please search here" className = "search"></input>
                </div>
            </div>
            <hr></hr>
            <div className="div">
                <div className = "item">
                    <img src={home} alt="Home" className="image-logo" onClick={() => handleHome()}></img>
                    <p>Home</p>
                </div>
                <div className = 'item'>
                    <img src={about} alt="about" className="image-logo"></img>
                    <p>About</p>
                </div>
                <div className = 'item'>
                    <img src={contact} alt="contact"  className="image-logo"></img>
                    <p>Contact</p>
                </div>
                <div className = 'item'>
                    <img src={entertainment} alt="singin"  className="image-logo"></img>
                    <p>Entertainment</p>
                </div>
                <div className = 'item'>
                    <img src={back} alt="Home" className="image-logo" onClick={() => handleBack()}></img>
                    <p>Back</p>
                </div>
            </div>
            <div className="main-div">
                <div className="admin-details">
                        <p >Username : {globalUser.Username}</p>
                        <p>Email : {globalUser.Email}</p>
                        <button className="update" onClick={() => handleUpdate()}>Update</button>
                </div>
                <div>
                    <select onChange={(e) => handledropdown(e)} className="dropdown">
                        <option selected>select tech</option>
                        <option value="React">React</option>
                        <option value="HTML">HTML</option>
                        <option value='css'>CSS</option>
                        <option value='js'>Java Script</option>
                    </select>
                    How many Ques : <input type="text" onChange={(e) => handleques(e)} className="dropdown-text"></input>
                    <button type="submit" onClick={(e) => handlePage(e)} className="submit-button">Submit</button>
                    { createQuiz && <CreateQuiz totalPages = {array} perPage = {1} dropDownValue = {dropDownValue} createQuizValue ={handleCreateQuiz}></CreateQuiz>} 
                </div>
            </div>
            {console.log(createQuiz)}
        </>
    )
}
export default AdminTextBoard