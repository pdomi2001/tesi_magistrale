/* tempo del conto alla rovescia espresso in secondi 
  20 minuti  = 1200 secondi */
/* var countdowntimer = 1200;  */
var countdowntimer = 1200; 
var textIdForTimeRemaining = "";
var fieldIdForSavingTimeRemaining = "";
var firstTime = true;

/* 
  imposto il blocco di testo dove visualizzare il tempo che rimane 
  Es: <span id="id"></span>
*/
function SetTextIdForTimeRemaining(id)
{
  textIdForTimeRemaining = id;
}

/* 
  imposto il campo hidden che memorizza il tempo che rimane 
  Es: <input name="timeleft" type=hidden value="">
*/
function SetfieldIdForSavingTimeRemaining(id)
{
  fieldIdForSavingTimeRemaining = id;
}

/* Controllo i valori obbligatori */
function CheckValoriObbligatori()
{
	ok = true;
	nomeutenteok = true;
	cognomeutenteok = true;
	// sessook = true;
	// datanascitaok = true;
	// luogonascitaok = true;
	// idclasseok = true;
	
	/* Controllo che il nome venga inserito */
	if (document.getElementById("nome_utente").value == "")
	{
		document.getElementById("nome_utente").style.background = "yellow";
		document.getElementById("nome_utente").style.color = "blue";
		ok = false;
		nomeutenteok = false;
	} else {
		document.getElementById("nome_utente").style.background = "lightgreen";
		document.getElementById("nome_utente").style.color = "black";
	}
	/* Controllo che il cognome venga inserito */
	if (document.getElementById("cognome_utente").value == "")
	{
		document.getElementById("cognome_utente").style.background = "yellow";
		document.getElementById("cognome_utente").style.color = "blue";
		ok = false;
		cognomeutenteok = false;
	} else {
		document.getElementById("cognome_utente").style.background = "lightgreen";
		document.getElementById("cognome_utente").style.color = "black";
	}
	/*
	if (document.esegui_test.cognome_utente.value == "")
	{
		document.esegui_test.cognome_utente.style.background = "red";
		ok = false;
	} else {
		document.esegui_test.cognome_utente.style.background = "white";
	}
	*/
	/*
	if (document.getElementById("sesso").value == "-1")
	{
		document.getElementById("sesso").style.background = "yellow";
		document.getElementById("sesso").style.color = "blue";
		ok = false;
		sessook = false;
	} else {
		document.getElementById("sesso").style.background = "lightgreen";
		document.getElementById("sesso").style.color = "black";
	}
	if (CheckFormDataFieldValid(document.getElementById("data_nascita")))
	{
		document.getElementById("data_nascita").style.background = "lightgreen";
		document.getElementById("data_nascita").style.color = "black";
		document.getElementById("err_data_nascita").innerHTML = "";
	} else {
		if (document.getElementById("data_nascita").value == "")
		{
			document.getElementById("data_nascita").style.background = "yellow";
			document.getElementById("err_data_nascita").innerHTML = "<font color=\"blue\"><strong> Inserire la data.</strong> Controllare che sia nel formato: gg/mm/aaaa.</font>";
			document.getElementById("data_nascita").style.color = "blue";
		} else {
			document.getElementById("data_nascita").style.background = "red";
			document.getElementById("err_data_nascita").innerHTML = "<font color=\"red\"><strong> Formato data non corretto!</strong> Controllare che sia nel formato: gg/mm/aaaa.</font>";
			document.getElementById("data_nascita").style.color = "white";
		}
		ok = false;
		datanascitaok = false;
	}
	if (document.getElementById("luogo_nascita").value == "")
	{
		document.getElementById("luogo_nascita").style.background = "yellow";
		document.getElementById("luogo_nascita").style.color = "blue";
		ok = false;
		luogonascitaok = false;
	} else {
		document.getElementById("luogo_nascita").style.background = "lightgreen";
		document.getElementById("luogo_nascita").style.color = "black";
	}
	if (document.getElementById("id_classe").value == "-1")
	{
		document.getElementById("id_classe").style.background = "yellow";
		document.getElementById("id_classe").style.color = "blue";
		ok = false;
		idclasseok = false;
	} else {
		document.getElementById("id_classe").style.background = "lightgreen";
		document.getElementById("id_classe").style.color = "black";
	}
*/
	if (ok)
	{
		/* startCountDown(); */
	}else{
		// mi metto sul campo sbagliato
		//if (document.getElementById("nome_utente").style.background != "lightgreen")
		if (nomeutenteok == false)
		{
			document.getElementById("nome_utente").focus();
		// }else if (document.getElementById("cognome_utente").style.background != "lightgreen")
		}else if (cognomeutenteok == false)
		{
			document.getElementById("cognome_utente").focus();
		// }else if (document.getElementById("sesso").style.background != "lightgreen")
		}/*else if (datanascitaok == false)
		{
			document.getElementById("data_nascita").focus();
		}else if (luogonascitaok == false)
		{
			document.getElementById("luogo_nascita").focus();
		}else if (sessook == false)
		{
			document.getElementById("sesso").focus();
		// }else if (document.getElementById("data_nascita").style.background != "lightgreen")
		}else if (idclasseok == false)
		{
			document.getElementById("id_classe").focus();
		} */
	}
	return ok;
}

