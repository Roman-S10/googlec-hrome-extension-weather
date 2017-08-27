;window.onload = function(){

	var icons = {
        "01d": "pe-7w-sun",
        "01n": "pe-7w-moon",
        "02d": "pe-7w-cloud-sun",
        "02n": "pe-7w-cloud-moon",
        "03d": "pe-7w-cloud",
        "03n": "pe-7w-cloud",
        "04d": "pe-7w-cloud",
        "04n": "pe-7w-cloud",
        "09d": "pe-7w-rain-alt",
        "09n": "pe-7w-rain-alt",
        "10d": "pe-7w-rain-alt-sun",
        "10n": "pe-7w-rain-alt-moon",
        "11d": "pe-7w-lightning-rain",
        "11n": "pe-7w-lightning-rain",
        "13d": "pe-7w-snow-alt",
        "13n": "pe-7w-snow-alt",
        "50d": "pe-7w-fog",
        "50n": "pe-7w-fog"
	};

	var days = [
			'Воскресенье',
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота'
		],
        months = [
        	'Января',
			'Февраля',
			'Марта',
			'Апреля',
			'Мая',
			'Июня',
			'Июля',
			'Августа',
			'Сентября',
			'Октября',
			'Ноября',
			'Декабря'
		];

	navigator.geolocation.getCurrentPosition(function(position) {

  		var latitude = position.coords.latitude,
  			longitude = position.coords.longitude,
  			url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude
			+ '&lon=' + longitude
			+ '&lang=ru&units=metric&appid=1b48826496992f5818d4b33db18d8fc3',
			xhr = new XMLHttpRequest(),
			icon = document.querySelector('.weather-icon i'),
			temp = document.querySelector('.temp'),
			description = document.querySelector('.description'),
			humidity = document.querySelector('.humidity span'),
			pressure = document.querySelector('.pressure .pressure__num'),
			wind = document.querySelector('.wind span'),
			sunrise = document.querySelector('.sunrise span'),
			sunset = document.querySelector('.sunset span'),
            headerDay = document.querySelector('.content-header .day'),
            headerDate = document.querySelector('.content-header .date'),
			mmHg = 0.75006375541921;// 1 hPa = 0.75006375541921 mmHg

	xhr.open('GET', url, true);
	xhr.send();

	xhr.onreadystatechange = function() {

	  if (xhr.readyState == 4 && xhr.status == 200) {
	    var weather = JSON.parse(xhr.response),
			dt = new Date(weather.dt * 1000),
			date = dt.getDate(),
			day = days[dt.getDay()],
            month = months[dt.getMonth()];

	    headerDay.innerHTML = day;
	    headerDate.innerHTML = date + ' ' + month;
	    icon.className = icons[weather.weather[0].icon] + ' pe-4x';
	    icon.alt = weather.weather[0].description;
	    temp.innerHTML = Math.round(weather.main.temp) + '°C';
	    description.innerHTML = weather.weather[0].description;
	    humidity.innerHTML = weather.main.humidity +' %';
	    pressure.innerHTML = Math.round(weather.main.pressure * mmHg);
	    wind.innerHTML = weather.wind.speed + ' м/с';

	    var sunriseTime = new Date(weather.sys.sunrise * 1000),
			sunriseHours = (sunriseTime.getHours() < 10) ? '0' + sunriseTime.getHours() : sunriseTime.getHours(),
            sunriseMin = (sunriseTime.getMinutes() < 10) ? '0' + sunriseTime.getMinutes() : sunriseTime.getMinutes();

	    sunrise.innerHTML = sunriseHours + ':' + sunriseMin;

	    var sunsetTime = new Date(weather.sys.sunset * 1000),
			sunsetHours = sunsetTime.getHours(),
			sunsetMin = sunsetTime.getMinutes();

	    sunset.innerHTML = sunsetHours + ':' + sunsetMin;

	  }

	}
	});

};