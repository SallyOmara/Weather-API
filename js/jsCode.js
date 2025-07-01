// ============================================
// ================== Weather API ==================

// -------- Send a request and get the response --------
getCity("Alexandria"); // --> Default City
async function getCity(term) {
  let promise = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b9f9f0c0abe84161980132146250107&q=${term}&days=3`
  );
  let response = await promise.json();
  let cityLocation = response.location;
  let weatherDetails = response.forecast.forecastday;
  let currentDetail = response.current;

  console.log(weatherDetails);

  displayWeather(cityLocation, weatherDetails, currentDetail);
}

// -------- Convert the date into day and month format --------
function getDay(date) {
  let day = date.getDay();
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayNames[day];
}
function getMonth(date) {
  let month = date.getMonth();
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
}

// -------- Display the three-day weather details --------
function displayWeather(cityLocation, weatherDetails, currentDetail) {
  let dateDetails = new Date(weatherDetails[0].date);
  let currentCartona = `
    <div class="weather-item col-12 col-lg-4 p-0">
            <div
              class="item-date d-flex justify-content-between align-items-center"
            >
              <p>${getDay(dateDetails)}</p>
              <p>${dateDetails.getDate()} ${getMonth(dateDetails)}</p>
            </div>
            <div class="item-body m-4">
              <p class="weather-city">${cityLocation.name}</p>
              <div class="weather-degree row justify-content-between">
                <h1 class="text-white col-6 col-lg-12 p-0">${
                  currentDetail.temp_c
                }°C</h1>
                <img
                  src="${currentDetail.condition.icon}"
                  class="col-6 col-lg-12 w-25"
                  alt="cloud"
                />
              </div>
              <p class="degree-text">${currentDetail.condition.text}</p>
              <div class="weather-details d-flex">
                <div class="umb-detail d-flex me-4">
                  <img
                    src="./images/icon-umberella@2x.png"
                    class="me-2"
                    alt=""
                  />
                  <p>20%</p>
                </div>
                <div class="wind-detail d-flex me-4">
                  <img src="./images/icon-wind@2x.png" class="me-2" alt="" />
                  <p>18km/h</p>
                </div>
                <div class="compass-detail d-flex me-4">
                  <img src="./images/icon-compass@2x.png" class="me-2" alt="" />
                  <p>East</p>
                </div>
              </div>
            </div>
          </div>
  `;
  let nextCartona = ``;
  for (let i = 1; i <= 2; i++) {
    dateDetails = new Date(weatherDetails[i].date);
    nextCartona += `
        <div class="weather-item col-12 col-lg-4 p-0">
            <div class="item-date d-flex justify-content-center">
              <p class="text-center">${getDay(dateDetails)}</p>
            </div>
            <div class="weather-details-next text-center my-5">
              <img src="${
                weatherDetails[i].day.condition.icon
              }" class="w-25" alt="" />
              <div class="high-low-text my-3">
                <h1>${weatherDetails[i].day.maxtemp_c}°C</h1>
                <p>${weatherDetails[i].day.mintemp_c}°C</p>
              </div>
              <p class="degree-text">${weatherDetails[i].day.condition.text}</p>
            </div>
          </div>
    `;
  }
  document.querySelector(".weather-days").innerHTML =
    currentCartona + nextCartona;
}

// -------- Search for a city --------
let findInput = document.getElementById("findWord");
findInput.addEventListener("input", function () {
  let term = findInput.value;
  getCity(term);
});

// ===========================================
