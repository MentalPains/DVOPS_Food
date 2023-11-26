function fetchComments(c_id) {
    console.log(c_id);
    var comment_url = '/comments/' + c_id;
    console.log(comment_url);
    var request = new XMLHttpRequest();

    request.open('GET', comment_url, true);

    //This command starts the calling of the comments api
    request.onload = function () {
        //get all the comments records into our comments array
        $('#div_comment').empty();
        comment_array = JSON.parse(request.responseText);
        console.log(comment_array);
        var html = "";

        for (var i = 0; i < comment_array.length; i++) {
            var star = "";
            for (var j = 1; j <=comment_array[i].rating; j++) {
                star += '<i class="fa fa-star" style="color: #fca503;"></i>&nbsp;';
            }
            console.log("star" + star);
            html += '<tr>'+
                '<td style="width: 20%"><span>'+ star +'</span></td>'+
                '<td style="width: 25%">'+ comment_array[i].comments +'</td>'+
                '<td style="width: 25%">'+ comment_array[i].date +'</td>'+
                '<td style="width: 10%">&nbsp;&nbsp;&nbsp;'+ comment_array[i].username +'</td>'+
                '<td style="width: 20%"><button type="button" class="btn btn-info btn-sm col-md-6" style="float: left; padding-right: 15px;" id="edit_reveiw" value="' + comment_array[i].review_id+ '" data-toggle="modal" data-target="#commentModalEdit" class="card-title" onclick="commentEdit(this.value);"> edit </button>'+
                '<button type="button" class="btn btn-danger btn-sm col-md-6" style="float: left" id="delete_reveiw" value="' + comment_array[i].review_id+ '" onclick="deleteComment()"> delete </button></td></tr>';
        }
        console.log(html);
        $('#div_comment').append(html);
    };

    request.send();
}

//This function is to display all the comments of that restaurant
//whenever the user click on the "comment" button
function showRestaurantComments(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("review").textContent = "Review for " + restaurant_array[item].title;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].restaurant === restaurant_array[item].title) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedRestaurantId = restaurant_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + comment_array[i].review + "</p>               \
                                    <small>by " + comment_array[i].username + " @ " + comment_array[i].datePosted + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' ></i>";
            star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='" + i + "' onClick='editComment(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}


function newComment() {
    //Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("userComments").value = "";
    document.getElementById("username").value = "";
}

// Submit or send the new comment to the server to be added.
function addComment() {
    var comment = new Object();
    var comment_url = "/comments";
    comment.restaurant_id = document.getElementById("restaurant_id").value; // restaurant ID is required by server to create new comment
    comment.username = document.getElementById("user_id").value;  // Value from HTML input text
    comment.comments = document.getElementById("comments").value; // Value from HTML input text
    comment.timestamp = null; // Change the datePosted to null instead of taking the timestamp on the client side;
    comment.rating = document.getElementById("ratings").value;
    comment.pictures = null;
    console.log(comment);

    var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server

    postComment.setRequestHeader("Content-Type", "application/json");
    postComment.onload = function () {
        console.log("new comment sent");
        fetchComments(); // fetch all comments again so that the web page can have updated comments.     
    };
    // Convert the data in Comment object to JSON format before sending to the server.
    postComment.send(JSON.stringify(comment));
    $('#commentModal').modal('hide');
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let popcorn of popcorns) {
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}

//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or restaurant review
function commentEdit(x) {
    //alert(x);
    $("#comment_id").val('');
    $('#commentModal').modal('hide');
    var comm_id  = $("#edit_reveiw").val();
    var restaurant_id  = $("#restaurant_id").val();

    $("#comment_id").val(x);
    $("#restaurant_idEdit").val(restaurant_id);

    /*var item = element.getAttribute("item");

    currentIndex = item;

    document.getElementById("editusername").value = comment_array[item].username;
    document.getElementById("edituserComments").value = comment_array[item].comments;
    console.log(comment_array[item].rating);
    displayColorPopcorn('editpop', comment_array[item].rating);*/
}

//This function displayS the correct number of colored popcorn
//based on the restaurant rating that is given in the user comment
function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

//This function sends the Comment data to the server for updating
function updateComment() {
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {


        var comment = new Object();

var comment_url = "/comments";
        var c_id  = $("#comment_id").val();
        //var c_id  = "3";
        var r_id  =$("#restaurant_idEdit").val();

        var edit_comment_url = comment_url + "/" + c_id;

        comment.restaurant_id = document.getElementById("restaurant_idEdit").value; // restaurant ID is required by server to create new comment
        comment.username = document.getElementById("user_idEdit").value;  // Value from HTML input text
        comment.comments = document.getElementById("commentsEdit").value; // Value from HTML input text
        comment.timestamp = null; // Change the datePosted to null instead of taking the timestamp on the client side;
        comment.rating = document.getElementById("ratings").value;
        comment.pictures = null;
        console.log(comment);

        var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

        postComment.open("POST", edit_comment_url, true); //Use the HTTP POST method to send data to server

        postComment.setRequestHeader("Content-Type", "application/json");
        postComment.onload = function () {
            window.location.reload();
           // fetchComments(); // fetch all comments again so that the web page can have updated comments.
        };
        // Convert the data in Comment object to JSON format before sending to the server.
        postComment.send(JSON.stringify(comment));
        //$('#commentModal').modal('hide');


    }
}

//This function deletes the selected comment in a specific restaurant
function deleteComment(element) {
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var id  = $("#delete_reveiw").val();
        var restaurant_id  = $("#restaurant_id").val();
        console.log(id);
        var delete_comment_url = comment_url + "/" + id;
        var eraseComment = new XMLHttpRequest();
        eraseComment.open("DELETE", delete_comment_url, true);
        eraseComment.onload = function () {
            showDetails(restaurant_id);
        };
        eraseComment.send();
    }
}







