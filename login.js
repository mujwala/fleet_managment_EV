document.getElementById("loginBtn").addEventListener("click", async function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email && password) {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json(); // Get the response as JSON

            if (response.ok) {
                alert(result.message); // Alert with success message

                // Store user data in local storage (or use another method to persist it)
                localStorage.setItem('userData', JSON.stringify({
                    name: result.name,
                    username: result.username,
                    role: result.role
                }));

                // Redirect based on user role
                if (result.role === 'Fleet Manager') {
                    window.location.href = "index.html"; // Redirect to Fleet Manager dashboard
                } else if (result.role === 'Driver') {
                    window.location.href = "driver-dashboard.html"; // Redirect to Driver dashboard
                } else {
                    alert("Invalid role.");
                }
            } else {
                alert(result); // Show error message from server
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Failed to log in. Please try again later.");
        }
    } else {
        alert("Please enter your email and password.");
    }
});

document.getElementById("createAccountBtn").addEventListener("click", function() {
    window.location.href = "register.html"; // Redirect to registration page
});