CV API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera arbetserfarenheter i ett så kallat CV. 
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Installation, databas
APIet använder en Mongodb-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket.  
databasdokumentet använder ett schema som ser ut som följande:
const WorkExperienceSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Du måste skicka med namn på företaget"],
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste skicka med din titel på jobbet"],
    },
    location: {
        type: String,
        required: [true, "Du måste skicka med var företaget ligger"],
    },
    startdate: {
        type: Date,
        required: [true, "Du måste skicka med stardatum på din anställning"],
    },
    enddate: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        required: [true, "Du måste skicka med en beskrivning på dina arbetssysslor"],
    },
});

## URL till databasen

http://127.0.0.1:3000/api/workexperience (just nu finns den bara lokalt men här hade den riktiga adressen varit annars)


## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/api         |Välkomstmeddelande endast                                                             |
|GET    |/api/workexperience| Hämtar databasen som ett json-objekt                                             |
|POST   |/api/workexperience|Lagrar en ny arbetserfarenhet. Kräver att companyname, jobtitle, location, startdate, enddate, och description följer med     |
|PUT    |/api/workexperience/:id |Uppdaterar en existerande arbetserfarenhet med angivet ID. Kräver att companyname, jobtitle, location, startdate, enddate, och description följer med|
|DELETE |/api/workexperience/:id |Raderar en arbetserfarenhet med angivet ID.                                                       |

En array av objekt returneras som JSON med följande struktur:
```
{
   companyname:  "McDonalds"
description: "Flipping burgers and cleaning floors"
enddate: "2012-01-01"
id: 3
jobtitle: "fry cook"
location: "Malmö Mobila"
startdate: "2010-01-01"
}
```
