import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Context from "../Context/Context"
import home from '../assests/Home.png'
import logo from '../assests/logo.png'
import about from '../assests/about.png'
import contact from '../assests/contact.png'
import entertainment from '../assests/star.png'
import back from '../assests/back.png'
import hand from '../assests/handArrow.png'
import "../Css/adminDashboard.css"

function AdminDashboard(){
    const {globalUser} = useContext(Context)
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
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
                    <img src={back} alt="Home"  className="image-logo" onClick={() => handleHome()}></img>
                    <p>Back</p>
                </div>
            </div>
            <div className="main-div">
                <div className="admin-details">
                    <p >Username : {globalUser.Username}</p>
                    <p>Email : {globalUser.Email}</p>
                    <button className="update">Update</button>
                </div>
                <div className="admin-links">
                    <h2><img src={hand} alt="arrow" className="arrow"></img><Link to='/Createaquiz'>Create a quiz</Link></h2>
                    <h2><img src={hand} alt="arrow" className="arrow"></img><Link to='/viewResults'>View Results</Link></h2>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard