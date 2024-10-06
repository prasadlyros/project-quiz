import { useState,useEffect, useContext } from "react"
import axios from "axios"
import Context from "../Context/Context"
import { useNavigate } from "react-router-dom"
import "../Css/quiz.css"
import Main from "./MainPage"
import confetti from "canvas-confetti"

const ReactQuiz = () =>{

    const [results, setResults] = useState([])
    const [answer, setAnswer] = useState(false)
    const [currentPage, setCurrentPage] =useState(1)
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const perPage = 1;
    let noOfPages = results.length;
    const {globalUser} = useContext(Context)
    const [showResults, setText] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3001/react').then((res) => setResults(res.data)).catch((err) => console.log(err))
    },[])

    const handleAnswer = (e) => {
        setAnswer(e.target.value)
    }

    const handleUpdate = () => {
        navigate('/update')
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

    const handleResult = () => {
        if(currentPage === noOfPages){
            axios.post('http://localhost:3003/results',{
                count : count + 1,
                Username : globalUser.Username,
                Mail : globalUser.Email,
                techno : "react"
            })  
            setText(false)
            confetti({
                particleCount: 300,
                spread: 190,
                startVelocity: 30,
                origin: { x: 0.5,y: 0.5 },
                colors : ['#FFD700','#800000','#FFFDD0','#F7E7CE']
            });
        }
        if(answer){
        axios.get(`http://localhost:3001/react?Answer=${answer}`).then((res) => {
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

    return(
        <>
        <Main></Main>
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
                                    <button onClick={() => handleNext()} className="skip">Skip</button>                      
                                    </>
                                ))
                                :<div className="result">
                                    <p className="yay">YAY</p>
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

export default ReactQuiz