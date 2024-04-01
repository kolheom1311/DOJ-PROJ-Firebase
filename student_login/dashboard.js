var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

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

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Intercept form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Call upload function
  uploadFile();
});

function uploadFile() {
  var file = document.getElementById('myFile').files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  // Storage reference
  var storageRef = storage.ref('files/' + file.name);

  // Upload file
  var uploadTask = storageRef.put(file);

  // Monitor upload progress
  uploadTask.on('state_changed', 
    function(snapshot){
      // Observe state change events such as progress, pause, and resume
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    function(error) {
      // Handle unsuccessful uploads
      console.error('Upload error:', error);
      alert('File upload failed. Please try again.');
    }, 
    function() {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // Upload successful, get the download URL
        console.log('File available at', downloadURL);
        
        // Get current user
        var user = auth.currentUser;

        // Update user's database with file download URL
        var databaseRef = database.ref('users/' + user.uid);
        databaseRef.update({
          fileURL: downloadURL
        });

        alert('File uploaded successfully!');
      });
    }
  );
}