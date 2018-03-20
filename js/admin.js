

/**************************************************/
/** PAULO ==>  CREATE AUKTION METHODS */
/**************************************************/




/*************************************************************************** */
/** ANGEL ARBETE *********************************************************** */
/*************************************************************************** */
//Auktion delete -Angel

document.querySelector("#delBtn").addEventListener("click", adelete);

function adelete() {


  let id = document.querySelector("#auktionDelId").value;
  document.querySelector("#auktionDelId").value = " ";


  //Delete Bud!
  fetch(`http://nackowskis.azurewebsites.net/api/Bud/700/${id}`, {
    method:'Delete',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type':'application/json'
    },
    body:JSON.stringify({})
  })
  .then((res) => res.json());

  //Delete Auktion
  fetch(`http://nackowskis.azurewebsites.net/api/Auktion/700/${id}`, {
      method:'Delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({})
    })
    .then((res) => res.json());

    
    }


//Function to create new auktion -Angel
document.querySelector("#head-form").addEventListener("submit", creating);
document.querySelector("#create-aukt-btn").addEventListener("click", creating);

function creating() {

  let id1 = document.getElementById("auktion-id").value;
  let id2 = document.getElementById("title").value;
  let id3 = document.getElementById("beskrivning").value;
  let id4 = document.getElementById("startdatum").value;
  let id5 = document.getElementById("slutdatum").value;
  let id6 = document.getElementById("gruppkod").value;
  let id7 = document.getElementById("utropspris").value;

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



  document.getElementById("auktion-id").value="";
  document.getElementById("title").value="";
  document.getElementById("beskrivning").value=""
  document.getElementById("gruppkod").value=""
  document.getElementById("utropspris").value=""
  document.getElementById("startdatum").value=""
  document.getElementById("slutdatum").value=""



  }
