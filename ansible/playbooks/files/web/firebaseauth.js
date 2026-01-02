// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Your new Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBz7C87VuLddHDS-LNHnScxTFhbXUqs1J4",
    authDomain: "kssem-wifihealthcare.firebaseapp.com",
    databaseURL: "https://kssem-wifihealthcare-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kssem-wifihealthcare",
    storageBucket: "kssem-wifihealthcare.firebasestorage.app",
    messagingSenderId: "904758117254",
    appId: "1:904758117254:web:74184c02b1ea84c291e207"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to show messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up
document.getElementById('submitSignUp').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!email || !password || !firstName || !lastName) {
        showMessage('All fields are required!', 'signUpMessage');
        return;
    }
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters!', 'signUpMessage');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            return setDoc(doc(db, "users", user.uid), userData);
        })
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Error:", error);
            if (error.code === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            } else {
                showMessage('Unable to create user. Try again!', 'signUpMessage');
            }
        });
});

// Sign In
document.getElementById('submitSignIn').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login successful', 'signInMessage');
            localStorage.setItem('loggedInUserId', userCredential.user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            console.error("Error:", error);
            if (error.code === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not exist', 'signInMessage');
            }
        });
});
