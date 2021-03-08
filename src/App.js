import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignIn : false,
    name:'',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSinIn = () => {
    
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        
        const {email, displayName, photoURL} = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)
      })
      .catch(err => {
        console.log(err.masage);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const singOutUser ={
        isSignIn: '',
          name: '',
          email: '',
          photo:''
      }
      setUser(singOutUser)
    })
  }
  const handleBlur =(e) =>{
    // console.log(e.target.name,e.target.value);
    if(e.target.name === "email"){
      const isEmailVailid =  /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isEmailVailid);
    }
    if(e.target.name === "password"){
      const isPasswordVailid = e.target.value.length > 6;
      console.log(isPasswordVailid);
    }

  }
  const handleSubmit = () => {
    console.log("submitted");
  }
  return (
    <div className="App">
      
      {
        user.isSignIn ? <p>Hello there</p>:<h1>You need to verify your Account</h1>
      }
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button>:
        <button onClick={handleSinIn}>Sign In</button>
      }
      
      {
        user.isSignIn && <div>
          <h1>Welcome,{user.name}</h1>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
          <p>Your varification complite</p>
        </div>
      }
      {/* ********************************************************************** */}
      <h1>Our Own Authenticatin</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email' required/>
        <br/>
        <input type="password" name="password"  onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value="submit"/>
        
      </form>










    </div>
  );
}

export default App;
