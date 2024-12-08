import React, { useState, useEffect } from 'react';

type User = {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    email: string;
    accessLevel: string;
};

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const username = localStorage.getItem('username');

    useEffect(() => {
        // Fetch user data from API using fetch
        fetch(process.env.REACT_APP_API_URL + '/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = () => {
        // Update user data via API using fetch
        fetch('/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating user data:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label>Access Level:</label>
                <input
                    type="text"
                    name="accessLevel"
                    value={user.accessLevel}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
    );
};

export default UserProfile;