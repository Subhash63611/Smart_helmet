const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings

const axElement = document.getElementById("ax");
const ayElement = document.getElementById("ay");
const azElement = document.getElementById("az");
const gxElement = document.getElementById("gx");
const gyElement = document.getElementById("gy");
const gzElement = document.getElementById("gz");
const ampElement = document.getElementById("amp");
const tmpElement = document.getElementById("tmp");
const wrnElement = document.getElementById("warningmsg");


// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    // var uid = user.uid;

    // Database paths (with user UID)
    
    var axdbpath = "mpu_data/AcX";
    var aydbpath = "mpu_data/AcY";
    var azdbpath = "mpu_data/AcZ";
    var gxdbpath = "mpu_data/GyX";
    var gydbpath = "mpu_data/GyY";
    var gzdbpath = "mpu_data/GyZ";
    var Ampdb = "mpu_data/Amp";
    var Tmpdb = "mpu_data/Tmp";
  


    // Database references
   
    var axRef = firebase.database().ref().child(axdbpath);
    var ayRef = firebase.database().ref().child(aydbpath);
    var azRef = firebase.database().ref().child(azdbpath);
    var gxRef = firebase.database().ref().child(gxdbpath);
    var gyRef = firebase.database().ref().child(gydbpath);
    var gzRef = firebase.database().ref().child(gzdbpath);
    var AmpRef = firebase.database().ref().child(Ampdb);
    var TmpRef = firebase.database().ref().child(Tmpdb);

let previousAxValue = null;

// Function to check if the ax value has changed
function hasAxValueChanged(currentValue) {
  if (previousAxValue !== null && currentValue !== previousAxValue) {
    return true;
  }
  return false;
}

// Function to blink the warning message
function blinkWarningMsg() {
  wrnElement.innerText = "Fall Detected!!!";
  let visibility = true;
  const blinkInterval = setInterval(function() {
    wrnElement.style.visibility = visibility ? "visible" : "hidden";
    visibility = !visibility;
  }, 500); // Blink every 500 milliseconds

  setTimeout(function() {
    clearInterval(blinkInterval);
    wrnElement.style.visibility = "hidden";
  }, 15000); // Hide after 15 seconds
}

axRef.on('value', snap => {
  axElement.innerText = snap.val().toFixed(2);
  var x = (new Date()).getTime();
  y = parseFloat(snap.val().toFixed(2));
  if (hasAxValueChanged(y)) {
    blinkWarningMsg();
  }
  // Update the previous ax value
  previousAxValue = y;
});

ayRef.on('value', snap => {
  ayElement.innerText = snap.val().toFixed(2);
  var x = (new Date()).getTime(),
  y= parseFloat(snap.val().toFixed(2));
});

azRef.on('value', snap => {
  azElement.innerText = snap.val().toFixed(2);
  var x = (new Date()).getTime(),
  y= parseFloat(snap.val().toFixed(2));
});

gxRef.on('value', snap => {
  gxElement.innerText = snap.val().toFixed(2);
  var x = (new Date()).getTime(),
  y= parseFloat(snap.val().toFixed(2));
});

gyRef.on('value', snap => {
  gyElement.innerText = snap.val().toFixed(2);
  var x = (new Date()).getTime(),
  y= parseFloat(snap.val().toFixed(2));
});

gzRef.on('value', snap => {
  gzElement.innerText = snap.val().toFixed(2);
  var x = (new Date()).getTime(),
  y= parseFloat(snap.val().toFixed(2));
});

AmpRef.on('value', snap => {
  var x = (new Date()).getTime(),
  y= parseFloat(snap.val().toFixed(2));
  if(charte.series[0].data.length > 40) {
    charte.series[0].addPoint([x, y], true, true, true);
  } else {
    charte.series[0].addPoint([x, y], true, false, true);
  }
});


  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}


setInterval(function ( ) {
  var x = (new Date()).getTime(),
  y=0;
     // y = parseFloat(this.responseText);
  if(charte.series[0].data.length > 40) {
    charte.series[0].addPoint([x, y], true, true, true);
  } else {
    charte.series[0].addPoint([x, y], true, false, true);
  }
}, 1000 ) ;




