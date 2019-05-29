// Upload file
const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('fileButton');
const uploadMsg = document.getElementById('uploadMsg');

SetUploadMsg = function(p, msg) {
    p.innerHTML = msg;

    if (msg == '')
    {
        p.classList.add('hide');
    } else {
        p.classList.remove('hide');
    }
}

// Listen for file selection
fileButton.addEventListener('change', function(e) {
    // Get file
    var file = e.target.files[0];
    
    // Create a storage ref
    var storageRef = firebase.storage().ref('sweet_gifs/' + file.name);
    
    // Upload file
    var task = storageRef.put(file);

    SetUploadMsg(uploadMsg, 'Uploading');

    // Update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var perc = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = perc;
        },
        function error(err) {
            SetUploadMsg(uploadMsg, 'Image Upload Error');
        },
        function complete() {
            SetUploadMsg(uploadMsg, 'Image Uploaded');
        }
    );
});