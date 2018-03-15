const   AuktionUrl = "http://nackowskis.azurewebsites.net/api/Auktion/700";
const   BidsUrl = "https://nackowskis.azurewebsites.net/api/Bud/700/";
var     auktionID;
var     titel;
var     beskrivning;
var     startDatum;
var     slutDatum;
var     gruppkod;
var     utropspris;
var     countdown;
var     budID;
var     summa;

var inputBud;
var buttonSubmitBud;



class AuktionManager {
    constructor() {
        this.auctions = new Array();

        this.selectSort = document.getElementById("sortauctions");
        this.selectSort.addEventListener("change", () => this.SortList() )

        
        this.searchInput = document.getElementById("searchinput");

        this.searchButton = document.getElementById("searchbutton");
        this.searchButton.addEventListener("click", () => this.Search() )

        let sideNav = document.getElementById("mySidebar");

        let showAll = document.createElement("a");
        showAll.setAttribute("href", "javascript:void(0)");
        showAll.setAttribute("class", "w3-bar-item w3-button");
        let showAllText = document.createTextNode("Visa Alla Auktioner");
        showAll.appendChild(showAllText);
        showAll.addEventListener("click", () => this.ShowAllAuctions());

        sideNav.appendChild(showAll);

    }
    AddAuktion(auktion){
        this.auctions.push(auktion);
    }

    SortList()
    {
        if (this.selectSort.value === "utropspris")
        {
            this.SortByStartingPrice();
        }
        else if (this.selectSort.value === "slutdatum")
        {
            this.SortByEndDate();
        }
    }
    
    SortByEndDate()
    {
        this.auctions.sort(function(a, b) { return new Date(a.slutDatum).getTime() - new Date(b.slutDatum).getTime(); });

        this.ClearAuctionList();

        this.PopulateAuctionList(this.auctions);
    }

    SortByStartingPrice()
    {
        this.auctions.sort(function(a, b) { return a.utropspris - b.utropspris; });

        this.ClearAuctionList();

        this.PopulateAuctionList(this.auctions);
    }

    ClearAuctionList()
    {
        let container = document.getElementById("container");

        while (container.firstChild) 
        {
            container.removeChild(container.firstChild);
        }
    }
    
    PopulateAuctionList(auctionArray)
    {
        for (let auktion of auctionArray)
        {
            createAuktionElements(auktion);
        }
    }

    Search()
    {
        let searchWord = this.searchInput.value;

        if (searchWord.length > 0)
        {
            let searchResult = this.auctions.filter((obj) => obj["titel"].toUpperCase().indexOf(searchWord.toUpperCase()) > -1 || obj["beskrivning"].toUpperCase().indexOf(searchWord.toUpperCase()) > -1);
            
            this.ClearAuctionList();

            this.PopulateAuctionList(searchResult);
        }
    }

    ShowAllAuctions()
    {
        this.ClearAuctionList();

        this.PopulateAuctionList(this.auctions);
    }
}

var auktionManager = new AuktionManager();


class Auktion{
    constructor(auktionID, titel, beskrivning, startDatum, slutDatum, gruppkod, utropspris){
            this.auktionID = auktionID;
            this.titel = titel;
            this.titelUpperCase = titel.toUpperCase();
            this.beskrivning = beskrivning;
            this.beskrivningUpperCase = beskrivning.toUpperCase();
            this.startDatum = startDatum;
            this.slutDatum = slutDatum;
            this.gruppkod = gruppkod;
            this.utropspris = utropspris;

            this.bids = new Array();
            this.input = null;
            this.message = null;

            this.pHogstaBud = null;
            this.pAllaBud = null;
        }

