import { useState,useEffect, useContext } from "react"
import axios from "axios"
import Context from "../Context/Context"
import { useNavigate } from "react-router-dom"
import home from '../assests/Home.png'
import logo from '../assests/logo.png'
import about from '../assests/about.png'
import contact from '../assests/contact.png'
import entertainment from '../assests/star.png'
import back from '../assests/back.png'
import "../Css/quiz.css"

const JsQuiz = () =>{

    const [results, setResults] = useState([])
    const [answer, setAnswer] = useState(false)
    const [currentPage, setCurrentPage] =useState(1)
    const [count, setCount] = useState(0)
    const perPage = 1;
    const noOfPages = results.length;
    const {globalUser} = useContext(Context)
    const [showResults, setText] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/java script').then((res) => setResults(res.data)).catch((err) => console.log(err))
    })

    const handleHome = () => {
        navigate('/')
    }

    const handleAnswer = (e) => {
        e.preventDefault()
        setAnswer(e.target.value)
    }

    const handleNext = () => {
        const newAnswer = answer
        if(newAnswer){
            handleResult()
            setCurrentPage(currentPage+1)
        }
        else{
            alert('u have not selected any data')
            setCurrentPage(currentPage+1)
            if(currentPage === noOfPages){
                setText(false)
            }
        }
    }

    const handleBack = () => {
        navigate('/user')
    }

    const handleResult = () => {
        if(currentPage === noOfPages){
            axios.post('http://localhost:3003/results',{
                count : count + 1,
                Username : globalUser.Username,
                Mail : globalUser.Email,
                techno : "js"
            })  
            setText(false)
        }
        if(answer){
        axios.get(`http://localhost:3001/java script?Answer=${answer}`).then((res) => {
            const answerData = res.data.find(item => item.Answer === answer)
            if(answerData){
                console.log("answer found")
                setCount(count+1)
            }
            else{
                console.log("answer not found")
            }
        }).catch((err) => console.log(err))
        setCurrentPage(currentPage+1)
        }
        else{
            alert("Please select any option")
        }
    }

    const getPaginatedData = () =>{
        const startIndex = (currentPage-1)*perPage
        const endIndex=startIndex+perPage
        return results.slice(startIndex,endIndex)
    }

    const handleUpdate = () => {
        navigate('/update')
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
            <div className="main-div">
                <div className="user-details">
                    <p >Username : {globalUser.Username}</p>
                    <p>Email : {globalUser.Email}</p>
                    <button className="update" onClick={() => handleUpdate()}>Update</button>
                </div>
                <div className="mcq">
                    {
                        results ?
                            showResults?
                                getPaginatedData().map((item) => (
                                    <>
                                    <h1 className="ques">Question {currentPage}: {item.Question}</h1>
                                    <div className="options">
                                        <label className="label">
                                            <input type="radio" value={item.Option1} name="option" checked={answer === item.Option1} onChange={(e) => handleAnswer(e)} className="option"></input>
                                            {item.Option1}
                                        </label>
                                        <label className="label">
                                            <input type="radio" value={item.Option2} name="option" checked={answer === item.Option2} onChange={(e) => handleAnswer(e)} className="option"></input>
                                            {item.Option2}
                                        </label>
                                        <label className="label">
                                            <input type="radio" value={item.Option3} name="option" checked={answer === item.Option3} onChange={(e) => handleAnswer(e)} className="option"></input>
                                            {item.Option3}
                                        </label>
                                        <label className="label">
                                            <input type="radio" value={item.Option4} name="option" checked={answer === item.Option4} onChange={(e) => handleAnswer(e)} className="option"></input>
                                            {item.Option4}
                                        </label>
                                    </div>
                                    <button onClick={() => handleResult()} disabled = {currentPage === noOfPages+1} className="submit">Submit</button>
                                    <button onClick={() => handleNext()}  className="skip">Skip</button>                      
                                    </>
                                ))
                                :<div className="result">
                                    <p>Answered {count} of {noOfPages}</p>
                                    <p>Total Score : {count}</p>
                                    {console.log('it is hitting')}
                                </div>
                            :<p>No questions available</p>
                    }
                </div>
            </div>
        </>
    )
}

export default JsQuiz