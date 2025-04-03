import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaBell } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',
    notifications: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Profile Settings</h1>
        <button 
          className="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-grid">
        {/* Profile Information */}
        <div className="card profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <FaUser />
            </div>
            <h2>Personal Information</h2>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <div className="input-group">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <div className="input-group">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="button">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">{profile.email}</span>
                </div>
              </div>

              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <span className="info-label">Phone</span>
                  <span className="info-value">{profile.phone}</span>
                </div>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <span className="info-label">Address</span>
                  <span className="info-value">{profile.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="card-header">
            <FaLock className="card-icon" />
            <h2>Security Settings</h2>
          </div>
          <div className="security-options">
            <button className="button button-secondary">
              Change Password
            </button>
            <button className="button button-secondary">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="card-header">
            <FaBell className="card-icon" />
            <h2>Notification Settings</h2>
          </div>
          <div className="notification-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  notifications: e.target.checked
                }))}
              />
              <span>Enable Email Notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  notifications: e.target.checked
                }))}
              />
              <span>Enable SMS Notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 