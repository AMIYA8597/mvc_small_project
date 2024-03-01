import { FunctionComponent, ReactElement } from "react";
import Navbar from "./Navbar";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


const BaseLayout= ({ children }) => {
  return (
    <>
        {/* <Navbar/> */}

           <SignUp />

        <SignIn />

          <div className="py-16 bg-gray-100 overflow-hidden min-h-screen">
            <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
    </>
  );
};

export default BaseLayout;