const   AuktionUrl = "http://nackowskis.azurewebsites.net/api/Auktion/700";
const   BidsUrl = "https://nackowskis.azurewebsites.net/api/Bud/700/";
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

// var skapaTitel;
// var skapaBeskrivning;
// var skapaUtropspris;
// var skapaStartDatum;
// var skapaStartTid;
// var skapaSlutDatum;
// var skapaSlutDatum;
// var skapaError;


class AuktionManager {
    constructor()
    {
        this.auctions = new Array();
    }

    AddAuktion(auktion)
    {
        this.auctions.push(auktion);
    }
}

var auktionManager = new AuktionManager();


class Auktion{
    constructor(auktionID, titel, beskrivning, startDatum, slutDatum, gruppkod, utropspris){
            this.auktionID = auktionID;
            this.titel = titel;
            this.beskrivning = beskrivning;
            this.startDatum = startDatum;
            this.slutDatum = slutDatum;
            this.gruppkod = gruppkod;
            this.utropspris = utropspris;
            this.bids = new Array();
            this.input = null;
            this.message = null;
        }

    LoadBids()
    {
        fetch(BidsUrl + this.auktionID).then(
            function(response) 
            {
                if (response.status !== 200) 
                {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
            
                response.json().then( (data) =>
                {
                    console.log('Status Code: ' + response.status);
            
                   for (let bid of data)
                    {
                        let newBid = new Bid(
                            bid.BudID,
                            bid.Summa,
                            bid.AuktionID
                        );

                        this.bids.push(newBid);
                    }
                    
                    this.SortBids();
                    
                    createAuktionElements(this);
                })
        }.bind(this)
        ).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

    }

    SortBids() 
    {
        if (this.bids.length > 0)
        {
            this.bids.sort(function(a, b) { return b.summa-a.summa; });
        }
    }

    GetHighestBid()
    {
        if (this.bids.length > 0)
        {
           return this.bids[0].summa;
        }

        return 0; 
    }

    CheckBid()
    {
        let bidToMatch = this.GetHighestBid();
        
        if (this.input.value.length > 0)
        {
            let bidAmount = parseInt(this.input.value);
            if (Number.isInteger(bidAmount) == true)
            {       
                if (bidAmount > bidToMatch)
                {
                    let jsonData = { BudID: 0, Summa: bidAmount, AuktionID: this.auktionID };  
                    fetch(BidsUrl + this.auktionID,
                    {
                        method: 'POST',
                        body: JSON.stringify(jsonData),
                        headers: 
                        {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                        }
                    }).then(function (data) {
                        console.log("Bid of amount " + bidAmount + "was POSTed. Give this input to user and update bids.");
                        
                        this.message.innerHTML = "<span>SUCCESS, Bid of amount " + bidAmount + " was placed.</span>";
                    }.bind(this))  
                }
                else
                {
                    console.log("Error: Bid was not higher than current Highest Bid. Print this on the page.");
                    this.message.innerHTML = "<span class='red'>ERROR: Bid must be higher than highest bid.</span>"
                }
            }
        }
    }

    SetBidInput(element)
    {
        this.input = element;
    }

    SetMessageElement(element)
    {
        this.message = element;
    }
}

class Bid {
    constructor(budID, summa, auktionID)
    {
        this.budID = budID;
        this.summa = summa;
        this.auktionID = auktionID;
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
            data[i].AuktionID,
            data[i].Titel,
            data[i].Beskrivning,
            data[i].StartDatum,
            data[i].SlutDatum,
            data[i].Gruppkod,
            data[i].Utropspris);

            auktion.LoadBids();

