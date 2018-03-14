const   AuktionUrl = "http://nackowskis.azurewebsites.net/api/Auktion/700";
var     auktionID;
var     titel;
var     beskrivning;
var     startDatum;
var     slutDatum;
var     gruppkod = 700;
var     utropspris;
var     countdown;
var     budID;
var     summa;



class Auktion{
    constructor(auktionID, titel, beskrivning, startDatum, slutDatum, gruppkod, utropspris){
            this.auktionID = auktionID;
            this.titel = titel;
            this.beskrivning = beskrivning;
            this.startDatum = startDatum;
            this.slutDatum = slutDatum;
            this.gruppkod = gruppkod;
            this.utropspris = utropspris;
        }
}

sendRequest(AuktionUrl);

//Function to send a request
function sendRequest(url){
    fetch(url)
    .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      // Examine the text in the response
      response.json()
      .then(function(data) {
        console.log('Status Code: ' + response.status);

        for (let i = 0; i < data.length; i++) {
          var auktion = new Auktion(
            "AuktionID: " + data[i].AuktionID,
            "Title: " + data[i].Titel,
            "Beskrivning: " + data[i].Beskrivning,
            "StartDatum: " + data[i].StartDatum,
            "SlutDatum: " + data[i].SlutDatum,
            "GruppKod: " + data[i].Gruppkod,
            "Utropspris: " + data[i].Utropspris + " kr");

            createAuktionElements(auktion);
        }
    });
  }

).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//Function CountDown..
function countdown(slutDatum, element){
    console.log(slutDatum);
    console.log(element);
    var countDownDate = new Date(slutDatum).getTime();
    console.log("countDownDate " + countDownDate);

    var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = "Countdown: " + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "EXPIRED";
    }

  }, 1000);
}

  function createAuktionElements(auktion){
    
    //The Container
    let container = document.getElementById("container");
    container.setAttribute("class", "app-container");

    let div = document.createElement("DIV");
    div.setAttribute("class", "auktion-card");
    div.setAttribute("id", "auktion-card");
    //Div inside of container..
    container.appendChild(div);

    let pTitle = document.createElement("H3");
    pTitle.setAttribute("id", "title");
    let titleText = document.createTextNode(auktion.titel);
    pTitle.appendChild(titleText);
    div.appendChild(pTitle);

    let pauktionId = document.createElement("P");
    pauktionId.setAttribute("id", "auktionID");
    let auktionIDText = document.createTextNode(auktion.auktionID);
    pauktionId.appendChild(auktionIDText);
    div.appendChild(pauktionId);

    let pBeskrivning = document.createElement("P");
    pBeskrivning.setAttribute("id", "beskrivning");
    let beskrivText = document.createTextNode(auktion.beskrivning);
    pBeskrivning.appendChild(beskrivText);
    div.appendChild(pBeskrivning);

    let pStartDatum = document.createElement("P");
    pStartDatum.setAttribute("id", "startDatum");
    let startText = document.createTextNode(auktion.startDatum);
    pStartDatum.appendChild(startText);
    div.appendChild(pStartDatum);

    let pSlutDatum = document.createElement("P");
    pSlutDatum.setAttribute("id", "slutDatum");
    let slutText = document.createTextNode(auktion.slutDatum);
    pSlutDatum.appendChild(slutText);
    div.appendChild(pSlutDatum);

    let pGruppKod = document.createElement("P");
    pGruppKod.setAttribute("id", "gruppkod");
    let gruppText = document.createTextNode(auktion.gruppkod);
    pGruppKod.appendChild(gruppText);
    div.appendChild(pGruppKod);

    let pUtropspris = document.createElement("P");
    pUtropspris.setAttribute("id", "utropspris");
    let utropsText = document.createTextNode(auktion.utropspris);
    pUtropspris.appendChild(utropsText);
    div.appendChild(pUtropspris);

    let pCountDown = document.createElement("P");
    pCountDown.setAttribute("id", "countdown");
    let countText = document.createTextNode("Countdown: ");
    pCountDown.appendChild(countText);
    div.appendChild(pCountDown);

    //Input text
    let txtArea = document.createElement("INPUT");
    txtArea.setAttribute("type", "text");
    txtArea.setAttribute("class", "inputBud");
    div.appendChild(txtArea);

    //input button
    let button = document.createElement("INPUT");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Ge ett Bud"); 
    button.setAttribute("class", "myBotton w3-button w3-round w3-teal"); 
    div.appendChild(button);

    countdown(auktion.slutDatum, pCountDown);
    
  }
