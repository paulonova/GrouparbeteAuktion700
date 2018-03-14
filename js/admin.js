

/**************************************************/
/** PAULO ==>  CREATE AUKTION METHODS */
/**************************************************/

function deleteAuktion(){
    var idInput = document.getElementById("auktionId").value;
    console.log(idInput);
    var url = "";
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
