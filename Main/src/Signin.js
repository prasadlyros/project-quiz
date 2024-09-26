import { useContext, useState } from "react";
import home from './assests/Home.png'
import logo from './assests/logo.png'
import about from './assests/about.png'
import contact from './assests/contact.png'
import entertainment from './assests/star.png'
import back from './assests/back.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "./Context/Context";

const Signin = () => {

    const [name, setName] = useState('')
    const [mail,setMail] = useState('')
    const [pwd,setPwd] = useState('')
    const [conPwd, setConPwd] = useState('')
    const [err ,setErr] = useState('')
    const [msgErr, setMsgErr] = useState('')
    const [mailErr, setMailErr] = useState('')
    const [value, setValue] = useState(false)
    const [dropdown, setDropdown] = useState('')
    const navigate = useNavigate()
    const {_,setGlobalUser} = useContext(Context)

    const handleChange = (e,keyword) => {
        e.preventDefault()
        if(keyword === 'uname'){
            setName(e.target.value)
        }
        else if (keyword === 'mail'){
            setMail(e.target.value)
        }
        else if(keyword === 'pwd'){
            setPwd(e.target.value)
        }
        else{
            setConPwd(e.target.value)
        }
      };

      const handleHome = () => {
        navigate('/')
    }

    const handledropdown =(e) => {
        setDropdown(e.target.value)
    }

    const resetFun = () => {
        setName('');
        setMail('');
        setPwd('');
        setConPwd('');
    }
    
    const handleSubmit = (e) => {
        if(dropdown === 'admin'){
            if(name === ''){
                setValue(true)
                setMsgErr('Feild required')
            }
            else if (mail === ''){
                setValue(true)
                setMailErr("feild required")
            }
            else{
                axios.post(`http://localhost:3002/AdminDetails`,{
                    Username : name,
                    Password : pwd,
                    Mail : mail
                }).then((res) => console.log(res)).catch((err) => console.log(err));
                setGlobalUser({
                    Username : name,
                    Email : mail
                })
                navigate('/admin')
            }
        }
        else if (dropdown === 'user'){
            if(name === ''){
                setValue(true)
                setMsgErr('Feild required')
            }
            else if (mail === ''){
                setValue(true)
                setMailErr("feild required")
            }
            else{
                axios.post(`http://localhost:3002/UserDetails`,{
                    Username : name,
                    Password : pwd,
                    Mail : mail
                }).then((res) => console.log(res)).catch((err) => console.log(err));
                setGlobalUser({
                    Username : name,
                    Email : mail
                })
                navigate('/user')
            }
        }
        else{
            alert('Please select Register Type')
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
                    <img src={back} alt="Home"  className="image-logo" onClick={() => handleHome()}></img>
                    <p>Back</p>
                </div>
            </div>
            <form className='form-container'>
                <h2 className='form-header'>Registration Form</h2>
                <label className="form-label">Register type :</label>
                    <select name="interference" className="select" onChange={(e) => handledropdown(e)}>
                        <option selected>select type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                <label className='form-label'>Username:</label>
                <input type="text" className='form-input' name="username" onChange={(e) => handleChange(e,'uname')} placeholder="Please enter username" required/>
                {value ? <p>{msgErr}</p> : ''}
                <label className='form-label'>Email:</label>
                <input className='form-input' type="email" name="email" required onChange={(e) => handleChange(e,'mail')} placeholder="Please enter your email"/>
                {value ? <p>{mailErr}</p> : ''}
                <label className='form-label'>Password:</label>
                <input className='form-input' type="password" name="password" onChange={(e) => handleChange(e,'pwd')} placeholder="Please enter your password"/>
                <label className='form-label'>Confirm Password:</label>
                <input className='form-input' type="password" name="confirmPassword" onChange={(e) => handleChange(e,'conPwd')} placeholder="Re-enter your password"/>
                <p className='form-error'>{err}</p>
                <button type="button" className='form-button' onClick={(e) => handleSubmit(e)}>Register</button>
            </form>
        </>
    )
}

export default Signin