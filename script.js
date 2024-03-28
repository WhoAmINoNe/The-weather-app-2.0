const ApiData = ``
let Location =  navigator.geolocation
const HOST = "https://api.openweathermap.org/data/2.5/"
const KEY = "de3ae2261305416619b29ff9f5edc781"
Location.getCurrentPosition((position) => {
    let {latitude, longitude} = position.coords

    if (latitude && longitude) {
    fetch(`${HOST}onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${KEY}&units=metric`)
    .then(res => res.json())
    .then ((res) => {
        setElement(res)
        getWork()
    })
 .catch ((err) => {
        console.log(err)
        getWork()
    })
    }else {
        errorFunc()
    }
})

function getWork () {
    const body = document.querySelector("body")
    const section = document.querySelector("#weather")
    const loader = document.querySelector(".weather_cols")

    body.classList.remove("hidden")
    section.classList.remove("blur")
    loader.classList.add("none")
}




function setElement (data) {
    let getWeatherHtml = document.querySelector("#weather")
    for (let i of data?.daily) {
        let date = new Date(i.dt * 1000).toLocaleString({weekday : ""})
        
        getWeatherHtml.innerHTML += `
            <div class="item">
                <div class="top">
                    <p>${date.slice(0, 10)}</p>
                    <h2>${Math.round(i?.temp?.day)} °C</h2>
                    <span>${i?.weather[0].main}
                </div>

                <div class="image">
                    <img src="http://openweathermap.org/img/wn/${i.weather[0].icon}.png" alt="" />
                </div>

                <div class="line"></div>

                <div class="bottom">
                    <div class="bottom_item">
                        <h4>${Math.round(i?.temp?.max)} °C</h4>
                        <span>Max Temp</span>
                    </div>

                    <div class="bottom_item">
                        <h4>${Math.round(i?.temp?.min)} °C</h4>
                        <span>Min Temp</span>
                    </div>

                    <div class="bottom_item">
                        <h4>${Math.round(i?.temp?.min)} °C</h4>
                        <span>Min Temp</span>
                    </div>

                    <div class="bottom_item">
                        <h4>${Math.round(i?.wind_deg)} °C</h4>
                        <span>Wind Degree</span>
                    </div>

                    <div class="bottom_item">
                        <h4>${Math.round(i?.wind_speed)} m/s</h4>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        `
    }
}

function errorFunc () {
    let getWeatherHtml = document.querySelector("#weather")

    getWeatherHtml.innerHTML += `
    <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png" alt="" width="100%/>
    `
}