function CheckValoriObbligatori2()
{
	ok = true;
	nomeutenteok = true;
	cognomeutenteok = true;
	
	/* Controllo che il nome venga inserito */
	if (document.getElementById("nome").value == "")
	{
		document.getElementById("nome").style.background = "yellow";
		document.getElementById("nome").style.color = "blue";
		ok = false;
		nomeutenteok = false;
	} else {
		document.getElementById("nome").style.background = "lightgreen";
		document.getElementById("nome").style.color = "black";
	}
	/* Controllo che il cognome venga inserito */
	if (document.getElementById("cognome").value == "")
	{
		document.getElementById("cognome").style.background = "yellow";
		document.getElementById("cognome").style.color = "blue";
		ok = false;
		cognomeutenteok = false;
	} else {
		document.getElementById("cognome").style.background = "lightgreen";
		document.getElementById("cognome").style.color = "black";
	}
	
	/* dati aggiuntivi da modificare per renderlo dinamico */
	if (document.getElementById("da_sesso").value == "-1")
	{
		document.getElementById("da_sesso").style.background = "yellow";
		document.getElementById("da_sesso").style.color = "blue";
		ok = false;
		sessook = false;
	} else {
		document.getElementById("da_sesso").style.background = "lightgreen";
		document.getElementById("da_sesso").style.color = "black";
	}
	if (CheckFormDataFieldValid(document.getElementById("da_data_nascita")))
	{
		document.getElementById("da_data_nascita").style.background = "lightgreen";
		document.getElementById("da_data_nascita").style.color = "black";
		/* document.getElementById("err_data_nascita").innerHTML = ""; */
	} else {
		if (document.getElementById("da_data_nascita").value == "")
		{
			document.getElementById("da_data_nascita").style.background = "yellow";
			/* document.getElementById("err_data_nascita").innerHTML = "<font color=\"blue\"><strong> Inserire la data.</strong> Controllare che sia nel formato: gg/mm/aaaa.</font>"; */
			document.getElementById("da_data_nascita").style.color = "blue";
		} else {
			document.getElementById("da_data_nascita").style.background = "red";
			/* document.getElementById("err_data_nascita").innerHTML = "<font color=\"red\"><strong> Formato data non corretto!</strong> Controllare che sia nel formato: gg/mm/aaaa.</font>"; */
			document.getElementById("da_data_nascita").style.color = "white";
		}
		ok = false;
		datanascitaok = false;
	}
	if (document.getElementById("da_luogo_nascita").value == "")
	{
		document.getElementById("da_luogo_nascita").style.background = "yellow";
		document.getElementById("da_luogo_nascita").style.color = "blue";
		ok = false;
		luogonascitaok = false;
	} else {
		document.getElementById("da_luogo_nascita").style.background = "lightgreen";
		document.getElementById("da_luogo_nascita").style.color = "black";
	}
	if (ok)
	{
		/* startCountDown(); */
	}else{
		// mi metto sul campo sbagliato
		//if (document.getElementById("nome_utente").style.background != "lightgreen")
		if (nomeutenteok == false)
		{
			document.getElementById("nome").focus();
		// }else if (document.getElementById("cognome_utente").style.background != "lightgreen")
		}else if (cognomeutenteok == false)
		{
			document.getElementById("cognome").focus();
		// }else if (document.getElementById("sesso").style.background != "lightgreen")
		}else if (datanascitaok == false)
		{
			document.getElementById("da_data_nascita").focus();
		}else if (luogonascitaok == false)
		{
			document.getElementById("da_luogo_nascita").focus();
		}else if (sessook == false)
		{
			document.getElementById("da_sesso").focus();
		// }else if (document.getElementById("data_nascita").style.background != "lightgreen")
		}/*else if (idclasseok == false)
		{
			document.getElementById("id_classe").focus();
		} */
	}
	return ok;
}

/* faccio partire il countdown */
function startCountDown()
{
  if (firstTime == true)
  {
    setTimeout("CountdownOneSecond()", 1000);
    firstTime = false;
  }
}

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}


