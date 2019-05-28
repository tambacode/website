// Upload file
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

// Listen for file selection
fileButton.addEventListener('change', function(e) {
    // Get file
    var file = e.target.files[0];
    
    // Create a storage ref
    var storageRef = firebase.storage().ref('sweet_gifs/' + file.name);
    
    // Upload file
    var task = storageRef.put(file);

    // Update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var perc = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = perc;
        },
        function error(err) {
            console.log("IMAGE UPLOAD ERROR");
        },
        function complete() {
            console.log("IMAGE UPLOADED");
        }
    );
});