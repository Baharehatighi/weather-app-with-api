// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=ad1eceee08d9849dde5c44724130136e&units=metric

let $ = document;
const form = $.querySelector('.top-banner form');
const input = $.querySelector('.top-banner input');
const message = $.querySelector('.top-banner .msg');
const list = $.querySelector('.ajax-section .cities');

const apiKey = "ad1eceee08d9849dde5c44724130136e";


form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
    input.value = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
          const {main, name, sys, weather, wind} = data;
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;
          const li = $.createElement("li");
          li.classList.add("city");
          const markUp = `
          <h2 class='city-name' data-name=${name},${sys.country}>
            <span>${name}</span>
            <span>${sys.country}</span>
          </h2>
          <div class='city-temp'>${Math.round(main.temp) + " " + "C°"}</div>
          <figure>
             <img class='city-icon' src='${icon}' alt='city'>
          <figurecaption >${weather[0]['description']}</figurecaption>
          </figure>
          <div class="wind-humidity">
          <div class="city-wind"> Wind : ${wind.speed} ${"km.h"}</div>
          <div class="city-humidity"> Humidity : ${main.humidity} ${"%"}</div>
          </div>
          `;
          li.innerHTML = markUp;
          list.appendChild(li);
          message.innerText = "";


      })
      .catch(() => {
          message.innerText = "search for a valid city";
      })
})
