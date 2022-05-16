function contaIlNumeroDiCaratteri(testo) {  //Prendo come argomento una stringa
    return testo.length;  //restituisco la lunghezza di quella stringa
}

function contaIlNumeroDiCaratteriSenzaSpazi(testo) {  //prendo in input una stringa
    let stringaSenzaSpazi = testo.replaceAll(' ', '');  //tolgo gli spazi alla stringa
    return contaIlNumeroDiCaratteri(stringaSenzaSpazi);  //restituisco il numero di caratteri
}

function pulisciStringa(testo) {
    const stringaPulita = testo.replaceAll("'", ' ')  //creo una nuova stringa in cui i caratteri speciali del testo sono stati sostituiti con degli spazi
        .replaceAll('.', ' ')
        .replaceAll(',', ' ')
        .replaceAll('!', ' ')
        .replaceAll('\n', ' ')
        .replaceAll('\r', ' ');
    return stringaPulita;  //resituisco il testo pulito
}

function creaUnArrayDiParoleDaUnTesto(testo) {
    let testoPulito = pulisciStringa(testo);  //prendo il testo e rimuovo tutti caratteri speciali
    testoPulito = testoPulito.split(' ');  //rendo il testo pulito un array di parole invece di una stringa. La separazione è basata sullo spazio
    testoPulito = testoPulito.filter((e) => e !== '')  //filtro l'array per eliminare gli elementi vuoti   es:  ['ciao','','','mondo'] diventa ['ciao','mondo']
    return testoPulito
}

function contoIlNumeroDiParoleInUnaStringa(testo) {  //ricevo nella funzione una stringa
    const arrayDiParole = creaUnArrayDiParoleDaUnTesto(testo);  //trasformo la stringa in un array di parole usando la funzione creata precedentemente
    return arrayDiParole.length;  //restituisco la lunghezza dell'array
}

function contoQuanteVolteUnaParolaAppare(parolaDaCercare, testo) {  //funzione per contare quante volte una parola (parolaDaCercare) appare in un testo (testo)
    let contatore = 0;  //creo un contatore che parte da 0
    const arrayDiParole = creaUnArrayDiParoleDaUnTesto(testo)  //trasformo il testo in un array di parole
    for (const parola of arrayDiParole) {  //creo un ciclo for per controllare tutte le parole dell'array appena creato
        if (parola.toLowerCase() === parolaDaCercare.toLowerCase()) {  //rendo le parola da cercare e la parola dell'array minuscole e poi controllo se sono uguali. 
            contatore++;  //Se sono uguali, aumento il mio contatore di 1
        }
    }
    return contatore;
}

function generaIlTestoPiuIlMessaggioDiReport(testoOriginale, parolaDaCercare, numeriDiCaratteri, numeroDiCaratteriSenzaSpazio, numeroDiParole, frequenza) {
    let stringaFrequenza = '';  //creo una stringa che conterrà la parola che voglio cercare, se è stata inserita
    if (frequenza >= 0) {
        stringaFrequenza = 'la parola "' + parolaDaCercare + '" appare ' + frequenza + (frequenza === 1 ? ' volta' : ' volte')
    }   // faccio una funzione lambda che restituisce 'volta' se la parola da cercare è apparsa una sola volta, e 'volte' altrimenti
    const report = testoOriginale +  //creo un nuovo testo che conterrà il testo originale e un messaggio di report
        '\n' +
        '\n' +
        'numero di caratteri: ' + numeriDiCaratteri + '\n' +
        'numero di caratteri spazi esclusi: ' + numeroDiCaratteriSenzaSpazio + '\n' +
        'numero di parole: ' + numeroDiParole + '\n' +
        stringaFrequenza;
    return report  //restituisco il testo modificato
}

function contaQuanteVolteAppaionoTutteLeParole(testoOriginale) {  //soluzione contorta con array e ricerca binaria
    let arrayParole = creaUnArrayDiParoleDaUnTesto(testoOriginale);
    arrayParole = arrayParole.map(element => element.toLowerCase());
    let arrayDiParoleUnicheContate = [];
    arrayDiParoleUnicheContate.push([arrayParole.pop(), 1])  //Inserisco un elemento per evitare che il codice si rompa
    for (const parola of arrayParole) {
        const indice = ricercaBinaria(arrayDiParoleUnicheContate, parola);
        // console.log(arrayDiParoleUnicheContate)
        if (indice >= 0) arrayDiParoleUnicheContate[indice][1]++; //Se mi torna il middle positivo, significa che ho trovato la parola e aggiungo 1 al contatore
        else arrayDiParoleUnicheContate.splice((indice === -Infinity ? 0 : indice * -1), 0, [parola, 1]);  //Se trovo -infinity, aggiungo una nuova parola in pos 0
    }
    return arrayDiParoleUnicheContate;
}

function ricercaBinaria(array, elementoDaCercare) {
    let left = 0;
    let right = array.length - 1;
    let middle = 0;
    while (left <= right) {  
        middle = Math.floor((left + right) / 2);
        if (array[middle][0].localeCompare(elementoDaCercare) === -1) left = middle + 1;
        else if (array[middle][0].localeCompare(elementoDaCercare) === 1) right = middle - 1;
        else return middle;  
    }  //fino a qua è una ricerca binaria classica
    if(elementoDaCercare.localeCompare(array[middle][0]) === 1) middle++  //controllo se l'elemento devo metterlo a sinistra o destra
    return middle === 0 ? -Infinity : middle * -1 //Mi salvo ugualmente il middle in negativo se non trova il valore così posso mettere il nuovo elemento alla destra di middle*-1
    //Per creare un nuovo elemento in posizione 0 di arrayDiParoleUnicheContate, lo segno come -infinity
}

function contaQuanteVolteAppaionoTutteLeParoleConPercentuale(testoOriginale){
    let arrayDiParoleContate = contaQuanteVolteAppaionoTutteLeParole(testoOriginale)
    const lunghezzaArray = contoIlNumeroDiParoleInUnaStringa(testoOriginale)
    arrayDiParoleContate.map(element => element.push(element[1] / lunghezzaArray * 100))
    return arrayDiParoleContate
}
exports.contaIlNumeroDiCaratteri = contaIlNumeroDiCaratteri;
exports.contaIlNumeroDiCaratteriSenzaSpazi = contaIlNumeroDiCaratteriSenzaSpazi;
exports.contoIlNumeroDiParoleInUnaStringa = contoIlNumeroDiParoleInUnaStringa;
exports.contoQuanteVolteUnaParolaAppare = contoQuanteVolteUnaParolaAppare;
exports.generaIlTestoPiuIlMessaggioDiReport = generaIlTestoPiuIlMessaggioDiReport;
exports.contaQuanteVolteAppaionoTutteLeParole = contaQuanteVolteAppaionoTutteLeParole;
exports.contaQuanteVolteAppaionoTutteLeParoleConPercentuale = contaQuanteVolteAppaionoTutteLeParoleConPercentuale;