document.getElementById("registerBtn").addEventListener("click", async function () {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    // Track missing fields
    let missingFields = [];

    if (!name) missingFields.push("Name");
    if (!username) missingFields.push("Username");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    if (!confirmPassword) missingFields.push("Confirm Password");
    if (!role) missingFields.push("Role");

    // Show missing fields message if any
    if (missingFields.length > 0) {
        alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
        return;
    }

    // Validate email format
    const emailValidationResult = isValidEmail(email);
    if (!emailValidationResult.isValid) {
        alert(emailValidationResult.message);
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check password strength before submission
    const passwordValidationResult = isStrongPassword(password);
    if (!passwordValidationResult.isValid) {
        alert(passwordValidationResult.message);
        return;
    }

    // Check username availability
    try {
        const usernameResponse = await fetch(`http://localhost:3000/check-username?username=${encodeURIComponent(username)}`);
        const usernameData = await usernameResponse.json();
        
        if (!usernameData.available) {
            alert("Username not available");
            return;
        }
    } catch (error) {
        console.error("Error checking username:", error);
        alert("Failed to check username availability.");
        return;
    }

    // Send data to the backend
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, email, password, role }) // Ensure 'username' is included here
        });


        const result = await response.text();
        alert(result);

        if (response.ok) {
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register. Please try again later.");
    }
});

// Email validation function
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return { isValid: false, message: "Please enter a valid email address." };
    }
    return { isValid: true, message: "Email is valid." };
}

// Password strength validation function
function isStrongPassword(password) {
    let requirements = [];

    if (password.length < 8) {
        requirements.push("Minimum length of password should be 8");
    }
    if (!/[A-Z]/.test(password)) {
        requirements.push("at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        requirements.push("at least one lowercase letter");
    }
    if (!/\d/.test(password)) {
        requirements.push("at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        requirements.push("at least one special character");
    }

    if (requirements.length > 0) {
        return {
            isValid: false,
            message: `Password must meet the following requirements: ${requirements.join(", ")}.`
        };
    }

    return { isValid: true, message: "Password is strong." };
}

// Real-time password strength validation
document.getElementById("password").addEventListener("input", function() {
    const password = this.value;
    const strengthMessage = document.getElementById("passwordStrengthMessage");
    const passwordValidationResult = isStrongPassword(password);

    if (passwordValidationResult.isValid) {
        strengthMessage.textContent = passwordValidationResult.message;
        strengthMessage.style.color = "green";
    } else {
        strengthMessage.textContent = passwordValidationResult.message;
        strengthMessage.style.color = "red";
    }
});

// Real-time password match validation
document.getElementById("confirmPassword").addEventListener("input", function() {
    const password = document.getElementById("password").value;
    const confirmPassword = this.value;
    const matchMessage = document.getElementById("confirmPasswordMessage");
    
    if (password !== confirmPassword) {
        matchMessage.textContent = "Passwords do not match.";
        matchMessage.style.color = "red";
    } else {
        matchMessage.textContent = "Passwords match.";
        matchMessage.style.color = "green";
    }
});