const scriviLeggiFile = require('./scriviLeggiFile.js')  
const gestisciInputConsole = require('./gestisciInputConsole.js')
const strumentiPerIlTesto = require('./strumentiPerIltesto.js')

const inputUrl = gestisciInputConsole.prendoArgomentiEIndexConMessaggioErrore('Non riesco a prendere input',0) 
const outputUrl = gestisciInputConsole.prendoArgomentiEIndexConMessaggioErrore('Non riesco a prendere output',1) 
const parolaDaCercare = gestisciInputConsole.prendoArgomentoOpzionale(2)
const ilMioFile = scriviLeggiFile.leggiUnFileConURL(inputUrl)
const numeroDiCaratteri = strumentiPerIlTesto.contaIlNumeroDiCaratteri(ilMioFile)
const numeroDiCaratteriSenzaSpazi = strumentiPerIlTesto.contaIlNumeroDiCaratteriSenzaSpazi(ilMioFile)
const numeroDiParole = strumentiPerIlTesto.contoIlNumeroDiParoleInUnaStringa(ilMioFile)
let frequenza = -1;
if(parolaDaCercare) frequenza = strumentiPerIlTesto.contoQuanteVolteUnaParolaAppare(parolaDaCercare, ilMioFile)
const report = strumentiPerIlTesto.generaIlTestoPiuIlMessaggioDiReport(ilMioFile,parolaDaCercare,numeroDiCaratteri,numeroDiCaratteriSenzaSpazi,numeroDiParole,frequenza)
scriviLeggiFile.scriviUnFileConURL(outputUrl,report)
let arrayTemp = strumentiPerIlTesto.contaQuanteVolteAppaionoTutteLeParole(ilMioFile)
// arrayTemp.forEach(element => console.log(element))
arrayTemp.sort((p,c) => c[1] - p[1]).forEach(element => console.log(element))// Stampa ordinata per frequenza


