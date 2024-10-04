import home from '../assests/Home.png'
import logo from '../assests/logo.png'
import about from '../assests/about.png'
import contact from '../assests/contact.png'
import entertainment from '../assests/star.png'
import back from '../assests/back.png'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    const handleBack = () => {
        navigate('/user')
    }

    const handleLogout = () => {
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
                    <button className = "button" onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
            <hr></hr>
            <div className="div">
                <div className = "item">
                    <img src={home} alt="Home" className="image-logo" onClick={() => handleHome()}></img>
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
                    <img src={back} alt="Home"  className="image-logo" onClick={() => handleBack()}></img>
                    <p>Back</p>
                </div>
            </div>
        </>
    )
}

export default Main