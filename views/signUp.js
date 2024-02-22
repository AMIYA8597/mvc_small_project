import { useState } from "react";

function signUp () {
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        
        if (name === "" || mobileNo === "" || password === ""){
            alert('Please fill out all fields');
        } else {
            // send data to the server
            fetch('/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    mobileNo,
                    password
                })
            }).then(() => {
                console.log('Success!')
                window.location.replace("/login")
            }).catch((error) => {
                console.error('Error:', error);
            });
        };
    };
  
    return (
        <div className="container">
            
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br/><br/>
               <label>
                Mobile Number:
                <input  
                    type="tel"  
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  
                    required="required"  
                    value={mobileNo}  
                    onChange={(e)=>setMobileNo(e.target.value)}  
                /> 
              </label><br/><br/>
              <button type="submit">Sign Up</button>
            </form> 
             </div>      
    )
              
};

export default signUp;