import React, { useState, useEffect } from 'react';
import '../CSS/profileView.css';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import { fetchUserId, fetchUser, editUser } from '../APIF/user.fetch';

function ProfileView() {
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function getId() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      try {
        const data = await fetchUserId(token);
        setId(data.id);
        const userdata = await fetchUser(data.id);
        setUser(userdata);
        setUpdatedUser(userdata); // Initialize updatedUser with the fetched data
      } catch (error) {
        console.error('Failed to fetch user id:', error);
      }
    }
    console.log('Show Popup state changed:', showPopup);
    getId();
  }, [showPopup]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedUserData = await editUser(id, updatedUser);
      console.log('Updated user data:', updatedUserData);
      setUser(updatedUserData);
      setIsEditing(false);
      setShowPopup(true); 
      console.log('Popup should be shown:', showPopup);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    window.location.reload(); // Refresh the page
  };

  if (!user) {
    return (
      <div className="navbar-position">
        <Navbar />
        <div className="profile">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-position">
      <Navbar />
      <div className="profile-container">
        <div className="profile">
          <img
            className="profile-pic"
            src={user.photo ? `data:image/jpeg;base64,${user.photo}` : 'https://cdn-icons-png.flaticon.com/512/4122/4122901.png'}
            alt="Profile"
          />
          <div className="profile-info">
            <label htmlFor="nome">Name:</label>
            {isEditing ? (
              <input
                type="text"
                id="nome"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
              />
            ) : (
              <p id="nome">{user.name}</p>
            )}
            <label htmlFor="email">Email:</label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
            ) : (
              <p id="email">{user.email}</p>
            )}
            <label htmlFor="phone">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                id="phone"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
              />
            ) : (
              <p id="phone">{user.phone}</p>
            )}
            <label htmlFor="address">Address:</label>
            {isEditing ? (
              <input
                type="text"
                id="address"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
              />
            ) : (
              <p id="address">{user.address}</p>
            )}
            <label htmlFor="description">Description:</label>
            {isEditing ? (
              <textarea
                id="description"
                name="description"
                value={updatedUser.description}
                onChange={handleChange}
              />
            ) : (
              <p id="description">{user.description || 'N/A'}</p>
            )}
            <label htmlFor="created-at">Account Created:</label>
            <p id="created-at">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          {isEditing ? (
            <button className="edit-save-button" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-save-button" onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="popupProfile-overlay">
          <div className="popupProfile">
            <h2>Success!</h2>
            <p>Your profile has been updated successfully.</p>
            <button className="popupProfile-button" onClick={handlePopupClose}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
