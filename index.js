
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
    .catch(error => console.log(error.message));

/* 
GER: Funktion, die alle Daten aus der Datei car.json lesen und die Schlüssel und Werte in den angegebenen Feldern anzeigen können soll
ENG: function that should read all the data from the car.json file and be able to display the keys and values in the given fields
*/

function showData(data) {


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
    /* 
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                document.getElementById("delete").insertAdjacentHTML('afterbegin', `
                        <option>${key}</option>`);
            }
        }
     */
};


/* 
GER: eine Funktion, mit der ich eine bestimmte technische Option auswähl
ENG: a function by which I select a particular technical option
*/
const getHandler = (event) => {


    document.getElementById("paragraph").innerHTML = `
    <input value=${globalData.ford_mustang[event.target.value]}></input>`
}

/* 
GER: Funktion, mit der ich neue technische Daten hinzufüge, speichere
ENG:function by which I add, save new technical data
*/
const saveTechnicData = (event) => {


    /*   event.preventDefault(); */

    globalData.ford_mustang[`${document.getElementById("key").value
        }`] = document.getElementById("value").value;


    showData(globalData.ford_mustang);

}

/* 
GER: Funktion zum Löschen neuer / alter technischer Daten
ENG: function to delete new / old technical data
*/
const deleteTechnicData = () => {



    delete globalData.ford_mustang[`${document.getElementById("delete").options[document.getElementById("delete").selectedIndex].value}`];
    showData(globalData.ford_mustang);
}

/* 
GER: eine Funktion, die die neuesten technischen Daten herunterlädt
ENG: a function that downloads the latest technical data
*/
const downloadTechnicData = () => {
    let dataStr = JSON.stringify(globalData);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

}





