import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../pages/firebase";
import "./Userpage.css";
import Adminnav from "./adminnav";
import { Rings } from 'react-loader-spinner';
import { toast } from "react-toastify";

const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    const userCollection = collection(db, "Users");
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, uid) => {
    setLoading(true);
    const userDoc = doc(db, "Users", userId);

    
    

    try {
      
      await deleteDoc(userDoc);
      setLoading(false);
      toast.success("User data deleted but need to delete the user from firebase.", {
        position: "top-center",
        
      });
      
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Adminnav />
      <div className="user-page">
        <h2 className="adminusertitle">Users</h2>
      
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Address</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="user-info">
                    {user.Username}
                  </div>
                </td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>
                  <span>
                    <button
                      className="user-delete-btn"
                      onClick={() => handleDelete(user.id, user.uid)}
                    >
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="loader-overlay">
          <Rings
            visible={true}
            height="150"
            width="150"
            color="#367588"
            ariaLabel="rings-loading"
          />
        </div>
      )}
    </>
  );
};

export default UserPage;