            auktionManager.AddAuktion(auktion);
        }
    });
  }

).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//Function CountDown..
function countdown(slutDatum, element){
    var countDownDate = new Date(slutDatum).getTime();

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
    let titleText = document.createTextNode("Title: " + auktion.titel);
    pTitle.appendChild(titleText);
    div.appendChild(pTitle);

    let pauktionId = document.createElement("P");
    pauktionId.setAttribute("id", "auktionID");
    let auktionIDText = document.createTextNode("AuktionID: " + auktion.auktionID);
    pauktionId.appendChild(auktionIDText);
    div.appendChild(pauktionId);

    let pBeskrivning = document.createElement("P");
    pBeskrivning.setAttribute("id", "beskrivning");
    let beskrivText = document.createTextNode("Beskrivning: " + auktion.beskrivning);
    pBeskrivning.appendChild(beskrivText);
    div.appendChild(pBeskrivning);

    let pStartDatum = document.createElement("P");
    pStartDatum.setAttribute("id", "startDatum");
    let startText = document.createTextNode("StartDatum: " + auktion.startDatum);
    pStartDatum.appendChild(startText);
    div.appendChild(pStartDatum);

    let pSlutDatum = document.createElement("P");
    pSlutDatum.setAttribute("id", "slutDatum");
    let slutText = document.createTextNode("SlutDatum: " + auktion.slutDatum);
    pSlutDatum.appendChild(slutText);
    div.appendChild(pSlutDatum);

    let pGruppKod = document.createElement("P");
    pGruppKod.setAttribute("id", "gruppkod");
    let gruppText = document.createTextNode("GruppKod: " + auktion.gruppkod);
    pGruppKod.appendChild(gruppText);
    div.appendChild(pGruppKod);

    let pUtropspris = document.createElement("P");
    pUtropspris.setAttribute("id", "utropspris");
    let utropsText = document.createTextNode("Utropspris: " + auktion.utropspris + "KR");
    pUtropspris.appendChild(utropsText);
    div.appendChild(pUtropspris);

    let pCountDown = document.createElement("P");
    pCountDown.setAttribute("id", "countdown");
    let countText = document.createTextNode("Countdown: ");
    pCountDown.appendChild(countText);
    div.appendChild(pCountDown);

    let pHogstaBud = document.createElement("P");
    pHogstaBud.setAttribute("id", "hogstabud");
    let hogstaBudText = document.createTextNode("Högsta Bud: " + auktion.GetHighestBid());
    pHogstaBud.appendChild(hogstaBudText);
    div.appendChild(pHogstaBud);

    //Input text
    let txtArea = document.createElement("INPUT");
    txtArea.setAttribute("type", "text");
    txtArea.setAttribute("class", "inputBud");
    auktion.SetBidInput(txtArea);
    div.appendChild(txtArea);

    //input button
    let button = document.createElement("INPUT");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Ge ett Bud"); 
    button.setAttribute("class", "myBotton w3-button w3-round w3-teal"); 
    button.addEventListener("click", () => auktion.CheckBid())
    div.appendChild(button);

    let pMessage = document.createElement("P");
    pMessage.setAttribute("id", "message");
    auktion.SetMessageElement(pMessage);
    div.appendChild(pMessage);


    countdown(auktion.slutDatum, pCountDown);
    
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
//   window.onload = function(){  

//     //Auktion
//     auktionID = document.getElementById("auktionID");
//     titel = document.getElementById("title");
//     beskrivning = document.getElementById("beskrivning");
//     startDatum = document.getElementById("startDatum");
//     slutDatum = document.getElementById("slutDatum");
//     gruppkod = document.getElementById("gruppkod");
//     utropspris = document.getElementById("utropspris");

//   }

//   function updateAuktionCard(auktion){
//     auktionID.innerHTML = auktion.auktionID;
//     titel.innerHTML = auktion.titel;
//     beskrivning.innerHTML = auktion.beskrivning;
//     startDatum.innerHTML = auktion.startDatum;
//     slutDatum.innerHTML = auktion.slutDatum;
//     utropspris.innerHTML = auktion.utropspris;
//     gruppkod.innerHTML = auktion.gruppkod;

//   }

//   function myFunction() {
//       alert(slutDatum);
//   }
