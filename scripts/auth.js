// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log("user logged in");
      console.log(user);
      setupUI(user);
      var uid = user.uid;
      console.log(uid);
    } else {
      console.log("user logged out");
      setupUI();
    }
   });
   
   // login
   const loginForm = document.querySelector('#login-form');
   loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = loginForm['input-email'].value;
    const password = loginForm['input-password'].value;
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the login modal & reset form
      loginForm.reset();
      console.log(email);
    })
    .catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("error-message").innerHTML = errorMessage;
      console.log(errorMessage);
    });
   });





   function showSignUpForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  }
  document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var email = document.getElementById("input-email-signup").value;
    var password = document.getElementById("input-password-signup").value;
    var confirmPassword = document.getElementById("input-password-confirm").value;
  
    if (password !== confirmPassword) {
      document.getElementById("signup-error-message").innerHTML = "Passwords do not match";
      return;
    }
  
    // Add your code to create a new user account here
  
  });
    
   
  // Get a reference to the signup form and its elements
const signupForm = document.querySelector('#signup-form');
const signupEmail = document.querySelector('#input-email-signup');
const signupPassword = document.querySelector('#input-password-signup');
const signupPasswordConfirm = document.querySelector('#input-password-confirm');

// Add an event listener to the signup form submit button
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the values entered by the user
  const email = signupEmail.value;
  const password = signupPassword.value;
  const passwordConfirm = signupPasswordConfirm.value;

  // Check if the passwords match
  if (password !== passwordConfirm) {
    document.querySelector('#signup-error-message').textContent = 'Passwords do not match';
    return;
  }

  // Use Firebase's createUserWithEmailAndPassword() method to create a new user account
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Clear the signup form and hide it
      signupForm.reset();
      signupForm.style.display = 'none';

      // Show the authentication bar and set the user details
      document.querySelector('#authentication-bar').style.display = 'block';
      document.querySelector('#authentication-status').textContent = 'Logged in as';
      document.querySelector('#user-details').textContent = userCredential.user.email;
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      document.querySelector('#signup-error-message').textContent = errorMessage;
    });
});








   // logout
   const logout = document.querySelector('#logout-link');
   logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
   });