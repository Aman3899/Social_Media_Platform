function editProfile() {
    const newUsername = prompt("Enter your new username:", "account");
    const newBio = prompt("Update your bio:", "Your bio here...");
    const newImageURL = prompt("Enter URL for your new profile picture:", "https://via.placeholder.com/150");

    if (newUsername) {
        document.getElementById('usernameDisplay').textContent = newUsername;
    }

    if (newBio) {
        document.getElementById('bioDisplay').textContent = newBio;
    }

    if (newImageURL) {
        const imgElement = document.getElementById('profileImage');
        imgElement.onerror = () => {
            alert('Failed to load image. Please try a different URL.');
            imgElement.src = 'https://via.placeholder.com/150'; // Fallback image
        };
        imgElement.src = newImageURL;
    }
}


function shareProfile() {
    alert("Share profile clicked");
}

function openGrid() {
    setActiveButton('grid');
}

function openVideo() {
    setActiveButton('video');
}

function openCamera() {
    setActiveButton('camera');
}

function setActiveButton(buttonType) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the selected button
    switch (buttonType) {
        case 'grid':
            document.querySelector('.nav-button:nth-child(1)').classList.add('active');
            break;
        case 'video':
            document.querySelector('.nav-button:nth-child(2)').classList.add('active');
            break;
        case 'camera':
            document.querySelector('.nav-button:nth-child(3)').classList.add('active');
            break;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const bio = localStorage.getItem('bio');
    const profileImageURL = localStorage.getItem('profileImageURL');

    if (username) {
        document.getElementById('usernameDisplay').textContent = username;
    }
    if (bio) {
        document.getElementById('bioDisplay').textContent = bio;
    }
    if (profileImageURL) {
        document.getElementById('profileImage').src = profileImageURL;
    }
});
function setActiveButton(buttonId) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-icon').forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the clicked button
    document.getElementById(buttonId).classList.add('active');
}

function setActiveButton(buttonId) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-icon').forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the clicked button
    document.getElementById(buttonId).classList.add('active');
}

document.getElementById('homeBtn').addEventListener('click', function() {
    setActiveButton('homeBtn');
});
document.getElementById('searchBtn').addEventListener('click', function() {
    setActiveButton('searchBtn');
});
document.getElementById('videoBtn').addEventListener('click', function() {
    setActiveButton('videoBtn');
});
document.getElementById('settingsBtn').addEventListener('click', function() {
    setActiveButton('settingsBtn');
});


