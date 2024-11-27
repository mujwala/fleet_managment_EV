// Retrieve user data from local storage
const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
    document.getElementById("greeting-message").textContent = `Hi, ${userData.name}`;
    document.getElementById("username").textContent = userData.username;
    document.getElementById("role").textContent = userData.role;
} else {
    // Handle case where userData is not found (redirect to login, etc.)
    window.location.href = "login.html"; // Redirect to login if not logged in
}
