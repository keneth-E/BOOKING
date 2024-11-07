// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addImageBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("roomForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const roomName = document.getElementById("roomName").value;
    const numGuests = document.getElementById("numGuests").value;
    const price = document.getElementById("price").value;
    
    // Get the image file
    const roomImage = document.getElementById("roomImage").files[0];
    
    // Create a FileReader to read the image file
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Create a room object
        const room = {
            roomName,
            numGuests,
            price,
            imageUrl: e.target.result // Set image URL to base64 string
        };

        // Get existing rooms from local storage
        let rooms = JSON.parse(localStorage.getItem('rooms')) || [];

        // Add the new room to the array
        rooms.push(room);

        // Save the updated array back to local storage
        localStorage.setItem('rooms', JSON.stringify(rooms));

        // Close the modal
        modal.style.display = "none";

        // Reset the form
        document.getElementById("roomForm").reset();

        // Display saved rooms
        displayRooms();
    };
    
    // Read the image file as a data URL
    reader.readAsDataURL(roomImage);
}

// Function to display saved rooms
function displayRooms() {
    const roomsContainer = document.getElementById('roomsContainer');
    
    // Clear previous content
    roomsContainer.innerHTML = '';

    // Get existing rooms from local storage
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    
    rooms.forEach((room) => {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room';
        
        const img = document.createElement('img');
        img.src = room.imageUrl; // Set image source
        
        roomDiv.innerHTML = 
            <strong>Room Name:</strong> ${room.roomName}
            <strong>Guests:</strong> ${room.numGuests}
            <strong>Price:</strong> $${room.price}
        ;
        
        roomDiv.appendChild(img);
        roomsContainer.appendChild(roomDiv);
    });
}

// Display saved rooms on page load
window.onload = function() {
    displayRooms();
}