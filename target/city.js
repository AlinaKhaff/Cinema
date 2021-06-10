const SYPEX_URL = 'http://api.sypexgeo.net/';
GLAVPUNKT_URL = 'https://glavpunkt.ru/api/get_rf_cities';
let selectedCity, cities;

function getReguest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.status != 200) {
      return xhr.statusText;
    } else {
      if (xhr.readyState == 4) {
        //let res = $.parseJSON(xhr.responseText);
        //callback.call(res.city.name_ru);
        callback.call(xhr.responseText);
      }
    }
  };
}

function setCity() {
  let res = $.parseJSON(this);
  selectedCity = res.city.name_ru;
  setTimeout(() => {
    console.log(this);
  }, 1000);
  $('#city-link').html(selectedCity);
}

function setCityManual(city) {
  $('#city-link').html(city);
  $.fancybox.close();
}

function setCities() {
  cities = $.parseJSON(this);
  console.log($.parseJSON(this));
  getCityList();
}

function getCityList() {
  let val = $('#city-input').val(),
      counter = 0,
      html = '<ul>';

  for (let i = 0; i < cities.length; i++) {
    if (cities[i].name.toLowerCase().indexOf(val.toLowerCase()) >= 0 && counter < 5) {
      console.log(val, cities[i].name, i);
      html += `<li><button class="city-click" onclick="setCityManual('${cities[i].name}')">` + cities[i].name + '</button></li>';
      counter++;
    }
  }

  html += '</ul>';
  $('#search_result').html(html);
}

jQuery(document).ready($ => {
  console.log('BE READY');
  getReguest(SYPEX_URL, setCity);
  $(document).on('keyup', '#city-input', function () {
    let val = $(this).val();
    if (!cities) getReguest(GLAVPUNKT_URL, setCities);else getCityList();
  });
});
//# sourceMappingURL=city.js.map