
const   AuktionUrl = "http://nackowskis.azurewebsites.net/api/Auktion/700";
var     auktionID;
var     titel;
var     beskrivning;
var     startDatum;
var     slutDatum;
var     gruppkod;
var     utropspris;
var     countdown;
var     giveBudButton;

var budID;
var summa;



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

window.onload = function(){
    //Auktion
    auktionID = document.getElementById("auktionID");
    titel = document.getElementById("title");
    beskrivning = document.getElementById("beskrivning");
    startDatum = document.getElementById("startDatum");
    slutDatum = document.getElementById("slutDatum");
    gruppkod = document.getElementById("gruppkod");
    utropspris = document.getElementById("utropspris");

    //Button 
    giveBudButton = document.getElementById("give-bud");

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
            var auktion = new Auktion(
                        "<b>AuktionID: </b>" + data[0].AuktionID, 
                        "<b>Title: </b>" + data[0].Titel, 
                        "<b>Beskrivning: </b>" + data[0].Beskrivning, 
                        "<b>StartDatum: </b>" + data[0].StartDatum, 
                        "<b>SlutDatum: </b>" + data[0].SlutDatum, 
                        "<b>GruppKod: </b>" + data[0].Gruppkod, 
                        "<b>Utropspris: </b>" + data[0].Utropspris + " kr");

                        countdown(data[0].SlutDatum);
                        updateAuktionCard(auktion);
                        // createNewAuktion(auktion);
                });
            }
        )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
    }

//Function CountDown..
function countdown(slutDatum){
    var countDownDate = new Date(slutDatum).getTime();

    var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = "<b>Slut Auktion: </b>" + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);
}  

  function updateAuktionCard(auktion){
    auktionID.innerHTML = auktion.auktionID;
    titel.innerHTML = auktion.titel;
    beskrivning.innerHTML = auktion.beskrivning;
    startDatum.innerHTML = auktion.startDatum;
    slutDatum.innerHTML = auktion.slutDatum;
    gruppkod.innerHTML = auktion.gruppkod;
    utropspris.innerHTML = auktion.utropspris;
    
  }



  function createNewAuktion(auktion){
      let div = document.createElement("DIV");
      div.setAttribute("id", "auktion-card");
      div.setAttribute("class", "auktion-card");

      for (let i = 0; i < auktion.length; i++) {
          
        let pTitle = document.createElement("P");   
        pTitle.setAttribute("id", "title");
        let titleNode = document.createTextNode("Title: " + auktion.titel);
        pTitle.appendChild(titleNode);
        div.appendChild(pTitle);
          
      }
      

  }

