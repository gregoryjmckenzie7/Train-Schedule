// START CODING BELOW!!

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqAjpinWOBIoRRGU96AZBzyU3l24elhZk",
    authDomain: "train-schedule-4cdd8.firebaseapp.com",
    databaseURL: "https://train-schedule-4cdd8.firebaseio.com",
    projectId: "train-schedule-4cdd8",
    storageBucket: "train-schedule-4cdd8.appspot.com",
    messagingSenderId: "846386684330"
  };


firebase.initializeApp(config);

// Create a variable to reference the database
const database = firebase.database().ref('recentTrainAdded');
//const dbRef = firebase.database().ref('recentUserPush');

// Initial Values
var name = "";
var destination = "";
var trainTime = 0;
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;
var currentTime = moment();


// Capture Button Click
$("#add-train").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    frequency = $("#frequency-input").val().trim();
  

    //document.write(month + '-' + day + '-' + year);

    database.push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency

    });

});


// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.on("child_added", function(childSnapshot, prevChildKey) {
    // storing the snapshot.val() in a variable for convenience
    const sv = childSnapshot.val();

    // Console.loging the last user's data
    console.log(sv);

    var timeConverted = moment(trainTime, "hh:mm").subtract("1, years");
    var difference = currentTime.diff(moment(timeConverted), "minutes");
    var remainder = difference % frequency;
    var minutesAway = frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a");
    

    var row = $("<tr>");
    var train = [sv.name,
    sv.destination,
    sv.frequency,
    nextTrain,
    minutesAway
    ];
    for (var i = 0; i < train.length; i++) {
        row.append("<td>" + train[i] + "</td>");
    }
    $("#current-trains").append(row);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

