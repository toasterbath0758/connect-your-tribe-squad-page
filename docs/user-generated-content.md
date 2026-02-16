
# Connect Your Tribe - Squad page

## User Generated Content

In deze workshop leer je hoe je data in Directus kunt opslaan met behup van een formulier en je eigen NodeJS server.

### Aanpak

Vandaag gaan we de eerste stappen zetten met het _opslaan_ van gegevens. Afgelopen weken heb je uit de API alleen gegevens _opgehaald_ via een _`GET` request_. Deze week komt opslaan via een _`POST` request_ daar dus bij.

We gaan eerst oefenen met een simpel formulier en een _`POST` request_. Daarna ga je met je team aan de slag om _samen_ één nieuwe squad page te ontwerpen. Hierbij gaan jullie ook rekening houden met _User Generated Content_. Al jullie ideeën voegen jullie samen tot één nieuwe squad page, die jullie komende vrijdag aan de andere teams gaan laten zien tijdens de expo.


## GET vs POST

Tot nu toe heb je—misschien onbewust—vooral met `GET` requests gewerkt. Zowel in je eigen NodeJS server, als bij de API calls naar onze WHOIS database in Directus. Vandaag komen daar `POST` requests bij.

### HTTP
Maar eerst moeten we wat meer vertellen over _HTTP_.

HTTP is een _protocol_ waarmee browsers tegen servers kunnen praten. HTTP maakt gebruik van URLs; adressen van _resources_, zoals HTML, CSS, afbeeldingen, fonts, JSON bestanden, etc. Een browser kan zo'n URL via HTTP binnenhalen (_fetchen_). Onze NodeJS server kan een URL ook via HTTP binnenhalen van bijvoorbeeld Directus. URLs voor je eigen server en website mag je zelf bepalen, via _routing_. De URLs van Directus naar de API staan redelijk vast. Tot zover niks nieuws.

Hieronder staat een tekening van hoe het HTTP _protocol_ werkt. Een website doet een _HTTP request_ naar een server voor een kattenplaatje. De server geeft een _responsce_ met het betreffende plaatje zodat de browser het kan laten zien:  
<img width="948" height="506" alt="image" src="https://github.com/user-attachments/assets/1a7de42e-d8fe-4d70-9178-c7f7027c213b" />

### `GET`
Voor elke URL die je opvraagt, moet je ook bepalen met welke _method_ dat gebeurt. Standaard is dat `GET`. Elk adres dat je invoert in je browser, en elke link die je bezoekt met een `<a href="/een-url">`, zorgt voor een `GET` request. `GET` requests _halen alleen gegevens op_: `GET /something`, that's it. Formulieren gebruiken standaard ook een GET method:

```html
<form action="/">
  <label>
    Zoeken
    <input type="search" name="zoekterm">
  </label>
  <button type="submit">Zoeken maar!</button>
</form>
```

Als je met dit zoekformulier op “fdnd” zoekt, zal de browser na het kliken op de button naar `/?zoekterm=fdnd` gaan, en een `GET` request uitvoeren. Dit formulier verandert niks op de server; het haalt alleen zoekresultaten op, en laat die zien.

### `POST`
Bij het maken van een formulier kun je de method veranderen naar `method="POST"`, waarmee je aangeeft dat je iets naar de server gaat sturen. Je wilt nieuwe gegevens opslaan, een bericht toevoegen, een like uitdelen aan een recept, of een product toevoegen aan je wensenlijst. Al deze acties zorgen voor _User Generated Content_, en daarvoor hebben we dus _`POST` requests_ nodig.

```html
<form action="/product/3" method="POST">
  <button type="submit" name="like">Dit vind ik leuk</button>
</form>
```

Waarschijnlijk verandert door het versturen van dit formulier iets op de server, of in een database. Misschien wordt in het profiel van de bezoeker bijvoorbeeld bijgehouden welke producten leuk worden gevonden. Dit is wat groter dan de micro-interacties die we in Sprint 5 introduceerden.

Een ander voorbeeld, waarmee je bijvoorbeeld een reactie kunt achterlaten onder een nieuwsbericht. Ook dit zal iets in een database toevoegen, en ook voor andere bezoekers van dat nieuwsbericht de data veranderen:

```html
<form action="/nieuws/goud-en-zilver-op-de-500-meter" method="POST">
  <label>
    Reactie
    <textarea name="reactie"></textarea>
  </label>
  <button type="submit">Laat je reactie achter</button>
</form>
```

