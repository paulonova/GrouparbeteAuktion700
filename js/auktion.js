



GetData();


async function GetData(){

 let myResponse = await fetchData ('http://nackowskis.azurewebsites.net/api/Auktion/700/')

 let myTextTag = document.getElementById('uno');
 let myTextTag2 = document.getElementById('dos');
 let myTextTag3 = document.getElementById('tres');
 let slutDatum = document.getElementById('slutDatum');
 let startDatum = document.getElementById('startDatum');

 let text = myResponse[0].AuktionID //+ ", " + myResponse.Titel + ", " + myResponse.Beskrivning + ", " + myResponse.StartDatum + ", " + myResponse.SlutDatum + ", " + myResponse.Gruppkod + ", " + myResponse.Utropspris;
 let text2 = myResponse[0].Titel
 let text3 = myResponse[0].Beskrivning
 let text4 = myResponse[0].SlutDatum
 let text5 = myResponse[0].StartDatum


 let textNode = document.createTextNode(text);
 let textNode2 = document.createTextNode(text2);
 let textNode3 = document.createTextNode(text3);
 let textNode4 = document.createTextNode(text4);
 let textNode5 = document.createTextNode(text5);

 myTextTag.appendChild(textNode);
 myTextTag2.appendChild(textNode2);
 myTextTag3.appendChild(textNode3);
 slutDatum.appendChild(textNode4);
 startDatum.appendChild(textNode5);

 let countDown = slutDatum.appendChild(textNode4);

}
async function fetchData(url){


 let promise = await fetch(url);
 let data = await promise.json();
 return data;
}







// Set the date we're counting down to


var countDownDate = new Date("2018-03-31T00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("countDown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countDown").innerHTML = "EXPIRED";
    }
}, 1000);


function myFunction() {
    alert(slutDatum);
}


//Function to open and close menubar..
/* ************************************/

closeSidebar();

function openSidebar() {
    document.getElementById("mySidebar").style.display = "block";
}
function closeSidebar() {
    document.getElementById("mySidebar").style.display = "none";
}
