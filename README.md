API

•	http://progettopawm.ns0.it:8090/api/libri/getAll  --> ritorna tutti i libri (GET)
•	http://progettopawm.ns0.it:8090/api/download/:copertina -->ritorna la copertina di un libro (GET)
•	http://progettopawm.ns0.it:8090/api/upload/caricaLibro  --> carica un libro (POST) 
	o	Parametri: titolo, data, quantita, copertina, genere
•	http://progettopawm.ns0.it:8090/api/prenotazioni/addPrenotazione --> inserisci una prenotazione (POST)
	o	Parametri: utente, libro, dataPrenotazione
•	http://progettopawm.ns0.it:8090/api/prenotazioni/addPrenotazione --> inserisci una prenotazione (PUT)
	o	Parametri: utente, libro, dataRestituzione
•	http://progettopawm.ns0.it:8090/api/prenotazioni/libriUtente/:utente --> ritorna tutti i libri prenotati da un utente (GET) 
•	http://progettopawm.ns0.it:8090/api/prenotazioni/numberlibriUtente/:utente --> ritorna il numero di libri prenotati da un utente (GET)
•	http://progettopawm.ns0.it:8090/api/genere/getAllKinds --> ritorna tutti i generi disponibili (GET)
•	http://progettopawm.ns0.it:8090/api/genere/addGenere --> inserisci una prenotazione (POST)
	o	Parametro: genere
•	http://progettopawm.ns0.it:8090/api/prenotazioni/daRestituire/:utente  -->  ritorna i libri che deve restituire un utente (GET)
•	http://progettopawm.ns0.it:8090api/genere/getDescrizionebyID/:id --> Ritorna la descrizione che ha un determinato id (GET)
•	http://progettopawm.ns0.it:8090/api/authentication/userLogin --> esegue il login di un utente (POST)
	o	Parametri: email, password(SHA256)
•	http://progettopawm.ns0.it:8090/api/authentication/addUser  --> aggiunge un utente (POST) 
o		Parametri: nome, cognome, email, password(SHA256)





