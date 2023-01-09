import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import profilePic from "../Images/archer.jpg";
import Navbar from './Navbar';

//*************************CURRENTLY DISABLED****************************
const About = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [abtClick, setAbtClick] = useState(false);
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
        console.log(user);
    }

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if (!res.status === 200) 
            {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            //history.push('/login');
            navigate('/login');
        }
    }
    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work } = user;

        const res = await fetch("/updateAbout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work
            })
        });

        const data = await res.json();

        // I need to change the data to res 
        if (data.status === 422 || !data) {
            window.alert("INvalid Registration");
            console.log("INvalid Registration");
        } else {
            window.alert("Successful Update");
            console.log("Successful Update");
            setAbtClick(!abtClick);
            callAboutPage();

        }
    }

    const editBtn = async() => {
        setUser({name: userData.name, email: userData.email, phone: userData.phone, work: userData.work})
        setAbtClick(!abtClick);
    }

    useEffect(() => {
        callAboutPage();
    }, []);


    return (
        <>
            <Navbar />
            <div className="container emp-profile">
                    <form method="POST">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    <img src={profilePic} alt="thapa" />
                                </div>
                            
                            </div>

                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5>{ userData.name}</h5>
                                    <h6>{ userData.work}</h6>
                                    <p className="profile-rating mt-3 mb-5">RANKINGS: <span> 1/10 </span></p>


                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                        
                                        </li>
                                    </ul>
                            </div>
                            </div>

                            <div className="col-md-2">
                                <button type="button" class="btn btn-primary" onClick={editBtn}>Edit Profile</button>
                            </div>

                        </div>



                        <div className="row">
                            {/* left side url  */}
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <p> WORK LINK</p>
                                    <a href="https://www.google.com/" target="_blank">Youtube</a> <br />
                                    <a href="https://www.google.com/" target="_blank">Instagram</a> <br />
                                    <a href="https://www.google.com/" target="_blank">Github</a> <br />
                                    <a href="https://www.google.com/" target="_blank">WebsiteGitHubMERN Dev</a> <br />
                                    <a href="https://www.google.com/" target="_blank">Web Developer</a> <br />
                                    <a href="https://www.google.com/" target="_blank">Figma</a> <br />
                                    <a href="https://www.google.com/" target="_blank">Software Engineer</a> <br />
                                    
                                    
                                </div>
                            </div> 

                            {/* right side data toogle  */}

                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                <label>User Id</label>
                                                </div>
                                                <div className="col-md-6">
                                                <p>787865454546</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Name</label>
                                                </div>
                                                <div className="col-md-6 ">
                                                    {!abtClick? 
                                                    <p>{ userData.name}</p>: 
                                                    <input type="text" class="form-control" onChange={handleInputs} name="name" placeholder={userData.name} 
                                                    ></input>}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Email</label>
                                                </div>
                                                <div className="col-md-6">
                                                    {!abtClick? 
                                                    <p>{ userData.email}</p>: 
                                                    <input type="text" class="form-control" onChange={handleInputs} name="email" placeholder={userData.email} ></input>}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Phone</label>
                                                </div>
                                                <div className="col-md-6">
                                                {!abtClick? 
                                                    <p>{ userData.phone}</p>: 
                                                    <input type="number" class="form-control" onChange={handleInputs} name="phone" placeholder={userData.phone} ></input>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                {
                                                    abtClick? 
                                                    <button type="submit" class="btn btn-primary" onClick={PostData}>SUBMIT</button>:<></>
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Experience</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Hourly Rate</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>10$/hr</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Total Projects</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>230</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>English Level</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Availability</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>6 months</p>
                                                </div>
                                            </div>
                                
                                </div>
                            </div>
                        </div>
                        </div>

                    </form>
            </div>

        </>
    )
}

export default About