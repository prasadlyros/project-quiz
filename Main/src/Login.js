    import axios from "axios"
    import {useContext, useState} from "react"
    import {useNavigate} from 'react-router-dom'
    import Context from "./Context/Context"
    import "./Css/Login.css"
    import home from './assests/Home.png'
    import logo from './assests/logo.png'
    import about from './assests/about.png'
    import contact from './assests/contact.png'
    import entertainment from './assests/star.png'
    import back from './assests/back.png'
    

    const Login =() => {
        let navigate = useNavigate()
        const [uname, setUname] = useState('')
        const [pwd, setPwd] = useState('')
        const [value, setValue] =useState('')
        const {_,setGlobalUser} = useContext(Context)
        const [error, setError] = useState('')

        const handleChange = (e,keyword) => {
            e.preventDefault()
            if(keyword === 'uname'){
                setUname(e.target.value)
            }
            else{
                setPwd(e.target.value)
            }
        }

        const handledropdown =(e) => {
            setValue(e.target.value)
        }

        const handleSignIn = (e) => {
            e.preventDefault()
            navigate('/signin')
        }

        const handleHome = () => {
            navigate('/')
        }

        const handleValidation = (e) => {
            e.preventDefault()
            if(value === 'admin'){
                console.log('admin is triggered')
                axios.get(`http://localhost:3002/AdminDetails?Username=${uname}`).then((res) => {
                    const details = res.data.find(item => item.Username === uname && item.Password === pwd)
                    if(details){
                        setGlobalUser({
                            Username : uname,
                            Email : details.Mail
                        })
                        navigate("/admin")
                    }
                    else{
                        setError("credentials not matching")
                    }
                }).catch((err) => console.log(err))
            }
            else if (value === 'user'){
                console.log('user is triggered')
                axios.get(`http://localhost:3002/UserDetails?Username=${uname}`).then((res) => {
                    const details = res.data.find(item => item.Username === uname && item.Password === pwd)
                    if(details){
                        setGlobalUser({
                            Username : uname,
                            Email : details.Mail
                        })
                        navigate("/user")
                    }
                    else{
                        setError("credentials not matching")
                    }
                }).catch((err) => console.log(err))
            }
            else{
                alert("Please select admin or user")
            }
        }
        return(
            <>
                <div className = 'header'>
                    <div className = "logo-container">
                        <img src = {logo} alt= "logo" className = 'logo'></img>
                    </div>
                    <div className ="search-container">
                    <input  type = "text" placeholder = " please search here" className = "search"></input>
                        <button className = "button" onClick={(e) => handleSignIn(e)}>Signin</button>
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
                        <img src={back} alt="Home"  className="image-logo" onClick={() => handleHome()}></img>
                        <p>Back</p>
                    </div>
                </div>
                <form className='form-container'>
                    <h2 className='form-header'>Login Quiz.com</h2>
                    <label className="form-label">Login type :</label>
                    <select name="interference" className="select" onChange={(e) => handledropdown(e)}>
                        <option selected>select type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <label className="form-label">Username</label>
                    <input className="form-input" type="text" name="username" placeholder="enter your name" onChange={(e) => handleChange(e,"uname")}></input>
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" name="password" placeholder="enter your password" onChange={(e) => handleChange(e,"pwd")}></input>
                    <p>{error}</p>
                    <button className="form-button" type="button" onClick={(e) => handleValidation(e)}>Login</button>
                </form> 
            </>
        )
    }

    export default Login