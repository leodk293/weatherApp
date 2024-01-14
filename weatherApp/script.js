const inputCity = document.querySelector("input")
const icon = document.querySelector("img")
const btn = document.querySelector("button")
const country = document.querySelector(".country")
const CurrentTime = document.querySelector(".data>:nth-child(1)")
const city = document.querySelector("h1")
const temperature = document.querySelector(".temperature")
const skyState = document.querySelector(".skyState")

btn.addEventListener("click", fetchData)

async function fetchData() {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${inputCity.value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4685e83adbmshbe621af8b52500bp19db03jsna57eb0a7e344',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const current = result.current
        const location = result.location
        country.textContent = `located In : ${location.country}`

        if (result) {
            
            city.textContent = location.name
            CurrentTime.style.display = "block"
            
            if(current.condition.text === "Clear"){
                icon.src = "images/sun.svg"
            }
            else if(current.condition.text === "Sunny"){
                icon.src = "images/sun.svg"
            }

            else{
                icon.src = "images/sunCloudly.svg"

            }

            const temperatureCalcul = ((current.temp_f - 32) * 5) / 9
            temperature.textContent = `Temperature : ${temperatureCalcul.toFixed(2)} °C`
            skyState.textContent = current.condition.text
        }

        else {
            CurrentTime.textContent = "City could not be found"
        }
    } catch (error) {
        console.error(error);
    }
}

fetchData()