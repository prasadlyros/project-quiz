import { useContext, useEffect, useState } from "react"
import Context from "../Context/Context"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import home from '../assests/Home.png'
import logo from '../assests/logo.png'
import about from '../assests/about.png'
import contact from '../assests/contact.png'
import entertainment from '../assests/star.png'
import back from '../assests/back.png'
import "../Css/viewResults.css"

const ViewResults = () => {
    const {globalUser} = useContext(Context);
    const [result, setResults] = useState([]);
    const navigate = useNavigate()
    const [main, setMain] = useState()

    useEffect(() => {
        axios.get("http://localhost:3003/results").then((res) => setResults(res.data)).catch((err) => console.log(err))
    },[])

    const handleHome = () => {
        navigate('/')
    }

    const handledropdown =(e) => {
        handleSortByButton(e,e.target.value)
    }

    const handleBack = (e) => {
        navigate('/admin')
    }

    const handleSortByButton = (e,keyword) => {
        // e.preventDefault()
        let sortedData = [...result]
        console.log(keyword)
        if(keyword === 'Score'){
            const SortByCount = sortedData.sort((a,b) => a.count - b.count)
            setMain(SortByCount)
        }
        else if(keyword === 'Name'){
            const SortByName = sortedData.sort((a,b) => a.Username.localeCompare(b.Username))
            setMain(SortByName)
        }
        else if(keyword === 'Techno'){
            const SortByTechno = sortedData.sort((a,b) => a.techno.localeCompare(b.techno))
            setMain(SortByTechno)
        }
        else{
            setMain('')
        }
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
            <div className="main-div">
                <div className="admin-details">
                    <p >Username : {globalUser.Username}</p>
                    <p>Email : {globalUser.Email}</p>
                    <button className="update" onClick={() => handleUpdate()}>Update</button>
                </div>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Mail</th>
                            <th>Score</th>
                            <th>Techno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result ? 
                            main ?
                                main.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.Username}</td>
                                        <td>{item.Mail}</td>
                                        <td>{item.count}</td>
                                        <td>{item.techno}</td>
                                    </tr>
                                ))
                            :result.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.Username}</td>
                                    <td>{item.Mail}</td>
                                    <td>{item.count}</td>
                                    <td>{item.techno}</td>
                                </tr>
                            ))
                        : <tr><td colSpan="4">No data available</td></tr>
                        }
                    </tbody>
                </table>
                <div className="sort-by">
                    <select onChange={(e) => handledropdown(e)}>
                            <option value=''>Sort by</option>
                            <option value='Score'>Score</option>
                            <option value='Name'>Name</option>
                            <option value='Techno'>Techno</option>
                    </select>   
                </div>
            </div>
        </>
    )
}

export default ViewResults


                {/* <h1>It is showing results</h1>
                <select onChange={(e) => handledropdown(e)} className="sort-by">
                    <option value=''>Sort by</option>
                    <option value='Score'>Score</option>
                    <option value='Name'>Name</option>
                </select>
                {
                    result ? 
                        result.map((item) => (
                            <div key={item.id} className="map-div">
                                <h2>User : {item.Username}</h2>
                                <h3>Mail : {item.Mail}</h3>
                                <h4>Score : {item.count}</h4>
                                <h5>Techno : {item.techno}</h5>
                            </div>
                        ))
                        :<p>No data available</p>
                }
                <button onClick={(e) => handleBack(e)} className="back">Back</button> */}

