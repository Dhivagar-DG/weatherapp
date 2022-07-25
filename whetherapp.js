// URL
const apiKey = "3f5783fc68a5b8f1196069d21c79f7ff";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";


//Global Variable
let serachBtn = document.getElementById('searchBtn');


// Show weather details
function handleShow(response){

    let img = document.getElementById('weatherimg');
    let weathertxt = document.getElementById('weathertxt');
    let temp = document.getElementById('temp');
    let city = document.getElementById('cityname');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');
    let pressure = document.getElementById('pressure');
    console.log(response);
    img.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
    weathertxt.textContent = response.weather[0].description;
    city.textContent = response.name;
    temp.textContent = response.main.temp;
    wind.textContent = response.wind.speed;
    humidity.textContent = response.main.humidity;
    pressure.textContent = response.main.pressure;
}


// search location 
async function searchLocation(cityName){
    try{
        const data = await fetch(`${baseUrl}?q=${cityName}&appid=${apiKey}&units=metric`);
        if(!data.ok) throw new Error("Failed to fetch weather data");
        const response = await data.json();
        handleShow(response);
    }catch(err){
        alert(err.message);
    }
}


// Search buttoon event
serachBtn.addEventListener('click', function(){
    let cityName = document.getElementById("searchtxt").value;
    if ( cityName.replaceAll(" ","").length == 0) return alert("Please enter valid location name");
    searchLocation(cityName);
})


//Current location in default 
navigator.geolocation.getCurrentPosition(async (result)=>{
    try{

        let lon =  (result.coords).longitude;
        let lat =  (result.coords).latitude;

        const data = await fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if(!data.ok) throw new Error("Failed to fetch weather data");
        const response = await data.json();
        handleShow(response);

    }catch(err){
        alert(err.message);
    }
});

// Enter shortcut key
document.addEventListener("keypress", function(event){

    if ( event.code == "Enter") serachBtn.click(); 
});
