app.filter('Timestamp', function() {
    //Convert seconds to a readable video timestamp.
    return function(input, decimal) {
        input = input || '';
        var date = new Date(null);
        date.setSeconds(input); //Set date based on Seconds.
        return date.toISOString().substr(11, 8) + (decimal ? ("."+parseInt((input % 1)*100)):""); //Get time segment of date.
    };
});
app.filter('Reverse-Timestamp', function() {
    //Convert seconds to a readable video timestamp.
    return function(input, decimal) {
        input = input || '';
        var timeArr = input.split(':'), //Array of hours, minutes, and seconds.
            s = 0, //Seconds total
            m = 1; //Multiplier
        while (timeArr.length > 0) { //Iterate through time segments starting from the seconds,
            s += m * timeArr.pop(); //multiply as  appropriate, and add to seconds total,
            m *= 60;				//increase multiplier.
        }
        return s;
    };
});