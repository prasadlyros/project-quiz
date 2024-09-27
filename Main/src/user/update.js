import { useContext, useEffect, useState } from "react"
import Context from "../Context/Context"
import axios from "axios"
import home from '../assests/Home.png'
import logo from '../assests/logo.png'
import about from '../assests/about.png'
import contact from '../assests/contact.png'
import entertainment from '../assests/star.png'
import back from '../assests/back.png'
import { useNavigate } from "react-router-dom"

const Update = () => {
    const {globalUser, _} = useContext(Context)
    const [mail,setMail] = useState('')
    const [pwd,setPwd] = useState('')
    const [conPwd, setConPwd] = useState('')
    const [pwdErr, setPwdEr] = useState('')
    const [mailErr, setMailErr] = useState('')
    const [value, setValue] = useState(false)
    const [result, setResult] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3002/UserDetails?Username=${globalUser.Username}`).then((res) => setResult(res.data)).catch((err) => console.log(err))
    },[result])

    const handleHome = () => {
        navigate('/')
    }

    const handleBack = () => {
        if(globalUser.Dropdown === 'admin'){
            navigate('/admin')
        }
        else if(globalUser.Dropdown === 'user'){
            navigate('/user')
        }
        else{
            navigate('/')
        }
    }

    const handleUpdate = (e,id) => {
        e.preventDefault()
        if(pwd === conPwd){
            if(mail === ''){
                setValue(true)
                setMailErr("Feild required")
            }
            else{
                if(globalUser.Dropdown === 'user'){
                    const obj = {
                        Username : globalUser.Username,
                        Password : pwd,
                        Mail : mail
                    }
                    axios.patch(`http://localhost:3002/UserDetails/${id}`,obj).then((res) => console.log(res.data)).catch((err) => console.log(err))
                    console.log("Update in User")
                }
                else{
                    const obj = {
                        Username : globalUser.Username,
                        Password : pwd,
                        Mail : mail
                    }
                    axios.patch(`http://localhost:3002/AdminDetails/${id}`,obj).then((res) => console.log(res.data)).catch((err) => console.log(err))
                    console.log("Update in Admin")
                }
            }
        }
        else{
            setValue(true)
            setPwdEr("Passwords is not matching")
        }
    }

    const handleChange = (e,keyword) => {
        e.preventDefault()
        if(keyword === 'mail'){
            setMail(e.target.value)
        }
        else if(keyword === 'pwd'){
            setPwd(e.target.value)
        }
        else{
            setConPwd(e.target.value)
        }
      };

    return(
        <>
            <div className = 'header'>
                <div className = "logo-container">
                    <img src = {logo} alt= "logo" className = 'logo'></img>
                </div>
                <div className ="search-container">
                <input  type = "text" placeholder = " please search here" className = "search"></input>
                    <button className = "button">Login</button>
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
                    <img src={back} alt="Home"  className="image-logo" onClick={() => handleBack()}></img>
                    <p>Back</p>
                </div>
            </div>
            <form className='form-container'>
                <h2 className='form-header'>Update Form</h2>
                <label className='form-label'>Username:</label>
                <input type="text" className='form-input' id="read-only" name="username" readOnly value={globalUser.Username} onChange={(e) => handleChange(e,'uname')} placeholder="Please enter username" required/>
                <label className='form-label'>Email:</label>
                <input className='form-input' type="email" name="email" onChange={(e) => handleChange(e,'mail')} required placeholder="Please enter your email"/>
                {value ? <p className="form-erroe">{mailErr}</p> :''}
                <label className='form-label'>Password:</label>
                <input className='form-input' type="password" name="password" onChange={(e) => handleChange(e,'pwd')} placeholder="Please enter your password"/>
                <label className='form-label'>Confirm Password:</label>
                <input className='form-input' type="password" name="confirmPassword" onChange={(e) => handleChange(e,'conPwd')} placeholder="Re-enter your password"/>
                {value ? <p className="form-error">{pwdErr}</p> :''}
                {
                    result.map((item) => (
                        <div key={item.id}>
                            <button className = 'form-button' onClick={(e) => handleUpdate(e,item.id)}>Update</button>
                        </div>
                    ))
                }
            </form>
        </>
    )
}

export default Update