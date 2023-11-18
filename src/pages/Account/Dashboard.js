import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
  
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const logOut = () => {
    signOut(auth);
    window.alert("Logout Successful!");
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
