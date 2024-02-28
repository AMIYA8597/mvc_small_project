// pages/signup.js
import SignUp from "../../components/SignUp"


const SignUpPage = () => {
  const handleSignUp = (formData) => {
    // Handle sign-up logic here
    console.log('Form data:', formData);
  };

  return (
    <div>
      <SignUp/>
    </div>
  );
};

export default SignUpPage