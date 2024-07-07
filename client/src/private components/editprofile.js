function saveProfile() {
    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;
    const profileImageURL = document.getElementById('profileImageURL').value;

    // Save data to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('bio', bio);
    localStorage.setItem('profileImageURL', profileImageURL);

    // Redirect back to the profile page or indicate success
    window.location.href = 'profile.html'; // Make sure this path is correct
}

document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const bio = localStorage.getItem('bio');
    const profileImageURL = localStorage.getItem('profileImageURL');

    if (username) {
        document.getElementById('username').value = username;
    }
    if (bio) {
        document.getElementById('bio').value = bio;
    }
    if (profileImageURL) {
        document.getElementById('profileImageURL').value = profileImageURL;
    }
});
