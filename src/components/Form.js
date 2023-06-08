import React, {useState} from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';
 
function Form(props) {
    const [name , setName] = useState('');
    const [country , setCountry] = useState('');
    const [email , setEmail] = useState('');
    const [state , setState] = useState('');
    const [district , setDistrict] = useState('');
    const [pincode , setPincode] = useState('');
    const [house_no , setHouse] = useState('');

    const navigate = useNavigate()
 
    const handleChange =(e)=>{
      setName(e.target.value);
    }
    
    const handleCountryChange =(e)=>{
      setCountry(e.target.value);
    }
    
    const handleEmailChange =(e)=>{
      setEmail(e.target.value);
    }
    
    const handleStateChange =(e)=>{
      setState(e.target.value);
    }
    
    const handleDistrictChange =(e)=>{
      setDistrict(e.target.value);
    }

    const handlePincodeChange =(e)=>{
        setPincode(e.target.value);
    }

    const handleHouseChange =(e)=>{
        setHouse(e.target.value);
    }
    
    const handleSubmit=async (e) => {
      e.preventDefault();
        
      const API = "http://localhost:5000/user/addDetails"

      const body = `user_id=${props.account}&country=${country}&email_id=${email}&name=${name}&state=${state}
                    &district=${district}&pincode=${pincode}&house_no=${house_no}`

      const res = await fetch(API,{method:"POST",body: body,
                                  "mode": "no-cors",headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }})
        navigate("/")
        alert("user details added now you can buy")
    }
  return (
    <div className="form-container">
        <header className="App-header">
            <form onSubmit={(e) => {handleSubmit(e)}}>
            
                <h2> Website Name </h2>
                <h3> User Details Form </h3>
                <img src="" alt="company-logo" className="logo"/>
                <label >
                Name:
                </label><br/>
                <input type="text" value={name} required onChange={(e) => {handleChange(e)}} /><br/>
                
                <label>
                Email:
                </label><br/>
                <input type="email" value={email} required onChange={(e) => {handleEmailChange(e)}} /><br/>

                <label>
                Country:
                </label><br/>
                <input type="text" value={country} required onChange={(e) => {handleCountryChange(e)}} /><br/>

                <label>
                State:
                </label><br/>
                <input type="text" value={state} required onChange={(e) => {handleStateChange(e)}} /><br/>

                <label>
                District:
                </label><br/>
                <input type="text" value={district} required onChange={(e) => {handleDistrictChange(e)}} /><br/>

                <label>
                Pincode:
                </label><br/>
                <input type="text" value={pincode} required onChange={(e) => {handlePincodeChange(e)}} /><br/>

                <label>
                House No:
                </label><br/>
                <input type="text" value={house_no} required onChange={(e) => {handleHouseChange(e)}} /><br/>
                
                <input type="submit" value="Submit"/>
            </form>
        </header>
    </div>
  );
}
 
export default Form;