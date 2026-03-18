#!/usr/bin/bash

ID_CHIAMATA=$1

# Supponiamo che la risposta arrivi da una chiamata curl
RISPOSTA_JSON=$(curl -X POST -d "{\"msg_type\":\"test_message_m\", \"msg_content\": {\"numero_iterazioni\":$ID_CHIAMATA,\"test\":\"Sara\"}}" http://localhost:8080/server.yaws)

# Estraiamo l'id_message usando jq
ID_ESTRATTO=$(echo "$RISPOSTA_JSON" | jq -r '.risposta.result_content.id_message')

# Assegniamo il primo argomento a una variabile con un nome chiaro
echo $ID_ESTRATTO >> elenco_id_messaggi.txt

#sleep 20
