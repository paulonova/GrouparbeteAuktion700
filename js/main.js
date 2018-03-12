
const   AuktionUrl = "http://nackowskis.azurewebsites.net/api/Auktion/700";
var     auktionID;
var     titel;
var     beskrivning;
var     startDatum;
var     slutDatum;
var     gruppkod = 700;
var     utropspris;

var budID;
var summa;



class Auktion{
    constructor(auktionID, titel, beskrivning, startDatum, slutDatum, 
        gruppkod, utropspris){
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

    //Bud
    // budID = document.getElementById();
    // summa = document.getElementById();

    fetch(AuktionUrl)
    .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data[0].Titel);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  }

