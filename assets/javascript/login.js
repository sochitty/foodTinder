
// Initialize Firebase
const config = {
    apiKey: "AIzaSyCkd_pu_cNIG-m9SslOM5VoErwGr3vzt8Q",
    authDomain: "foodtinder-d04db.firebaseapp.com",
    databaseURL: "https://foodtinder-d04db.firebaseio.com",
    projectId: "foodtinder-d04db",
    storageBucket: "foodtinder-d04db.appspot.com",
    messagingSenderId: "770202764576"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

//get elements
const txtEmail = $('#txtEmail');
const txtPassword = $('#txtPassword');
const btnLogin = $('#btnLogin');
const btnSignUp = $('#btnSignUp');
const btnLogout = $('#btnLogout');

//add login event
$('#btnLogin').on('click', function({
const email = $('#txtEmail').val().trim();
const pass = $('#txtEmail').val().trim();
const auth = firebase.auth();
//sign in
auth.signInWithEmailAndPassword(email, pass);


}))

















  // LOGIN AUTH

const auth = firebase.auth();
//sign in
auth.signInWithEmailAndPassword(email, pass);
//create user
auth.createUserWithEmailAndPassword(email, pass);
//has user logged in or out?
auth.onAuthStateChanged(firebaseUser => {});

