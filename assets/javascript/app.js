var config = {
    apiKey: "AIzaSyAOS0hXmjXWO-o1y2160UDv0bCazmefwAI",
    authDomain: "train-scheduler-bbe1b.firebaseapp.com",
    databaseURL: "https://train-scheduler-bbe1b.firebaseio.com",
    projectId: "train-scheduler-bbe1b",
    storageBucket: "train-scheduler-bbe1b.appspot.com",
    messagingSenderId: "967245042012"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


database.ref().on('child_added', function(childSnapshot){

    var childTrainName =    (childSnapshot.val().trainName);
    var childDestination =  (childSnapshot.val().destination);
    var childFrequency =    (childSnapshot.val().frequency);
    
    var createNewRow = $('<tr>');

    createNewRow.append('<td>' + childTrainName + '</td>')
    createNewRow.append('<td>' + childDestination + '</td>')
    // createNewRow.append('<td>' + 'placeholder' + '</td>')
    // createNewRow.append('<td>' + 'placeholder' + '</td>')
    createNewRow.append('<td>' + childFrequency + '</td>')

    $('.table').append(createNewRow)
})











$('#submitBtn').on('click', function(){
    event.preventDefault();
    
    // var createNewRow = $('<tr>');

    var trainName = $('#trainNameForm').val();
    var destination = $('#destinationForm').val();
    var frequency = $('#frequencyForm').val();
    var firstTrainTime = $('#firstTrainTimeForm').val();
    

    // createNewRow.append('<td>' + trainName + '</td>')
    // createNewRow.append('<td>' + destination + '</td>')
    // // createNewRow.append('<td>' + 'placeholder' + '</td>')
    // // createNewRow.append('<td>' + 'placeholder' + '</td>')
    // createNewRow.append('<td>' + frequency + '</td>')

    // $('.table').append(createNewRow)

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });


})