# GrouparbeteAuktion700

* Mikael Larsson
* Lars Berger
* Paulo Nova
* Angel abraham fernandez 

########################################

Beskrivning
Ni skall som grupp skapa en lösning till företaget Nackowskis som arbetar med online
auktioner på nätet. Alla uppgifter sparas i en databas som är tillgänglig via ett web api. Detta
api finns på: http://nackowskis.azurewebsites.net/api/
Krav för att lösningen skall bli godkänd:
- All data måste vara aktuell och hämtas via web api anrop.
- En startvy som visar alla aktuella auktioner. En auktion är öppen om slutdatumet är
senare än aktuellt datum och klockslag. Det skall även att gå att söka på auktioner och
då visas även auktioner som inte är aktuella dvs avslutade. När man sökt fram
auktioner skall det gå att sortera dessa på antingen slutdatum eller utropspris.
- Det skall gå att välja en auktion och sedan se alla bud som finns för den auktionen. Är
auktionen fortfarande öppen kan användaren lägga ett bud. Detta måste vara högre än
det tidigare högsta budet, annars skall användaren meddelas att budet är för lågt.
- Väljs en auktion som inte är öppen skall bara information om auktionen visas samt det
högsta vinnande budet. Det skall inte visas någon budhistorik och det skall inte gå att
lägga bud.
- Via det web api som finns går det att lägga till nya auktioner. Ni kan göra det för att få
testdata. Denna funktionalitet skall inte vara öppen för en vanlig användare i er lösning.
Men ni kan bygga det som en admin del i er lösning.
- Ni har full frihet när det gäller gränssnittet, men det bör synas att ni lagt ned lite tid för
att få det användarvänligt, enkelt och snyggt.
- Github skall användas för att lagra och versionshantera all kod
Betyg
Det går bara att få G och IG på uppgiften. Den är obligatorisk för att kunna få G eller VG på
hela kursen.
Redovisning
Redovisning sker genom att du visar läraren den fungerande uppgiften. Skicka INTE in något
via mail! Senaste tidpunkt för redovisning är sista veckan på kursen. 
 @Nackademin • Tomtebodavägen 3a 171 65 Solna • Tel +46 8 466 60 00 • E-post info@nackademin.se s.2/ 2
