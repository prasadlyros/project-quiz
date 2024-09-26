import "./Css/Landing.css"
import banner from './assests/banner.png'
import banner1 from './assests/banner-ai.png'
import home from './assests/Home.png'
import logo from './assests/logo.png'
import about from './assests/about.png'
import contact from './assests/contact.png'
import entertainment from './assests/star.png'
import ball from './assests/ball.png'
import { useNavigate } from "react-router-dom"

function LandingPage(){

    let navigate = useNavigate()
    
    const handleSignIn = (e) => {
        e.preventDefault()
        navigate('/signin')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    const handleButton = () => {
        alert("Please do login ")
        navigate('/login')
    }

    return(
        <>
            <div className = 'header'>
                <div className = "logo-container">
                    <img src = {logo} alt= "logo" className = 'logo'></img>
                </div>
                <div className ="search-container">
                <input  type = "text" placeholder = " please search here" className = "search"></input>
                    <button className = "button" onClick={(e) => handleLogin(e)}>Login</button>
                    <button className = "button" onClick={(e) => handleSignIn(e)}>Signin</button>
                </div>
            </div>
            <hr></hr>
            <div className="div">
                <div className = "item">
                    <img src={home} alt="Home" className="image-logo"></img>
                    <p>Home</p>
                </div>
                <div className = 'item'>
                    <img src={about} alt="about"  className="image-logo"></img>
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
                    <img src={ball} alt="Home"  className="image-logo"></img>
                    <p>Sports</p>
                </div>
            </div>
            <div className="container">
                <div className="div1">
                    <img src={banner} className="image" alt = "banner"></img>
                    <h1>Create a quiz</h1>
                    <p className="p">Play for free with 300 participants</p>
                    <button className = 'container-button' onClick={() => handleButton()}>Create Quiz</button>
                </div>
                <div className="div2">
                    <img src={banner1} className="image" alt = "banner"></img>
                    <h1>A.I</h1>
                    <p className="p">Generate quiz using Ai</p>
                    <button className = 'container-button' onClick={() => handleButton()}>Play Quiz</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage