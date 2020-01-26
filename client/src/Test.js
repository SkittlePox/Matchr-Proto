import React, { useState } from 'react';
import firebase from './config/fbConfig';

const Test = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    const userRef = db.collection("users-top-artists").add({
      fullName,
      email
    });

    setEmail("");
    setFullName("");

  }

  return (
    <form >
      <input
        type="text"
        name="fullname"
        placeholder="Full name"
        onChange={(e) => {
          setFullName(e.target.value)
        }}
        value={fullName}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        value={email}
      />
      <button type="submit">Submit</button>
    </form >
  )
}

export default Test;