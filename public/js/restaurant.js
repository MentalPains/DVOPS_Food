//This function is to call the restaurants api and get all the restaurants
//that is showing in Shaw Theatres for Showing Now and Coming Soon
function getRestaurantData() {
    var restaurant = '/arestaurant';
    var request = new XMLHttpRequest();
    request.open('GET', restaurant, true);
    //This function will be called when data returns from the web api    
    request.onload = function () {
        //get all the restaurants records into our review array        
        review_array = JSON.parse(request.responseText);
        //Fetch the comments as well        
        //fetchComments();
        console.log(review_array)
        temp_array = review_array;
        displayRestaurants(category);
    };

    //This command starts the calling of the restaurants web api    
    request.send();
}

function getFilterData() {
    //alert(type);
    temp_array = review_array;
    var restaurant_name = $("#restaurant_name").val();
    var cuisine = $("#cuisine").val();
    var location = $("#location").val();
    var rating = $("#rating").val();
    var price = $("#price").val();

    console.log(cuisine);

    if (restaurant_name != "") {


        var data = temp_array,

            filterBy = {restaurant_name: [restaurant_name]},
            result = data.filter(function (o) {
                return Object.keys(filterBy).every(function (k) {
                    return filterBy[k].some(function (f) {
                        //return o[k].indexOf(f) > -1;
                        return o[k].toLowerCase().indexOf(f.toLowerCase()) > -1;
                        //return o[k] === f;
                    });
                });
            });
        console.log(result);
        temp_array = result;
        console.log(temp_array);
    }

    if (cuisine != "") {
        var data = temp_array,

            filterBy = {cuisine: [cuisine]},
            result = data.filter(function (o) {
                return Object.keys(filterBy).every(function (k) {
                    return filterBy[k].some(function (f) {
                        return o[k] === f;
                    });
                });
            });
        console.log(result);
        temp_array = result;
        console.log(temp_array);
    }

    if (location != "") {
        var data = temp_array,

            filterBy = {location: [location]},
            result = data.filter(function (o) {
                return Object.keys(filterBy).every(function (k) {
                    return filterBy[k].some(function (f) {
                        return o[k] === f;
                    });
                });
            });
        console.log(result);
        temp_array = result;
        console.log(temp_array);
    }
    if (rating != "") {
        var data = temp_array,

            filterBy = {rating: [rating]},
            result = data.filter(function (o) {
                return Object.keys(filterBy).every(function (k) {
                    return filterBy[k].some(function (f) {
                        return o[k] === f;
                    });
                });
            });
        console.log(result);
        temp_array = result;
        console.log(temp_array);
    }

    if (price != "") {
        if (parseInt(price, 10) == 5) {
            start_price = 1;
            end_price = 5;

        } else if (parseInt(price, 10) == 10) {
            start_price = 5;
            end_price = 10;

        } else if (parseInt(price, 10) == 20) {
            start_price = 10;
            end_price = 20;

        } else if (parseInt(price, 10) == 40) {
            start_price = 20;
            end_price = 40;
        } else {
            start_price = 40;
            end_price = 1000;
        }
        var data = temp_array;
        var result = [[]];
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if ((parseInt(data[i].price, 10) >= start_price) && (parseInt(data[i].price, 10) < end_price)) {
                console.log(data[i]);
                result[count] = data[i];
                count++;
            }
        }
        if (count > 0){
            temp_array = result;
        }else {
            temp_array = "";
        }
        //console.log(result);


        console.log("after");
        console.log(result);
    }


    displayRestaurants(category);
}

function displayRestaurants(category) {
    var table = document.getElementById("restaurantTable");
    var foodCount = 0;
    var message = "";

    table.innerHTML = "";
    totalrestaurants = temp_array.length;
    for (var count = 0; count < totalrestaurants; count++) {
        //if (review_array[count].availability == category) {
        var id = temp_array[count].Restaurant_id;
        var thumbnail = temp_array[count].image;
        var restaurant_name = temp_array[count].restaurant_name;
        var cuisine = temp_array[count].cuisine;
        var cell = '<div class="col-md-3" style="margin: 5px;"><img class="card-img-top" src="./images/restaurant/' + thumbnail + '" alt="Card image cap" />' +
            '<div class="card-body" style="border:1px solid #d9d9d9">' +
            '<span><strong>' + restaurant_name + '</strong></span><br />' +
            '<span>' + cuisine + '</span>' +
            '<button style="position: absolute; right: 0; bottom: 0; margin-right: 20px; border: 1px solid gray; border-radius: 5px; background-color: #ffffff; " value="' + id + '" data-toggle="modal" ' +
            'data-target="#commentModal" class="card-title" onClick="showDetails(this.value)"> More ... </button>' +
            '</div>' +
            '</div> ';
        table.insertAdjacentHTML('beforeend', cell);
        foodCount++;
        //}
    }

    message = foodCount + " restaurants " + category;
    //document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";


}


//This function is to display the "Now Showing" restaurants
function listNowShowingRestaurants() {
    category = "Now Showing";
    displayRestaurants(category);
    document.getElementById("nowMenu").classList.add("active");
    document.getElementById("comingMenu").classList.remove("active");
    document.getElementById("aboutMenu").classList.remove("active");
}

//This function is to display the individual restaurants details
//whenever the user clicks on "See More"
function showMovieDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("movieTitle").textContent = review_array[item].title;
    document.getElementById("moviePoster").src = review_array[item].poster;
    document.getElementById("genre").textContent = review_array[item].genre;
    document.getElementById("director").textContent = review_array[item].director;
    document.getElementById("cast").textContent = review_array[item].cast;
    document.getElementById("release").textContent = review_array[item].release;
    document.getElementById("advice").textContent = review_array[item].advice;
    document.getElementById("story").textContent = review_array[item].story;
    document.getElementById("trailer1").src = review_array[item].video1;
    document.getElementById("trailer2").src = review_array[item].video2;
}

//This function opens a new window/tab and loads the
//particular restaurant in the website
function buyTicket() {
    window.open(review_array[currentIndex].buy, "_blank");
}

function showDetails(value) {

    $("#restaurant_id").val(value);

    var restaurant = '/arestaurant/' + value;
    var request = new XMLHttpRequest();
    var n_rating;
    request.open('GET', restaurant, true);
    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the restaurants records into our review array
        review_array = JSON.parse(request.responseText);

        console.log(review_array) // output to console
        for (var count = 0; count < review_array.length; count++) {
            if (count == 0) {
                n_rating = review_array[count].rating;
                $("#locations").text("Location 1: " + review_array[count].location1);
                $("#restaurant_details").text(review_array[count].description);
                $("#opening_hours").text("Opening hours: " + review_array[count].opening_hours1);
                $("#contact_number").text("Phone Number: " + review_array[count].phone_number1);


                $('#restaurant_image').attr('src', "images/restaurant/" + review_array[count].image)
            } else {
                $("#locations2").text("Location 2: " + review_array[count].location1);
            }
        }
        var star = "";
        for (var j = 1; j <= n_rating; j++) {
            star += '<i class="fa fa-star" style="color: #fca503;"></i>&nbsp;';
        }
        console.log(star);
        $("#star_rating").html(star);
    };
    fetchComments(value);
    request.send();
}


