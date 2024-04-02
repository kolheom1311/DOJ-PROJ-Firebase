const firebaseConfig = {
    apiKey: "AIzaSyAtDR1uMypbur1SgItz6zVFeKP5ebRapY0",
    authDomain: "sentify-web.firebaseapp.com",
    databaseURL: "https://sentify-web-default-rtdb.firebaseio.com",
    projectId: "sentify-web",
    storageBucket: "sentify-web.appspot.com",
    messagingSenderId: "178179484502",
    appId: "1:178179484502:web:9e859074982c5a119604f7",
    measurementId: "G-N29DQTKBF7"
  };

  firebase.initializeApp(firebaseConfig);

  var fileText = document.querySelector(".fileText");
  var uploadPercentage = document.querySelector(".uploadPercentage");
  var progress = document.querySelector(".progress");
  var img = document.querySelector(".img");
  var percentVal;
  var fileItem;
  var fileName;

  function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
  }

  function uploadFiles() {
    const storageRef = firebase.storage().ref("files/" + fileName);
    const uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", (snapshot) => {
      console.log(snapshot);
    //   percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    alert("Upload complete")
    }, (error) => {
      console.log("Error is ", error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log("URL", url);

        if (url !== "") {
          img.setAttribute("src", url);
          img.style.display = "block";
        }
      })
    });
  }