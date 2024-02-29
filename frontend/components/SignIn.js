// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SignIn = ({ setUser }) => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform sign-in logic, then update the user state
//     setUser({ name, mobileNumber });
//   };

//         return (
//             <div>
//             <h2>Sign In</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                 <label>Name:</label>
//                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div>
//                 <label>Mobile Number:</label>
//                 <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
//                 </div>
//                 <button type="submit">Sign In</button>
//             </form>
//             <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//             </div>
//         );
// };

// export default SignIn;







import { useState } from "react";

export default function SignIn() {
  // States for registration
        //   const [name, setName] = useState("");
        const [mobileNumber, setMobileNumber] = useState("");
        const [password, setPassword] = useState("");

        // States for checking the errors
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(false);

        // // Handling the name change
        //   const handleName = (e) => {
        //     setName(e.target.value);
        //     setSubmitted(false);
        //   };

        // Handling the mobileNumber change
        const handleMobileNumber = (e) => {
            setMobileNumber(e.target.value);
            setSubmitted(false);
        };

        // Handling the password change
        const handlePassword = (e) => {
            setPassword(e.target.value);
            setSubmitted(false);
        };

        // Handling the form submission
        const handleSubmit = (e) => {
            e.preventDefault();
            if ( mobileNumber === "" || password === "") {
            setError(true);
            } else {
            setSubmitted(true);
            setError(false);
            }
        };

        // Showing success message
        const successMessage = () => {
            return (
            <div
                className="success"
                style={{
                display: submitted ? "" : "none",
                }}
            >
                <h1>User  successfully Login!!</h1>
            </div>
            );
        };

        // Showing error message if error is true
        const errorMessage = () => {
            return (
            <div
                className="error"
                style={{
                display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
            );
        };

    return (
        <div className="form" style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px", margin: "auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9" }}>
        <div style={{ marginBottom: "20px" }}>
            <h1 style={{ textAlign: "center" }}>User Login</h1>
        </div>
        {/* Calling to the methods */}
        <div className="messages" style={{ marginBottom: "20px" }}>
            {errorMessage()}
            {successMessage()}
        </div>

        <form>
            {/* Labels and inputs for form data */}


            {/* <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
            <input
                onChange={handleName}
                style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
                value={name}
                type="text"
            />
            </div> */}


            <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Mobile Number</label>
            <input
                onChange={handleMobileNumber}
                style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
                value={mobileNumber}
                type="text"
            />
            </div>

            <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
                onChange={handlePassword}
                style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
                value={password}
                type="password"
            />
            </div>

            <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">
            Submit
            </button>
        </form>
        {/* <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> */}
        </div>
    );
}

































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SignIn = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');

//   const handleMobileNumberChange = (e) => {
//     setMobileNumber(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to handle sign-in
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="mobileNumber">Mobile Number:</label>
//           <input type="text" id="mobileNumber" value={mobileNumber} onChange={handleMobileNumberChange} />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" value={password} onChange={handlePasswordChange} />
//         </div>
//         <button type="submit">Sign In</button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//       </p>
//     </div>
//   );
// };

// export default SignIn;
