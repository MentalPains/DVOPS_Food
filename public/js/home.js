function viewReviews() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-review', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = ''
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + response[i].name + '</td>' +
                '<td>' + response[i].description + '</td>' +
                '<td>' + response[i].owner + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editReview(\'' +
                JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit </button> ' +
                '<button type="button" class="btn btn-danger" onclick="deleteReview(' +
                response[i].id + ')"> Delete</button>' +
                '</td>' +
                '</tr>'
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}

function addReviews() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.owner = sessionStorage.getItem("email");
    console.log("Name:", jsonData.name);
    console.log("Description:", jsonData.description);
    if (jsonData.name == "" || jsonData.description == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/add-review", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Review: ' +
                jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            window.location.href = 'home.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add review!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send(JSON.stringify(jsonData));
    console.log(jsonData);
}

function editReview(data) {
    var selectedReview = JSON.parse(data);
    document.getElementById("editName").value = selectedReview.name;
    document.getElementById("editDescription").value = selectedReview.description;
    document.getElementById("updateButton").setAttribute("onclick", 'updateReview("' +
        selectedReview.id + '")');
    $('#editReviewModal').modal('show');
}
function updateReview(id) {
    console.log(id)
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("editName").value;
    jsonData.description = document.getElementById("editDescription").value;
    if (jsonData.name == ""  || jsonData.description == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-review/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Review modified successfully!") {
            document.getElementById("editMessage").innerHTML = 'Edited Review: ' +
                jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class",
                "text-success");
            window.location.href = 'home.html';
        }
        else {
            document.getElementById("editMessage").innerHTML = 'Unable to edit review!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}
function deleteReview(selectedId) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-review/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Review deleted successfully!") {
            window.location.href = 'home.html';
        }
        else {
            alert('Unable to delete review!');
        }
    };
    request.send();
}
