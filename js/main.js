
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

var inputBud;
var buttonSubmitBud;

var skapaTitel;
var skapaBeskrivning;
var skapaUtropspris;
var skapaStartDatum;
var skapaStartTid;
var skapaSlutDatum;
var skapaSlutDatum;
var skapaError;


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

            countdown(data[i].SlutDatum);
            updateAuktionCard(auktion);          
        }        
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

  function createAuktionElements(auktion, bud){
    let div = document.createElement("DIV");
    div.setAttribute("class", "auktion-card");
    div.setAttribute("id", "auktion-card");

    let pTitle = document.createElement("H3");
    pTitle.setAttribute("id", "title");
    // pTitle.document.
    let pAuktionId = document.createElement("P");
    let pBeskrivning = document.createElement("P");
    let pStartDatum = document.createElement("P");
    let pSlutDatum = document.createElement("P");
    let pGruppKod = document.createElement("P");
    let pUtropspris = document.createElement("P");
    let pCountDown = document.createElement("P");
    let pBud = document.createElement("P");

    //Input text
    let txtArea = document.createElement("INPUT");
    txtArea.setAttribute("type", "text");
    txtArea.setAttribute("class", "inputBud");
    txtArea.appendChild()

    //input button
    let button = document.createElement("INPUT");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Ge ett Bud"); 

    
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

    inputBud = document.getElementById("inputBud");
    buttonSubmitBud = document.getElementById("buttonBudSumbit");

    if (buttonSubmitBud !== null)
    {
        buttonSubmitBud.addEventListener("click", function() { CheckBid() });        
    }


    //Admin page

    skapaTitel = document.getElementById("auction-title");
    skapaBeskrivning = document.getElementById("auction-description");
    skapaUtropspris = document.getElementById("auction-startingprice");
    skapaStartDatum = document.getElementById("auction-datestart");
    skapaStartTid = document.getElementById("auction-timestart");
    skapaSlutDatum = document.getElementById("auction-dateend");
    skapaSlutTid = document.getElementById("auction-timeend");
    skapaError = document.getElementById("error");

    if (skapaStartDatum !== null && skapaSlutDatum !== null)
    {
        skapaStartDatum.valueAsDate = new Date();
        skapaSlutDatum.valueAsDate = new Date();
    }
    if (skapaStartTid !== null && skapaSlutTid !== null)
    {
        let date = new Date();

        let hour = date.getHours();
        let min = date.getMinutes();

        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;

        displayTime = hour + ":" + min; 

        skapaStartTid.value = displayTime;
        skapaSlutTid.value = displayTime;
    }
}

  function updateAuktionCard(auktion){
    auktionID.innerHTML = auktion.auktionID;
    titel.innerHTML = auktion.titel;
    beskrivning.innerHTML = auktion.beskrivning;
    startDatum.innerHTML = auktion.startDatum;
    slutDatum.innerHTML = auktion.slutDatum;
    utropspris.innerHTML = auktion.utropspris;
    
}

function CheckBid()
{
    let bidURL = "http://nackowskis.azurewebsites.net/api/Bud/700/";
    let bidToMatch = 0;
    let auktionID = 7; //This needs to be updated to valid ID dependentant on auction

    if (inputBud.value.length > 0)
    {
        let bidAmount = parseInt(inputBud.value);
        if (Number.isInteger(bidAmount) == true)
        {       
            if (bidAmount > bidToMatch)
            {
                let jsonData = { BudID: 0, Summa: bidAmount, AuktionID: auktionID };  
                fetch(bidURL + auktionID,
                {
                    method: 'POST',
                    body: JSON.stringify(jsonData),
                    headers: 
                    {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                    }
                }).then(function (data) {
                    console.log('Request success: ', 'posten skapad');
                })  
            }
        }
    }
}
