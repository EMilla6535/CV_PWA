/* Datos por defecto si no hay Internet */
let default_user_data = {"results":[{
	"gender":"male",
	"name":{
		"title":"Mr",
		"first":"Kyle",
		"last":"Bowman"},
	"location":{
		"street":{
			"number":733,
			"name":"Timber Wolf Trail"},
		"city":"Coffs Harbour",
		"state":"Queensland",
		"country":"Australia",
		"postcode":2089,
		"coordinates":{
			"latitude":"-30.296453",
			"longitude":"153.114022"},
		"timezone":{
			"offset":"+2:00",
			"description":"Kaliningrad, South Africa"}},
	"email":"kyle.bowman@example.com",
	"dob":{
		"date":"2000-09-15T19:19:40.054Z",
		"age":22},
	"phone":"06-0773-2679",
	"cell":"0459-792-034",
	"picture":{
		"large":"img/1.jpg",
		"medium":"img/1-med.jpg",
		"thumbnail":"img/1-thumbnail.jpg"},
	"nat":"AU"}]};
/* Traduce Nacionalidad */
function getNationality(nat){
	if(nat == "AU" || nat == "au"){
		return "Australiano";
	}
	if(nat == "ES" || nat == "es"){
		return "Español";
	}
	if(nat == "MX" || nat == "mx"){
		return "Mexicano";
	}
	return "Sin Nacionalidad";
}
/* Traduce sexo */
function getGender(gender){
	if(gender == "male"){
		return "Masculino";
	}
	if(gender == "female"){
		return "Femenino";
	}
	return "No Indicado";
}
/* Traduce pais */
function getCountry(country){
	if(country == "Spain"){
		return "España";
	}
	return country;
}
/* Obtiene el año como string */
function getYear(date){
	let year = "";
	for(let i = 0; i < 4; i++){
		year += date[i];
	}
	return year;
}
/* Obtiene el mes como string */
function getMonth(date){
	let month = "";
	for(let i = 5; i < 7; i++){
		month += date[i];
	}
	return month;
}
/* Obtiene el dia como string */
function getDay(date){
	let day = "";
	for(let i = 8; i < 10; i++){
		day += date[i];
	}
	return day;
}
/* Obtiene la fecha como DD/MM/AAAA en string */
function getDate(date){
	let buffer = "";
	buffer = getDay(date) + "/" + getMonth(date) + "/" + getYear(date);
	return buffer;
}
/* Establece los datos de usuario en los diferentes campos */
function setUserData(user_data){
	document.getElementById('nombre').innerHTML = user_data.results[0].name.first;
	document.getElementById('apellido').innerHTML = user_data.results[0].name.last;
	document.getElementById('fecha_nacimiento').innerHTML = getDate(user_data.results[0].dob.date); // Convertir
	document.getElementById('edad').innerHTML = 2023 - getYear(user_data.results[0].dob.date);
	document.getElementById('sexo').innerHTML = getGender(user_data.results[0].gender);
	document.getElementById('nacionalidad').innerHTML = getNationality(user_data.results[0].nat);
	document.getElementById('perfil').innerHTML = '<img class="img-perfil" alt="Imagen de Perfil" src="' + user_data.results[0].picture.large + '">'

	let user_location = user_data.results[0].location;

	document.getElementById('calle').innerHTML = user_location.street.number + " " + user_location.street.name;
	document.getElementById('ciudad').innerHTML = user_location.city;
	document.getElementById('estado').innerHTML = user_location.state;
	document.getElementById('pais').innerHTML = getCountry(user_location.country);
	document.getElementById('cp').innerHTML = user_location.postcode;
	
	/* Si no hay Internet, mostrar un mensaje en lugar de un mapa */
	if(!navigator.onLine){
		document.getElementById('map').innerHTML = '<p class="domicilio-no-map">Error al cargar el mapa. Revise su conexión a Internet</p>';
	}
	else{
		/* Coordenadas predefinidas porque las que vienen con los datos no se visualizan correctamente */
		let latitud = "";
		let longitud = "";
		if(getNationality(user_data.results[0].nat) == "Australiano"){
			latitud = "-33.850502";
			longitud = "151.008227";
		}
		else if(getNationality(user_data.results[0].nat) == "Español"){
			latitud = "40.193919";
			longitud = "-3.254973";
		}
		else if(getNationality(user_data.results[0].nat) == "Mexicano"){
			latitud = "22.424028";
			longitud = "-102.238091";
		}
		else{
			latitud = "-30.296453";
			longitud = "153.114022";
		}
		/* Añade el mapa y un marcador */
		let map = L.map('map').setView([latitud, longitud], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    maxZoom: 13,
		    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		let marker = L.marker([latitud, longitud]).addTo(map);
	}

	document.getElementById('email').innerHTML = user_data.results[0].email;
	document.getElementById('telefono').innerHTML = user_data.results[0].phone;
	document.getElementById('celular').innerHTML = user_data.results[0].cell;
}

/* Trata de obtener los datos de usuario */
fetch("https://randomuser.me/api/?exc=login,registered,id&noinfo&format=json&gender=male&nat=au,mx,es")
  .then(function (response) {
    return response.json();
  })
  .then(function (user_data) {
	  setUserData(user_data);
  })
  .catch(function(error) {
	  setUserData(default_user_data);
  })

/* Al hacer click en un boton mostrar un mapa */
function abrirMapa(){
	  document.getElementById("boton-mapa").style.display = "none";
	  document.getElementById("map").style.display = "block";
}
document.getElementById("boton-mapa").addEventListener("click", abrirMapa, false);

