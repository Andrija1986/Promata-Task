//a global variable to make it easier to access the car.json file
//eine globale Variable, um den Zugriff auf die Datei car.json zu erleichtern
let globalData;

/* 
GER: Ich erfasse Daten aus der Datei car.json
ENG: I'm capturing data from the car.json file
*/
fetch('./car.json')
    .then(response => response.json())
    .then(data => {
        globalData = data;
        showData(globalData.ford_mustang)
    })
    .catch(error => error.message);

/* 
GER: Funktion, die alle Daten aus der Datei car.json lesen und die Schlüssel und Werte in den angegebenen Feldern anzeigen können soll
ENG: function that should read all the data from the car.json file and be able to display the keys and values in the given fields
*/

function showData(data) {

    //I'm resetting the HTML tag, so I don't have duplicate options
    //Ich setze das HTML-Tag zurück, damit ich keine doppelten Optionen habe
    document.getElementById("delete").innerHTML = "";
    document.getElementById("carOptions").innerHTML = "";

    //made a loop to go through all the properties of the object and display them in HTML
    //hat eine Schleife erstellt, um alle Eigenschaften durchzugehen und sie in HTML anzuzeigen
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            document.getElementById("carOptions").insertAdjacentHTML('afterbegin', `
                <option>${key}</option>`);
            document.getElementById("delete").insertAdjacentHTML('afterbegin', `
                    <option>${key}</option>`);
        }
    }
};


/* 
GER: eine Funktion, mit der ich eine bestimmte technische Option auswähl
ENG: a function by which I select a particular technical option
*/
const getHandler = (event) => {

    //a trigger that displays the values of the car.json file
    //ein Trigger, der die Werte der Datei car.json anzeigt
    document.getElementById("paragraph").innerHTML = `
    <input value=${globalData.ford_mustang[event.target.value]}></input>`
}

/* 
GER: Funktion, mit der ich neue technische Daten hinzufüge, speichere
ENG:function by which I add, save new technical data
*/
const addTechnicData = (event) => {


    //I am accessing the car.json file and so that I can access the values that will be entered in the input tag
    //Ich greife auf die Datei car.json zu und damit kann ich auf die Werte zugreifen, die in das Input-Tag eingetragen werden

    globalData.ford_mustang[`${document.getElementById("key").value
        }`] = document.getElementById("value").value;

    //I update the global variable which is now the file car.json, and whenever it changes, ie. adds new technical data
    //Ich aktualisiere die globale Variable, die jetzt die Datei car.json ist, und wann immer sie sich ändert, dh. fügt neue technische Daten hinzu
    showData(globalData.ford_mustang);

}

/* 
GER: Funktion zum Löschen neuer / alter technischer Daten
ENG: function to delete new / old technical data
*/
const deleteTechnicData = () => {


    //in order to be able to delete data from the car.json file, I have to access it, but I have to access it so that I can access the option and find the exact index that will be chosen to be deleted.
    //Um Daten aus der Datei car.json löschen zu können, muss ich darauf zugreifen, aber ich muss darauf zugreifen, damit ich auf die Option zugreifen und den genauen Index finden kann, der zum Löschen ausgewählt wird.
    delete globalData.ford_mustang[`${document.getElementById("delete").options[document.getElementById("delete").selectedIndex].value}`];

    //I update the global variable which is now the file car.json, and whenever it changes, ie. delete technical data
    //Ich aktualisiere die globale Variable, die jetzt die Datei car.json ist, und wann immer sie sich ändert, dh Technische Daten löschen
    showData(globalData.ford_mustang);
}

/* 
GER: eine Funktion, die die neuesten technischen Daten herunterlädt
ENG: a function that downloads the latest technical data
*/
const downloadTechnicData = () => {

    //the data must be stringed
    //die Daten müssen gestringt werden
    let dataStr = JSON.stringify(globalData);

    //Encodes a text string as a valid component of a unique resource identifier (URI)
    //Codiert eine Textzeichenfolge als gültige Komponente eines eindeutigen Ressourcenbezeichners (URI)
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    //the name of the file when it is downloaded
    //der Name der Datei, wenn sie heruntergeladen wird
    let exportFileDefaultName = 'car.json';

    //I created an anchor tag so that the file could be downloaded
    //Ich habe ein Anchor-Tag erstellt, damit die Datei heruntergeladen werden kann
    let linkElement = document.createElement('a');

    //Sets the attribute value for the specified element. If the attribute already exists, the value is updated; otherwise a new attribute with the specified name and value is added.
    //Legt den Attributwert für das angegebene Element fest. Wenn das Attribut bereits vorhanden ist, wird der Wert aktualisiert; Andernfalls wird ein neues Attribut mit dem angegebenen Namen und Wert hinzugefügt.
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

}





