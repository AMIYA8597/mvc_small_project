import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import BasicCard from "../../components/Card";
import SignupPage from "../../components/Signuppage";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // <Navbar/>
    <SignupPage/>
  );
}
