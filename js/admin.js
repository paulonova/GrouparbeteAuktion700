

/**************************************************/
/** PAULO ==>  CREATE AUKTION METHODS */
/**************************************************/


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
        }
    }

function deleteAuktion(){
    var idInput = document.getElementById("auktionDelId").value;
    console.log("==> " + idInput);
    var url = "";


    function remove(event){
        event.preventDefault()
        var id = event.target.getAttribute("data-id")
        fetch(apiUrl + "/" + id,{
          method: 'DELETE'
        }).then(function(){
          todos.removeChild(event.target.parentNode)
        })
          }
          fetch(apiUrl + ".json").then(function(response){
        response.json().then(function(todos){
          todos.forEach(li)
        })
          })



}



function createNewAuktion(){

    var newAuktion = new Auktion(
        auktionID = document.getElementById("auktionId").value,
        titel = document.getElementById("title").value,
        beskrivning = document.getElementById("beskrivning").value,
        startDatum = document.getElementById("startDatum").value,
        slutDatum = document.getElementById("slutDatum").value,
        gruppkod = document.getElementById("gruppKod").value,
        utropspris = document.getElementById("utropsPris").value,
        
    )

    console.log(
        newAuktion.auktionID, 
        newAuktion.titel, 
        newAuktion.beskrivning, 
        newAuktion.startDatum, 
        newAuktion.slutDatum, 
        newAuktion.gruppkod, 
        newAuktion.utropspris 
    );


}


/*************************************************************************** */
/** ANGEL ARBETE *********************************************************** */
/*************************************************************************** */
//Auktion delete -Angel

document.querySelector("#wrapper-delete").addEventListener("submit", adelete);
document.querySelector("#wrapper-delete").addEventListener("click", adelete);
function adelete() {

    const id = document.querySelector("#auktion-del-id").value;

    fetch(`http://nackowskis.azurewebsites.net/api/Auktion/700/${id}`, {
      method:'Delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({})
    })
    .then((res) => res.json())
    }


//create new auktion -Angel

document.querySelector("#head-form").addEventListener("submit", creating);
document.querySelector("#create-aukt-btn").addEventListener("click", creating);

function creating() {

  const id1 = document.getElementById("auktion-id").value;
  const id2 = document.getElementById("title").value;
  const id3 = document.getElementById("beskrivning").value;
  const id4 = document.getElementById("startdatum").value;
  const id5 = document.getElementById("slutdatum").value;
  const id6 = document.getElementById("gruppkod").value;
  const id7 = document.getElementById("utropspris").value;

  let formdata = {
    "AuktionID":id1,
    "Titel":id2,
    "Beskrivning":id3,
    "StartDatum":id4,
    "SlutDatum":id5,
    "Gruppkod":id6,
    "Utropspris":id7
  }

  fetch("http://nackowskis.azurewebsites.net/api/Auktion/700/", {
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type':'application/json'
    },
    body:JSON.stringify(formdata)
  })
  .then((res) => res.json())
  }