    LoadBids(createAuktionCardFlag)
    {

        fetch(BidsUrl + this.auktionID).then(
            function(response){

                if (response.status !== 200){
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
            
                response.json().then( (data) =>
                {
                    // console.log('Status Code: ' + response.status);
            
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
                    
                    if (createAuktionCardFlag == true)
                    {
                        createAuktionElements(this);
                    }
                    else
                    {
                        this.pHogstaBud.innerHTML = "Högsta Bud: " + this.GetHighestBid() + " kr";
                    }
                })
        }.bind(this)
        ).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

    }

    ClearBids()
    {
        this.bids = new Array();
    }

    SortBids() 
    {
        if (this.bids.length > 0)
        {
            this.bids.sort(function(a, b) { return b.summa-a.summa; });
        }
    }

    GetHighestBid(){

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
            if (this.IsExpired())
            {                
                this.message.innerHTML = "<span class='red'>ERROR: Auction expired and can't take new bids.</span>";
                return;
            }
            let bidAmount = parseInt(this.input.value);
            if (Number.isInteger(bidAmount) == true)
            {       
                if (bidAmount < this.utropspris)
                {
                    this.message.innerHTML = "<span class='red'>ERROR: Bid must be higher than starting bid.</span>";
                }
                else if (bidAmount > bidToMatch)
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
                        console.log("Bid of amount " + bidAmount + " was POSTed. Give this input to user and update bids.");
                        
                        this.message.innerHTML = "<span>SUCCESS, Bid of amount " + bidAmount + " was placed.</span>";

                        this.ClearBids();
                        this.LoadBids(false);

                        this.input.value = "";

                    }.bind(this))  
                }
                else
                {
                    console.log("Error: Bid was not higher than current Highest Bid. Print this on the page.");
                    this.message.innerHTML = "<span class='red'>ERROR: Bid must be higher than highest bid.</span>";
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

    IsExpired()
    {
        return (new Date(this.slutDatum).getTime() - new Date().getTime() <= 0);
    }

    SetHighestBidElement(element)
    {
        this.pHogstaBud = element;
    }

    SetShowAllBidsElement(element)
    {
        this.pAllaBud = element;
    }

    ShowAllBids()
    {
        if (this.pAllaBud !== null)
        {
            this.pAllaBud.innerHTML = "";
            for (let bid of this.bids)
            {
                this.pAllaBud.innerHTML += "<strong>BudID:</strong> " + bid.budID + " <strong>Summa:</strong> " + bid.summa + "<br>";
            }

            console.log(this.pAllaBud);
        }
    }
}

class Bid {
    constructor(budID, summa, auktionID){
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

        for (let i = 0; i < data.length; i++) {
          var auktion = new Auktion(
            data[i].AuktionID,
            data[i].Titel,
            data[i].Beskrivning,
            data[i].StartDatum,
            data[i].SlutDatum,
            data[i].Gruppkod,
            data[i].Utropspris);

            auktion.LoadBids(true);

            auktionManager.AddAuktion(auktion);
        }
    });
  }

).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//Function CountDown..
function countdown(slutDatum, element, inputBid, buttonBid) {
    var countDownDate = new Date(slutDatum).getTime();

    var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = "<strong>Countdown:</strong> " + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "EXPIRED";
        inputBid.disabled = true;
        buttonBid.disabled = true;
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
    pauktionId.innerHTML = "<strong>AuktionID:</strong> " + auktion.auktionID;
    div.appendChild(pauktionId);

    let pBeskrivning = document.createElement("P");
    pBeskrivning.setAttribute("id", "beskrivning");
    pBeskrivning.innerHTML = "<strong>Beskrivning:</strong> " + auktion.beskrivning;
    div.appendChild(pBeskrivning);

    let pStartDatum = document.createElement("P");
    pStartDatum.setAttribute("id", "startDatum");
    pStartDatum.innerHTML = "<strong>StartDatum:</strong> " + auktion.startDatum;
    div.appendChild(pStartDatum);

    let pSlutDatum = document.createElement("P");
    pSlutDatum.setAttribute("id", "slutDatum");
    pSlutDatum.innerHTML = "<strong>SlutDatum:</strong> " + auktion.slutDatum;
    div.appendChild(pSlutDatum);

    /*
    let pGruppKod = document.createElement("P");
    pGruppKod.setAttribute("id", "gruppkod");
    pGruppKod.innerHTML = "<strong>GruppKod:</strong> " + auktion.gruppkod;
    div.appendChild(pGruppKod);
    */

    let pUtropspris = document.createElement("P");
    pUtropspris.setAttribute("id", "utropspris");
    pUtropspris.innerHTML = "<strong>Utropspris:</strong> " + auktion.utropspris + " kr";
    div.appendChild(pUtropspris);

    let pCountDown = document.createElement("P");
    pCountDown.setAttribute("id", "countdown");
    pCountDown.innerHTML = "<strong>Countdown: </strong>";
    div.appendChild(pCountDown);

    let pHogstaBud = document.createElement("P");
    pHogstaBud.setAttribute("id", "hogstabud");
    pHogstaBud.innerHTML = "<strong>Högsta Bud:</strong> " + auktion.GetHighestBid() + " kr";
    div.appendChild(pHogstaBud);

    auktion.SetHighestBidElement(pHogstaBud);

    
    if (!auktion.IsExpired())
    {
        let aAllaBud = document.createElement("a");
        aAllaBud.setAttribute("href", "javascript:void(0)");
        aAllaBudText = document.createTextNode("Visa Alla Bud (" + auktion.bids.length + "st)");
        aAllaBud.appendChild(aAllaBudText);
        aAllaBud.addEventListener("click", () => auktion.ShowAllBids());
        div.appendChild(aAllaBud);

        let pAllaBud = document.createElement("p");
        div.appendChild(pAllaBud);
        auktion.SetShowAllBidsElement(pAllaBud);
        
    }

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

    if (auktion.IsExpired())
    {
       txtArea.disabled = true;
       button.disabled = true;
    } 

    countdown(auktion.slutDatum, pCountDown, txtArea, button);
    
}

