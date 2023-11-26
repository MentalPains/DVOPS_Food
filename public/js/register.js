function register() {
    // Initialize variables
    var response = "";
    var jsonData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Check if any of the fields is empty
    if (jsonData.email === "" || jsonData.password === "" || confirmPassword === "") {
        document.getElementById("error").innerHTML = 'All fields are required!';
        return;
    } else if (jsonData.password !== confirmPassword) {
        document.getElementById("error").innerHTML = 'Passwords do not match!';
        return;
    }

    // Create an XMLHttpRequest object
    var request = new XMLHttpRequest();

    // Configure the request
    request.open("POST", "/register", true);
    request.setRequestHeader('Content-Type', 'application/json');

    // Define what happens on successful data submission
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);
        if (response.message === undefined) {
            window.location.href = 'index.html';
        } else {
            document.getElementById("error").innerHTML = 'Authentication failed!';
        }
    };

    // Handle errors during the request
    request.onerror = function () {
        document.getElementById("error").innerHTML = 'Error occurred during registration!';
    };

    // Send the request with the JSON data
    request.send(JSON.stringify(jsonData));
}
