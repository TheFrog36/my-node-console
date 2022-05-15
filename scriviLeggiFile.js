const fileSystem = require('fs');  //Aggiungo fs al codice per poter usare readfileSync e writeFileSync

function leggiUnFileConURL(inputUrl){  //Creo una funzione che riceve in input l'indirizzo di un file (inpuUrl)
    let fileData;  //creo una variabile che conterrà il testo del file se tutto va bene
    try{  //Con il try posso provare un pezzo di codice. Se non funziona, il codice mi da un messaggio di errore che salvo in 'error' ed eseguo il catch
        fileData = fileSystem.readFileSync(inputUrl, 'utf8');  //leggo il file con indirizzo 'inputUrl' passato dall'utente.
    } catch (error) {  //Se la lettura del file fallisce, entro nel catch e salvo il messaggio di errore in 'error'
        console.log('Non riesco a leggere il file \n', error.message);  //Stampo un messaggio di errore più comprensibile e poi il messaggio di errore specifico
        process.exit();  //dato che il file di input è obbligatorio, interrompo il programma se non riesco a leggerlo.
    }
    return fileData;  //se tutto funziona, restituisco all'utente il contenuto del file letto
}

function scriviUnFileConURL(outputUrl, testo){  //funzione di scrittura di un file. Prende un indirizzo in cui andare a creare il file e il contenuto da inserirci
    try{
        fileSystem.writeFileSync(outputUrl, testo);  //scrivo il file grazie alla funzione writeFileSync che prende come argomenti l'indirizzo e il contenuto
    } catch(error){
        console.log('Non riesco a scrivere il file', error.message)
        process.exit()
    }
}
//essendo questo un file di file di funzioni, le esporto così che possano essere usate da altri file.
exports.leggiUnFileConURL = leggiUnFileConURL 
exports.scriviUnFileConURL = scriviUnFileConURL