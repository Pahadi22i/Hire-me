import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showsignIN , setShowSignIn]=useState(false)
   const [search ,setSearch]= useSearchParams();
   const user = useUser();
   
     useEffect(()=>{
      if(search.get("sign-in")){
        setShowSignIn(true)
      }
     },[search])

    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        setShowSignIn(false);
        setSearch({});
      }
    };

  return (
    <>
      <nav className="py-4 flex justify-between items-center ">
        <Link>
          <img src={logo} alt="logo image" srcset="" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button varitent="Outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
            {/* <SignInButton/> */}
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/job-post">
                <Button varitent="destuctive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job{" "}
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-Jobs"
                />
                <UserButton.Link
                  label="Saved jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showsignIN && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
