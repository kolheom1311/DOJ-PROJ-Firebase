// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyAmOs_YJ_8DuOmcAxgXSZEtX3xyVJVTBDg",
//   authDomain: "my-first-login-35108.firebaseapp.com",
//   databaseURL: "https://my-first-login-35108-default-rtdb.firebaseio.com",
//   projectId: "my-first-login-35108",
//   storageBucket: "my-first-login-35108.appspot.com",
//   messagingSenderId: "944541614614",
//   appId: "1:944541614614:web:4eb7dc4e223d2c7979ab37",
//   measurementId: "G-494Y23PPPY"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // Initialize variables
// const auth = firebase.auth()
// const database = firebase.database()

// // Set up our register function
// function register () {
//   // Get all our input fields
//   email = document.getElementById('email').value
//   password = document.getElementById('password').value
//   full_name = document.getElementById('full_name').value
//   favourite_song = document.getElementById('favourite_song').value
//   milk_before_cereal = document.getElementById('milk_before_cereal').value

//   // Validate input fields
//   if (validate_email(email) == false || validate_password(password) == false) {
//     alert('Email or Password is Outta Line!!')
//     return
//     // Don't continue running the code
//   }
//   if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
//     alert('One or More Extra Fields is Outta Line!!')
//     return
//   }
 
//   // Move on with Auth
//   auth.createUserWithEmailAndPassword(email, password)
//   .then(function() {
//     // Declare user variable
//     var user = auth.currentUser

//     // Add this user to Firebase Database
//     var database_ref = database.ref()

//     // Create User data
//     var user_data = {
//       email : email,
//       full_name : full_name,
//       favourite_song : favourite_song,
//       milk_before_cereal : milk_before_cereal,
//       last_login : Date.now()
//     }

//     // Push to Firebase Database
//     database_ref.child('users/' + user.uid).set(user_data)

//     // DOne
//     alert('User Created!!')
//   })
//   .catch(function(error) {
//     // Firebase will use this to alert of its errors
//     var error_code = error.code
//     var error_message = error.message

//     alert(error_message)
//   })
// }

// // Set up our login function
// function login () {
//   // Get all our input fields
//   email = document.getElementById('email').value
//   password = document.getElementById('password').value

//   // Validate input fields
//   if (validate_email(email) == false || validate_password(password) == false) {
//     alert('Email or Password is Outta Line!!')
//     return
//     // Don't continue running the code
//   }

//   auth.signInWithEmailAndPassword(email, password)
//   .then(function() {
//     // Declare user variable
//     var user = auth.currentUser

//     // Add this user to Firebase Database
//     var database_ref = database.ref()

//     // Create User data
//     var user_data = {
//       last_login : Date.now()
//     }

//     // Push to Firebase Database
//     database_ref.child('users/' + user.uid).update(user_data)

//     // DOne
//     alert('User Logged In!!')
//     window.location.href= "t_dashboard.html";

//   })
//   .catch(function(error) {
//     // Firebase will use this to alert of its errors
//     var error_code = error.code
//     var error_message = error.message

//     alert(error_message)
//   })
// }




// // Validate Functions
// function validate_email(email) {
//   expression = /^[^@]+@\w+(\.\w+)+\w$/
//   if (expression.test(email) == true) {
//     // Email is good
//     return true
//   } else {
//     // Email is not good
//     return false
//   }
// }

// function validate_password(password) {
//   // Firebase only accepts lengths greater than 6
//   if (password < 6) {
//     return false
//   } else {
//     return true
//   }
// }

// function validate_field(field) {
//   if (field == null) {
//     return false
//   }

//   if (field.length <= 0) {
//     return false
//   } else {
//     return true
//   }
// }


var firebaseConfig = {
  apiKey: "AIzaSyAtDR1uMypbur1SgItz6zVFeKP5ebRapY0",
  authDomain: "sentify-web.firebaseapp.com",
  databaseURL: "https://sentify-web-default-rtdb.firebaseio.com",
  projectId: "sentify-web",
  storageBucket: "sentify-web.appspot.com",
  messagingSenderId: "178179484502",
  appId: "1:178179484502:web:9e859074982c5a119604f7",
  measurementId: "G-N29DQTKBF7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
// const auth = getAuth();
const database = firebase.database();

function login() {
  var email = document.getElementById('t_user').value;
  var password = document.getElementById('t_pass').value;

  // Validate input fields
  if (validate_email(email) === false || validate_password(password) === false) {
    alert('Email or Password is invalid!');
    return;
  }

  // Log in the user with their credentials
  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // User signed in successfully
      var user = auth.currentUser;
      alert("Logging in...");
      var database_ref = database.ref();
      // Create User data
      var user_data = {
        last_login: Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data);

      // Done
      alert('User Logged In!');
      // Redirect or do other actions here
    })
    .catch(function (error) {
      // Handle errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Login error:', errorMessage);
      alert(errorMessage);
    });
}

// Google Sign-In function
function googleSignUp() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // User signed in successfully
      var user = result.user;
      console.log('User signed in:', user);
      alert('Google Sign-up successful!');
      // Send google info to server and redirect to index page
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // Handle errors
      var errorMessage = error.message;
      console.error('Google Sign-up error:', errorMessage);
      alert('Google Sign-up failed. Please try again.');
    });
}

function resetPassword() {
  var email = document.getElementById('user').value;

  // Send password reset email
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent successfully
      alert('Password reset email sent. Check your inbox.');
    })
    .catch((error) => {
      // Handle errors
      var errorMessage = error.message;
      console.error('Password reset error:', errorMessage);
      alert('Failed to send password reset email. Please try again.');
    });
}

// Validate Functions
function validate_email(email) {
  var expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expression.test(email);
}

function validate_password(password) {
  // Firebase requires passwords to be at least 6 characters long
  return password.length >= 6;
}

function validate_field(field) {
  return field.trim() !== '';
}