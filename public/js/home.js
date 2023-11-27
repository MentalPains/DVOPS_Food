function addReviews() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.location = document.getElementById("location").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.owner = sessionStorage.getItem("email");
    if (jsonData.name == "" || jsonData.location == "" || jsonData.description == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/add-reviews", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Review: ' +
                jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("location").value = "";
            document.getElementById("description").value = "";
            window.location.href = 'home.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add review!'; document.getElementById("message").setAttribute("class", "text-danger");
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}