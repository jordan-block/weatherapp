$('document').ready(function() {
    var getLocation = function(location) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBUOfIfVpDCIIYz9n7cCbMpHPD3msBZ_ig`,
            success: function( response ) {
                console.log('my location data',response);
                var locationCoordinates = response.results[0].geometry.location
                var location = [response.results["0"].formatted_address]
                $('.location').text(location);
                getWeather(locationCoordinates);
            }
        })
    }
    
    var getWeather = function(coordinates) {
        $.ajax({ 
            url: `https://api.darksky.net/forecast/b21af5ff7a48fce4e108ebf295503d51/${coordinates.lat},${coordinates.lng}`,
            jsonp: "callback",
            dataType: "jsonp",
            success: function(response) {
                console.log('my weather data',response);
                var daily = response.daily.data;
                appendDailyWeather(daily)
                var summary = [response.currently.summary]
                $('.Summary').text(summary);
                var temperature = [response.currently.temperature]
                $('.Temperature').text(Math.round(temperature) + "\xB0");
            }
            });
    };
    
    $('#submitBtn').click(function() {
        getLocation($('#target').val());
    })
    var appendDailyWeather = function(days) {
        days.forEach(function(awesomeDay){
            var dayElement = 
            `<div class="day">
                <div class="weekday">${moment.unix(awesomeDay.time).format('dddd')}
                </div>
                <div class="temp">
                    <div class="temperature-high">${Math.round(awesomeDay.temperatureMax) + "\xB0"}</div>
                    <div class="temperature-low">${Math.round(awesomeDay.temperatureMin) + "\xB0"}</div>
                </div>
                <div class="precip">${(awesomeDay.precipProbability.toFixed(1)) *100 +"%" + " Precipitation"}</div>
                <div class="description">${awesomeDay.summary}</div>
            </div>`
            $('.daily-data').append(dayElement)
            console.log('every awesome day', awesomeDay)
        })
    };
});
// $('temperature-high').replaceWith();
//        $('temperature-low').replaceWith();
  //      $('precip').replaceWith();
//        $('description').repleaceWith();
//        
//         ('.daily-data').empty('temperature-high')
//            ('.daily-data').empty('temperature-low')
//            ('.daily-data').empty('precip')
//            ('.daily-data').empty('description')
        