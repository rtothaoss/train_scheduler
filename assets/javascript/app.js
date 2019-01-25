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
    var childTrainTime =    (childSnapshot.val().firstTrainTime);

    // making sure its formatted to military time
    var militaryTime = moment(childTrainTime, "HH:mm");
    
    // current time
    var currentTime = moment();
    console.log('Current time ' + moment(currentTime).format('hh:mm'));
    
    // difference between first train and current time
    var timeDifference = moment().diff(moment(militaryTime), 'minutes');
    console.log('The difference in time between first train and current time ' + timeDifference + ' minutes')
    
    // use of modulus to find time apart between trains
    var timeApart = timeDifference % childFrequency;
    console.log('Time apart ' + timeApart)

    // this finds minutes until next train
    var minutesTilNextTrain = childFrequency - timeApart;
    console.log('Minutes until next train ' + minutesTilNextTrain);


    // adding the minutes until next train to current time
    var timeTilNextTrain = moment().add(minutesTilNextTrain, "minutes");
    
    // formatting minutes until next train into normal time instead of minutes
    var formattedNextTime = moment(timeTilNextTrain).format('hh:mm a')
    
    
    var createNewRow = $('<tr>');

    createNewRow.append('<td>' + childTrainName + '</td>')
    createNewRow.append('<td>' + childDestination + '</td>')
    createNewRow.append('<td>' + childFrequency + '</td>')
    createNewRow.append('<td>' + formattedNextTime + '</td>')
    createNewRow.append('<td>' + minutesTilNextTrain + '</td>')

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