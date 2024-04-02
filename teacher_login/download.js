// Assuming you have initialized Firebase and Firestore
// Initialize Firebase
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
  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  
  // Get a reference to the Firestore database
  var db = firebase.firestore();
  
  // Function to handle download on button click
  function downloadFiles() {
        const storageRef = firebase.storage().ref("files/");
    
        storageRef.listAll().then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then((url) => {
                    // Create a link element for each file and trigger download
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = itemRef.name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch((error) => {
                    console.error("Error downloading file:", error);
                });
            });
        }).catch((error) => {
            console.error("Error listing files:", error);
        });
    }
  