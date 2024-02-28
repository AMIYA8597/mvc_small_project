import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSignUp function passed from the parent component
    onSignUp({ name, email, password });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
};

export default SignUp;






















































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SignUp = ({ setUser }) => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform sign-up logic, then update the user state
//     setUser({ name, mobileNumber });
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label>Mobile Number:</label>
//           <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <Link to="/signin">Sign In</Link></p>
//     </div>
//   );
// };

// export default SignUp;










// import { useState } from "react";
// // import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Link } from 'react-router-dom';

// export default function SignUp({ setUser }) {
//   // States for registration
//   const [name, setName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [password, setPassword] = useState("");

//   // States for checking the errors
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState(false);

//   // Handling the name change
//   const handleName = (e) => {
//     setName(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the mobileNumber change
//   const handleMobileNumber = (e) => {
//     setMobileNumber(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the password change
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name === "" || mobileNumber === "" || password === "") {
//       setError(true);
//     } else {
//       setSubmitted(true);
//       setError(false);
//     }
//   };

//   // Showing success message
//   const successMessage = () => {
//     return (
//       <div
//         className="success"
//         style={{
//           display: submitted ? "" : "none",
//         }}
//       >
//         <h1>User {name} successfully registered!!</h1>
//       </div>
//     );
//   };

//   // Showing error message if error is true
//   const errorMessage = () => {
//     return (
//       <div
//         className="error"
//         style={{
//           display: error ? "" : "none",
//         }}
//       >
//         <h1>Please enter all the fields</h1>
//       </div>
//     );
//   };

//   return (
//     <div className="form" style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px", margin: "auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9" }}>
//       <div style={{ marginBottom: "20px" }}>
//         <h1 style={{ textAlign: "center" }}>User Registration</h1>
//       </div>
//       {/* Calling to the methods */}
//       <div className="messages" style={{ marginBottom: "20px" }}>
//         {errorMessage()}
//         {successMessage()}
//       </div>

//       <form>
//         {/* Labels and inputs for form data */}
//         <div style={{ marginBottom: "20px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
//           <input
//             onChange={handleName}
//             style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
//             value={name}
//             type="text"
//           />
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>Mobile Number</label>
//           <input
//             onChange={handleMobileNumber}
//             style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
//             value={mobileNumber}
//             type="text"
//           />
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
//           <input
//             onChange={handlePassword}
//             style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
//             value={password}
//             type="password"
//           />
//         </div>

//         <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">
//           Submit
//         </button>
//       </form>
//                   <p>
//                     Already have an account? <Link to="/signin">Sign In</Link>
//                   </p>
//     </div>
//   );
// }




















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleMobileNumberChange = (e) => {
//     setMobileNumber(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to handle sign-up
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label htmlFor="mobileNumber">Mobile Number:</label>
//           <input type="text" id="mobileNumber" value={mobileNumber} onChange={handleMobileNumberChange} />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" value={password} onChange={handlePasswordChange} />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>
//         Already have an account? <Link to="/signin">Sign In</Link>
//       </p>
//     </div>
//   );
// };

// export default SignUp;






























// Filename - Form.js

// import { useState } from "react";

// export default function Form() {
// 	// States for registration
// 	const [name, setName] = useState("");
// 	const [mobileNumber, setMobileNumber] = useState("");
// 	const [password, setPassword] = useState("");

// 	// States for checking the errors
// 	const [submitted, setSubmitted] = useState(false);
// 	const [error, setError] = useState(false);

// 	// Handling the name change
// 	const handleName = (e) => {
// 		setName(e.target.value);
// 		setSubmitted(false);
// 	};

// 	// Handling the mobileNumber change
// 	const handleEmail = (e) => {
// 		setMobileNumber(e.target.value);
// 		setSubmitted(false);
// 	};

// 	// Handling the password change
// 	const handlePassword = (e) => {
// 		setPassword(e.target.value);
// 		setSubmitted(false);
// 	};

// 	// Handling the form submission
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (name === "" || mobileNumber === "" || password === "") {
// 			setError(true);
// 		} else {
// 			setSubmitted(true);
// 			setError(false);
// 		}
// 	};

// 	// Showing success message
// 	const successMessage = () => {
// 		return (
// 			<div
// 				className="success"
// 				style={{
// 					display: submitted ? "" : "none",
// 				}}
// 			>
// 				<h1>User {name} successfully registered!!</h1>
// 			</div>
// 		);
// 	};

// 	// Showing error message if error is true
// 	const errorMessage = () => {
// 		return (
// 			<div
// 				className="error"
// 				style={{
// 					display: error ? "" : "none",
// 				}}
// 			>
// 				<h1>Please enter all the fields</h1>
// 			</div>
// 		);
// 	};

// 	return (
// 		<div className="form" >

//               <br />
//               <br />
// 			<div>
// 				<h1>User Registration</h1>
// 			</div>
//               <br />
// 			{/* Calling to the methods */}
// 			<div className="messages">
// 				{errorMessage()}
// 				{successMessage()}
// 			</div>

// 			<form>
// 				{/* Labels and inputs for form data */}
// 				<label className="label">Name</label>
// 				<input
// 					onChange={handleName}
// 					className="input"
// 					value={name}
// 					type="text"
// 				/>
//               <br />
//               <br />
              
// 				<label className="label">MobileNumber</label>
// 				<input
// 					onChange={handleEmail}
// 					className="input"
// 					value={mobileNumber}
// 					type="mobileNumber"
// 				/>

//               <br />
//               <br />

// 				<label className="label">Password</label>
// 				<input
// 					onChange={handlePassword}
// 					className="input"
// 					value={password}
// 					type="password"
// 				/>

//               <br />
//               <br />

// 				<button onClick={handleSubmit} className="btn" type="submit">
// 					Submit
// 				</button>
// 			</form>
// 		</div>
// 	);
// }













// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// // import App from './SignApp.css'

// const SignUp = (props) => {
//   const [userName, setUserName] = useState('')
//   const [mobileNumber, setMobileNumber] = useState('')
//   const [password, setPassword] = useState('')
//   const [userNameError, setUserNameError] = useState('')
//   const [mobileNumberError, setMobileNumberError] = useState('')
//   const [passwordError, setPasswordError] = useState('')

//   // const navigate = useNavigate()

//   const onButtonClick = () => {
//     // You'll update this function later...
//   }

//   return (
//     <div className={'mainContainer'}>
//       <div className={'titleContainer'}>
//         <div>SignUp Here</div>
//       </div>

//       <br />
//       <div className={'inputContainer'}>
//         <input
//           value={userName}
//           placeholder="Enter your UserName here"
//           onChange={(ev) => setUserName(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{userNameError}</label>
//       </div>

//       <br />
//       <div className={'inputContainer'}>
//         <input
//           value={mobileNumber}
//           placeholder="Enter your phoneNumber here"
//           onChange={(ev) => setMobileNumber(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{mobileNumberError}</label>
//       </div>

      
//       <br />
//       <div className={'inputContainer'}>
//         <input
//           value={password}
//           placeholder="Enter your password here"
//           onChange={(ev) => setPassword(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{passwordError}</label>
//       </div>
//       <br />
//       <div className={'inputContainer'}>
//         <input className={'inputButton'} type="button" onClick={onButtonClick} value={'SignUp'} />
//       </div>
//     </div>
//   )
// }

// export default SignUp