Als frontender heb je vooral te maken met `POST` requests als je formulieren ontwerpt en maakt. Bedenk hierbij dus dat eigenlijk alles wat iets verandert in een database een formulier nodig heeft. Ook als dat formulier niet als een standaard formulier met invoervelden is ontworpen. Denk hierbij aan “Add to cart” buttons, “Like” buttons, “Favorite” buttons, etc. Je houdt hier (in je breakdown) rekening mee als je een ontwerp omzet naar HTML.

### Bronnen

- [What's HTTP?](https://wizardzines.com/comics/whats-http/)
- [Anatomy of an HTTP request](https://wizardzines.com/comics/anatomy-http-request/)
- [HTTP request methods](https://wizardzines.com/comics/request-methods-1/)
- 💪 [HTTP status codes](https://wizardzines.com/comics/status-codes/)


## Oefenen met een POST

We gaan drie korte oefeningen doen, die steeds complexer worden. We beginnen met een simpel formulier met een POST, daarna gaan we dat in onze eigen server doen, en als laatste gaan we zorgen dat we ook data in Directus kunnen veranderen.

### Oefening 1: een formulier met een POST

Maak als eerste oefening in simpele HTML een pagina die een bericht verstuurt naar een server. Maak een formulier, een tekstveld genaamd `message` en POST deze naar [TODO].

#### Bronnen

- [`<form>`: The Form element @ MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)


### Oefening 2: een formulier met een POST én een server

Om dit te maken, gaan we een pagina met een formulier toevoegen aan onze squad page (van vorige week). Hiermee kunnen we simpele berichten achterlaten.

Maak in je squad-page repository in `server.js` een nieuwe `messages` _array_ aan. Hierin gaan we berichten opslaan.

Maak ook een nieuwe `GET` route aan in `server.js`, bijvoorbeeld naar `/berichten`. Maak een nieuwe view aan, bijvoorbeeld `messages.liquid`, en laat op deze route die view renderen. Geef de `messages` array mee aan die view.

Laat in die view alle huidige berichten zien, in een Liquid `for` loop. Als het goed is, is deze nog leeg.

Maak in die view ook een formulier aan. Geef het formulier `method="POST"` en `action="/berichten"` als attributen. Voeg een invoerveld met de naam `message` en een submit button toe. Let op: alleen formuliervelden met een `name` attribuut worden in een `POST` request meegestuurd door de browser.

Voer `npm start` uit, open de pagina die je net aangemaakt hebt (ga dus naar `/berichten` in je browser), en controleer of je daar jouw formulier te zien krijgt. Probeer ook wat content toe te voegen.

Als het goed is, krijg je een foutmelding, dat je nog niet kunt `POST`en naar deze pagina. Dit komt doordat je nog geen _`POST` route_ hebt aangemaakt in je server. De server luistert alleen naar _`GET` requests_ voor die URL.

In `server.js` staat al een een `POST` route naar `/` klaar. Pas deze route, en de redirect erbinnen, aan naar `/berichten`. Herstart je server, en controleer of je formulier nu wel verstuurd kan worden.

Om de boel ook echt dynamisch te maken, kun je in de `POST` route nu `request.body.message` toevoegen aan de `messages` array. Herstart hierna je server om je allereerste `User Generated Content` te testen.

<details>
<summary>Gebruik deze code als het je niet lukt</summary>

```javascript
// Dit voeg je toe aan server.js

// 1. Maak een lege array aan
let messagesArray = []

// 2. Luister naar GET requests op /berichten
app.get('/berichten', async function (request, response) {
  // Render meteen de messages view, en geef de messages array mee
  response.render('messages.liquid', {
    messages: messagesArray
  })
})

// 3. Luister naar POST requests, ook op /berichten
app.post('/berichten', async function (request, response) {
  // Voeg de inhoud van het tekstveld toe aan de array
  messagesArray.push(request.body.message)
  // En stuur de browser terug naar /berichten, waar die een GET request uitvoert
  // De browser komt hierdoor dus weer “terug” bij 2, waardoor de view opnieuw gerenderd wordt
  response.redirect(303, '/berichten')
})
```

```liquid
{# Dit staat in messages.liquid #}

{% for message in messages %}
   <p>{{ message }}</p>
{% endfor %}

<form method="POST" action="/berichten">
   <label>
     Nieuw bericht:
     <input type="text" name="message" required>
   </label>
   <button type="submit">Voeg toe!</button>
</form>
```

</details>

Deze manier heeft alleen nogal een groot nadeel: Elke keer dat je je server herstart, wordt de `messages` array opnieuw aangemaakt. Je begint in dit geval dus steeds met een schone lei, wat waarschijnlijk niet handig is. Een volgende stap is deze data opslaan in een database, bijvoorbeeld via onze WHOIS API. Het principe is precies hetzelfde: via een `<form>` en een `POST` route stuur je gegevens vanuit de browser naar je eigen server. En jouw server slaat dat op in Directus.

#### Bronnen

- [Basic routing in Express](https://expressjs.com/en/starter/basic-routing.html)
- [For loop in Liquid](https://liquidjs.com/tags/for.html)
- [JS Arrays @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


### Oefening 3: een formulier met een POST, én een server, én Directus

Om de eerdere berichten ook te bewaren, kunnen we een database gebruiken, zoals Directus. Een simpele tabel met berichten, vind je op https://fdnd.directus.app/items/messages. Je kunt hierin als volgt filteren:

- Bijvoorbeeld op alle berichten voor een team, https://fdnd.directus.app/items/messages?filter[for]=Team%20Rocket
- Of voor een bepaalde squad, https://fdnd.directus.app/items/messages?filter[for]=1I & https://fdnd.directus.app/items/messages?filter[for]=1J
- Of voor heel jaar 1, https://fdnd.directus.app/items/messages?filter[for]=FDND%20Jaar%201
- Of wat je zelf ook maar bedenkt als filter, bijvoorbeeld https://fdnd.directus.app/items/messages?filter[for]=demo-16-02

Elke `message` in onze database heeft een `id`, een `created` tijdstip, een `from`, een `text` en een `for` property. En elke message is net als een `person` rechtstreeks te bekijken: https://fdnd.directus.app/items/messages/2910:

```json
{
  "data": {
    "id": 2910,
    "created": "2026-02-15T21:17:02.794Z",
    "from": "Krijn",
    "text": "Hoi!",
    "for": "demo-16-02"
  }
}
```

In plaats van een simpele array aanmaken in onze server, lezen we dan `messages` uit Directus in:

```javascript
app.get('/berichten', async function (request, response) {

  // Filter eerst de berichten die je wilt zien, net als bij personen
  // Deze tabel wordt gedeeld door iedereen, dus verzin zelf een handig filter,
  // bijvoorbeeld je teamnaam, je projectnaam, je person ID, de datum van vandaag, etc..
  const params = {
    'filter[for]': 'demo-16-februari',
  }
  
  // Maak hiermee de URL aan, zoals we dat ook in de browser deden
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(params)
  
  // En haal de data op, via een GET request naar Directus
  const messagesResponse = await fetch(apiURL)
  
  // Zet de JSON daarvan om naar een object
  const messagesResponseJSON = await messagesResponse.json()
  
  // Die we vervolgens doorgeven aan onze view
  response.render('messages.liquid', {
    messages: messagesResponseJSON.data
  })

})
```

Het bewaren in Directus is iets ingewikkelder dan onze `messages.push()` uit de tweede oefening. We kunnen in onze tabel een `for`, `from` en `text` opslaan, en dat doen we als volgt:

```javascript
app.post('/berichten', async function (request, response) {

  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch('https://fdnd.directus.app/items/messages', {

    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: 'POST',

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: 'demo-16-februari',
      // En dit is ons eerdere formulierveld
      text: request.body.message
    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }

  })

})
```

That's it :)

Verzin een eigen filter, en gebruik die om je eigen berichten op te slaan in onze Directus database. Herstart je server, en merk op dat de berichten gewoon bewaard blijven. Vet!

Als dit allemaal gelukt is, wordt het tijd om weer met je team aan de slag te gaan..

#### Bronnen

- [Directus API](https://directus.io/docs/api/items)
- [JSON.stringify() @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## Kill Your Darlings (Ouch!)

Itereren betekent het herhalen en verbeteren van een ontwerp of product, op basis van feedback en nieuwe inzichten. Dit zorgt ervoor dat je stap voor stap tot een beter resultaat komt. In de _development lifecycle_ is iteratie essentieel: het zorgt voor een continue cyclus van ontwerpen, ontwikkelen, testen en verbeteren, wat leidt tot een gebruiksvriendelijker en beter functionerend eindproduct.

Vorige week hebben jullie hier al mee geoefend: Jullie hebben zes ideeën geschetst voor de squad page en één daarvan verder uitgewerkt in code. Vandaag maken jullie opnieuw een iteratie, deze keer binnen het team.

![](convergeren-divergeren.png)


### Maak één ontwerp

Bekijk binnen je team elkaars gemaakte squad pages [zorgvuldig en geef elkaar feedback](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/code-design-review-design-squadpage.md#analyseer-het-gemaakte-werk), als jullie dat nog niet hebben gedaan. Besluit daarna met welk concept jullie doorgaan deze week. Bespreek welke goede ideeën uit de andere concepten jullie zouden kunnen samenvoegen.

⚠️ WARNING: Het kan pijnlijk zijn om los te laten waar je aan hebt gewerkt, maar trust the process. Door te itereren wordt het werk beter!

Schets allemaal 3 nieuwe ideeën op papier, op basis van wat jullie de afgelopen weken hebben geleerd. Omdat _User Generated Content_ deze week centraal staat, is het ook de bedoeling dat jullie iets bedenken waarmee je content _toe kunt voegen_ aan je squad page. Denk bijvoorbeeld aan Likes uitdelen, berichten bij iemand, een team of een hele squad achterlaten, of iets waarmee je verschillende teams vrijdag kunt beoordelen.

Kies samen één schets en werk dit verder uit. Maak eerst een grove schets en werk dit eventueel uit in een hi-fi schets of in Figma. Deze week gaan jullie samen verder met dit nieuwe ontwerp.

Werk ook [een Wireflow uit voor de interacties](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/filteren-en-sorteren.md#wireflow-schetsen), en overleg over jullie [URL design](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/filteren-en-sorteren.md#url-design).

<!--
Ook de foto van 'u bent nu hier' aanpassen en hier plaatsen, maar dan het pijltje een stapje verder plaatsen
-->


## Maak één squad page

Kies één persoon uit jullie team die de nieuwe [team-squad-page repository](https://github.com/fdnd-task/connect-your-tribe-team-squad-page) forkt. Deze persoon voegt de rest van het team toe als _Collaborators_. Let op: dit is dus _niet_ de bestaande squad-page repository, waar je tot nu toe in werkte, maar een nieuwe.

Clone daarna allemaal _die_ fork, en onderzoek lokaal hoe deze repository werkt. Gebruik `npm install` en `npm start` om de site bij jou lokaal te laten werken, en help elkaar als je er niet uit komt. Er zit wat voorbeeld code in waarmee je gegevens op kunt slaan in onze `messages` API. Dit gebeurt via een `POST` request (`fetch()`) naar Directus. Waarschijnlijk heeft jullie idee ook zoiets nodig.

Bedenk samen hoe jullie het werk gaan verdelen en uit gaan voeren deze week. Maak behapbare taken en issues aan, en verdeel het werk eerlijk binnen het team. Oefen met het opsplitsen van grote taken in kleinere, zodat je taken van bijvoorbeeld 1 tot 2 uur overhoudt. Denk na over de volgorde van werk, en hoe de verschillende fases van de development lifecycle in taken terugkomen. Hoe gaan jullie om met testen? En hoe met integreren? Maak duidelijke afspraken en gebruik _issue assignment_ als dat jullie handig lijkt. Denk nog eens goed aan wat je na Sprint 4 wilde verbeteren, en pas dat nu toe. Ook hierbij: help elkaar om verder te komen, wees open over wat je wel en (nog) niet kunt, en gebruik deze week om meer te leren over het werken met NodeJS, JSON APIs, Liquid en dynamische data.

Zorg dat je kleine commits maakt, en vaak pusht. Leer jezelf het gebruik van _Partial Commits_ aan, als je dat nog niet gedaan hebt. Je maakt hiermee het samenwerken makkelijker.

Pro-tip: maak een HTML prototype van de nieuwe concepten die jullie verzonnen hebben, zodat je snel kunt testen of je ook echt iets op kunt slaan.

💪 En wil je iets veranderen of toevoegen in het `custom` field van een `person`? Dan heb je bij Directus [een `PATCH` request](https://directus.io/docs/api/items#update-an-item) nodig.

Zet 'm op!
