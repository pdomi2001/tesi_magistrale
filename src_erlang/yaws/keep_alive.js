var keepalive_callbackvar;
var keepalive_webpage;
var keepalive_session_id;

function SetKeppAliveCallbackVar(res){ keepalive_callbackvar = res;}

function Keepalive_callback(res)
{
  /* alert("keepalive :"+ res); / * */	
}

/* mantieni viva la sessione */
function Keepalive()
{
  var url = keepalive_webpage + "?phpsessid="+ keepalive_session_id;

  /* callbackvar = ""; */
  /* HTTP.getText(url, SetCallbackVar); */
  HTTP.getText(url, Keepalive_callback);
  /* return callbackvar; */
  t = setTimeout('Keepalive()', keepalive_refresh_time); 
}
/*res = HTTP.getText("http://www.uniurb.it/cla/ricevimento/get_ricevimento_gruppo.php?gruppo=2", alert );  */

/* variabile che memorizza il timer */
var t_keepalive;
var keepalive_refresh_time = 60 * 1000; /* 30 secondi */

function StartKeepAlive(webpage, session_id) {
	clearTimeout(t_keepalive);
	keepalive_webpage = webpage;
	keepalive_session_id = session_id;

	/* t = setTimeout('runSlideShow()', slideShowSpeed) */
	t_keepalive = setTimeout('Keepalive()', keepalive_refresh_time); 
}
/*

	Controllo comandi per questa postazione

*/
var t_commands;
var checkcommands_refresh_time = 5 * 1000; /* 5 secondi */

function StartCheckCommands(webpage, session_id, testcode) {
	clearTimeout(t_commands);
	checkcommands_webpage = webpage;
	checkcommands_session_id = session_id;
	checkcommands_testcode = testcode;

	t_commands = setTimeout('CheckCommands()', checkcommands_refresh_time); 
}

function CheckCommands_callback(res)
{
  // alert("checkcommands :"+ res); 
}

/* Rinfresca le variabili javascript dei comandi */
function CheckCommands()
{
  var url = checkcommands_webpage + "?phpsessid="+ checkcommands_session_id + "&testcode=" + checkcommands_testcode + "&fileformat=set_sessionvars";

  /* callbackvar = ""; */
  /* HTTP.getText(url, SetCallbackVar); */
  HTTP.getText(url, CheckCommands_callback);
  /* return callbackvar; */
  t_commands = setTimeout('CheckCommands()', checkcommands_refresh_time); 
}


