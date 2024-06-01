var widthPopUp = 1200;
var heightPopUp = 1700;
var widthDocument = 1100;
var heightDocument = 800;
var heightInfoCard = "250px";
function toTranslate(language){
  if(language == "e"){
    document.getElementById("headerEventsTextToTranslateSpanish").style.display = 'none';
    document.getElementById("headerEventsTextToTranslateEnglish").style.display = 'block';
    document.getElementById("headerContactTextToTranslateSpanish").style.display = 'none'
    document.getElementById("headerContactTextToTranslateEnglish").style.display = 'block'
    document.getElementById("buttonToTranslateToSpanish").style.display = 'block'
    document.getElementById("buttonToTranslateToEnglish").style.display = 'none'
    document.getElementById("spanishTitle").style.display = 'none';
    document.getElementById("spanishWelcome").style.display = 'none';
    document.getElementById("englishTitle").style.display = 'block';
    document.getElementById("englishWelcome").style.display = 'block';
    document.getElementById("sectionContactTextSpanish").style.display = 'none';
    document.getElementById("sectionContactTextEnglish").style.display = 'block';
  }
  else{
    document.getElementById("headerEventsTextToTranslateSpanish").style.display = 'block';
    document.getElementById("headerEventsTextToTranslateEnglish").style.display = 'none';
    document.getElementById("headerContactTextToTranslateSpanish").style.display = 'block'
    document.getElementById("headerContactTextToTranslateEnglish").style.display = 'none'
    document.getElementById("buttonToTranslateToSpanish").style.display = 'none'
    document.getElementById("buttonToTranslateToEnglish").style.display = 'block'
    document.getElementById("spanishTitle").style.display = 'block';
    document.getElementById("spanishWelcome").style.display = 'block';
    document.getElementById("englishTitle").style.display = 'none';
    document.getElementById("englishWelcome").style.display = 'none';
    document.getElementById("sectionContactTextSpanish").style.display = 'block';
    document.getElementById("sectionContactTextEnglish").style.display = 'none';
  } 
}
function getEvents()
{
  let container = document.getElementById("container");
  let load = `
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  container.innerHTML = load;
  var config =
  {
    method: 'get',
    url: 'https://sheet.best/api/sheets/61e644c2-ec9e-4ea3-bfab-682c517690a9',
    headers: 
    {
      
    }
  }
  axios(config)
  .then((result) => {
    orderEvents(result.data)
  }).catch((err) => {
    console.log(err)
  });
}
function orderEvents(array){
  let currentEvents = []
  for (let l = 0; l<array.length; l++){
    if (array[l].current == "yes"){
      currentEvents.push(array[l])
    }
  }
  currentEvents.sort(function(a,b){
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA-dateB;
  })
  postEventsInContainer(currentEvents)
  // postEventsInSidebar(currentEvents)
}
function postEventsInContainer(array){
  let container = document.getElementById("container");
  let eventName = null;
  let date = null;
  let registrationLink = null;
  let flyer = null;
  let hour = null;
  let venueName = null;
  let card = ``;
  for(let i = 0; i<array.length; i++)
  {
    eventName = array[i].eventName;
    description = array[i].description;
    date = () => {
      parts = array[i].date.split("/");
      year = parts[0];
      preMonth = parts[1];
      day = parts[2];
      if(preMonth == 1) {month = "enero"}
      else if(preMonth == 2) {month = "febrero"}
      else if(preMonth == 3) {month = "marzo"}
      else if(preMonth == 4) {month = "abril"}
      else if(preMonth == 5) {month = "mayo"}
      else if(preMonth == 6) {month = "junio"}
      else if(preMonth == 7) {month = "julio"}
      else if(preMonth == 8) {month = "agosto"}
      else if(preMonth == 9) {month = "septiembre"}
      else if(preMonth == 10) {month = "octubre"}
      else if(preMonth == 11) {month = "noviembre"}
      else if(preMonth == 12) {month = "diciembre"}
      date = `${day} de ${month} del ${year}`
      return date
    }
    dateEnd = () => {
      parts = array[i].dateEnd.split("/");
      year = parts[0];
      preMonth = parts[1];
      day = parts[2];
      if(preMonth == 1) {month = "enero"}
      else if(preMonth == 2) {month = "febrero"}
      else if(preMonth == 3) {month = "marzo"}
      else if(preMonth == 4) {month = "abril"}
      else if(preMonth == 5) {month = "mayo"}
      else if(preMonth == 6) {month = "junio"}
      else if(preMonth == 7) {month = "julio"}
      else if(preMonth == 8) {month = "agosto"}
      else if(preMonth == 9) {month = "septiembre"}
      else if(preMonth == 10) {month = "octubre"}
      else if(preMonth == 11) {month = "noviembre"}
      else if(preMonth == 12) {month = "diciembre"}
      dateEnd = `${day} de ${month} del ${year}`
      return dateEnd
    }
    registrationLink = array[i].registrationLink;
    flyer = array[i].flyer;
    hour = array[i].hour;
    venueLink = array[i].venueLink;
    venueName = array[i].venueName;
    type = array[i].type;
    eventLinkInGoogleCalendar = array[i].eventLinkInGoogleCalendar
    if(array[i].registrationLink === "N/A"){
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5> Lugar: ${venueName}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Hora: ${hour}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-center" style="position:relative">
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:310px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    else if(array[i].type == "Evento presencial"){
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2 text-justify">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5>Lugar: ${venueName}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Hora: ${hour}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between" style="position:relative">
                      <a href="http://${registrationLink}" target="_blank" style="text-decoration: none;">
                        <input type="button" value="Regístrate"/ class="btn btn-outline-success" style="width:150px">
                      </a>
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:150px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    else if(array[i].type == "Convocatoria"){
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2 text-justify">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5>${type}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha de apertura: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha de cierre: ${dateEnd()}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between" style="position:relative">
                      <a href="http://${registrationLink}" target="_blank" style="text-decoration: none;">
                        <input type="button" value="Regístrate"/ class="btn btn-outline-success" style="width:150px">
                      </a>
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:150px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    else {
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2 text-justify">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5>${venueName}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Hora: ${hour}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between" style="position:relative">
                      <a href="http://${registrationLink}" target="_blank" style="text-decoration: none;">
                        <input type="button" value="Regístrate"/ class="btn btn-outline-success" style="width:150px">
                      </a>
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:150px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
  }
  container.innerHTML = card;
}