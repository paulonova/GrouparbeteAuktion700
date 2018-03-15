

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
