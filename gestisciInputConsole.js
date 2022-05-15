function  prendiInputDalTermina(){  //funzione che prende gli input dal terminal e restituisce un array con quello che l'utente ha inserito
    return process.argv.slice(2);  //esempio nel terminal: node main.js ./testo1.txt ./testo1modificato.txt pippo
}                                  //ottengo un array che conterrà ['./testo1.txt', './testo1modificato.txt', 'pippo']
 
function prendoArgomentiEIndexConMessaggioErrore(errorString, index) {  //funzione il cui ruolo è quello di prendere gli indirizzi input e output.
    const argomenti = prendiInputDalTermina();  //prendo l'array di input e lo salvo in 'arguments'
    let arg  
    if (argomenti[index]){  //Se l'elemento è presente, lo restituisco all'utente
        arg = argomenti[index]
    } else { //se l'elemento non esiste, lascio un messaggio di errore e interrompo il programma
        console.error(errorString);
        process.exit();
    }
    return arg;
}
 
 function prendoArgomentoOpzionale(index){  //funzione per restituire l'input opzionale
     return prendiInputDalTermina()[index]
 }
 
 exports.prendoArgomentiEIndexConMessaggioErrore = prendoArgomentiEIndexConMessaggioErrore
 exports.prendoArgomentoOpzionale = prendoArgomentoOpzionale
 