/* faccio scendere il tempo rimasto di uno , aggiorno il campo del testo e controllo se è finito il tempo */
function CountdownOneSecond()
{
  countdowntimer--;
  if (countdowntimer > 0)
  {
    if (textIdForTimeRemaining != "")
    {
      var countdownTime = new Date(0, 0, 0, 0, 0, countdowntimer);
      
      var h = countdownTime.getHours();
      var m = countdownTime.getMinutes();
      var s = countdownTime.getSeconds();
      // add a zero in front of numbers<10
      m = checkTime(m);
      s = checkTime(s);
      var stringtime = h+":"+m+":"+s;
      /* se mancano meno di 5 minuti faccio la scritta rossa per porla in evidenza */
      if (countdowntimer < 300)
        stringtime = '<strong style="color: red;">' + stringtime + '</strong>';
      document.getElementById(textIdForTimeRemaining).innerHTML = stringtime;
      UpdateTimeLeftHiddenvalue();
    }
    setTimeout("CountdownOneSecond()", 1000);
  }
  else 
    TimeIsOver();
	// ChiudiTest();
}

function SetCountDownTimer(value)
{
 countdowntimer = value;
}

function ChiudiTest() {
	setTimeout("TimeIsOver()", 5000);
}

/* Il tempo è finito. Consegno il testo automaticamente */
function TimeIsOver()
{
  /* cambio il valore del campo valuta in "Passa alla valutazione del test" per far valutare il test*/
	if (document.getElementById("valuta").value == "") {
		document.getElementById("valuta").value = "Passa alla valutazione del test";
		document.getElementById("esegui_test").submit();
	} else {
		// alert (document.getElementById("valuta").value);
		document.getElementById("valuta").click();
	}
}	
  /* alert("TimeIsOver: todo"); */


function UpdateTimeLeftHiddenvalue()
{
  document.getElementById(fieldIdForSavingTimeRemaining).value = countdowntimer;
}

function CheckFormDataFieldValid(field)
{
  var data;
  var lunghezza;

  data = field.value;
  lunghezza = data.length;
  var todaydate=new Date(); // giorno corrente
  var curyear=todaydate.getFullYear(); // anno corrente
  if (lunghezza == 10)
  {
	var espressione = new RegExp('^[0-9/]+$','i');
	if (!espressione.test(data))
	{
			return false;
	}
    if (
        data.substring(0, 2) < 0 || data.substring(0, 2) > 31  ||
        data.substring(3, 5) < 0 || data.substring(3, 5) > 12  ||
        data.substring(6, 10) < 1900 || data.substring(6, 10) > curyear ||
		(data.substring(2, 3) != "/") || (data.substring(5, 6) != "/")
       )
    {
      /* field.style.backgroundColor = "yellow"; */
      /* field.focus(); */
			return false;
    }else{
      /* tutto ok */
      /* field.style.backgroundColor = "white"; */
			return true;
    }
  
  }else{
    /* field.style.backgroundColor = "yellow"; */
    /* field.focus(); */
		return false;
  }
}

function updateColorSelect(selectName)
{
	var myselect = document.getElementById(selectName); 
	if (myselect.options[myselect.selectedIndex].value.substring(0, 2) == "--")
	{
		myselect.style = "border: 2px solid red;"; 
		myselect.style = "background-color: red;";
	} else {
		myselect.style = "background-color: white;";
		myselect.style = "border: 2px solid green;";
	}
}

/* Nella richiesta codici, in caso il codice fosse nel database, mostra i campi invece delle scritte per permettere di modificarli */
function AttivaModificaDatiScuolaRichiestaCodice(attiva)
{
	var readonly_div = document.getElementById("dati_scuola_readonly");
	var form_div = document.getElementById("dati_scuola_form");
	var readonly_div_testo = document.getElementById("dati_scuola_readonly_testo");
	var form_div_testo_modifica = document.getElementById("dati_scuola_form_testo_modifica");
	var form_div_testo_modifica_testo = document.getElementById("dati_scuola_form_testo_modifica_testo");
	var form_div_testo_nuovo = document.getElementById("dati_scuola_form_testo_nuovo");
	if (attiva)
	{
		readonly_div.style["display"] = "none";
		form_div.style["display"] = "block";
		readonly_div_testo.style["display"] = "none";
		form_div_testo_modifica.style["display"] = "block";
		form_div_testo_modifica_testo.style["display"] = "block";
	} else {
		readonly_div.style["display"] = "block";
		form_div.style["display"] = "none";
		readonly_div_testo.style["display"] = "block";
		form_div_testo_modifica.style["display"] = "none";
		form_div_testo_modifica_testo.style["display"] = "none";
	}
	
}
