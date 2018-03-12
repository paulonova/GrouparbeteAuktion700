
const   AuktionUrl = "http://nackowskis.azurewebsites.net/api/Auktion/700";
var     auktionID;
var     titel;
var     beskrivning;
var     startDatum;
var     slutDatum;
var     gruppkod = 700;
var     utropspris;

var     countdown;

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
                    "AuktionID: " + data[0].AuktionID, 
                    "Title: " + data[0].Titel, 
                    "Beskrivning: " + data[0].Beskrivning, 
                    "StartDatum: " + data[0].StartDatum, 
                    "SlutDatum: " + data[0].SlutDatum, 
                    "GruppKod: " + data[0].Gruppkod, 
                    "Utropspris: " + data[0].Utropspris + " kr");

                    countdown(data[0].SlutDatum);
                    updateAuktionCard(auktion);
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

    document.getElementById("countdown").innerHTML = "Slut Auktion: " + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);
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

  }

  function updateAuktionCard(auktion){
    auktionID.innerHTML = auktion.auktionID;
    titel.innerHTML = auktion.titel;
    beskrivning.innerHTML = auktion.beskrivning;
    startDatum.innerHTML = auktion.startDatum;
    slutDatum.innerHTML = auktion.slutDatum;
    utropspris.innerHTML = auktion.utropspris;
    
  }

