#!/usr/bin/bash

# Assegniamo il primo argomento a una variabile con un nome chiaro
NUMERO_TEST=$1
# Numero di thread contemporanei
NUMERO_THREAD=50

# Azzero il file con l'elenco dei messaggi da controllare
> elenco_id_messaggi.txt

seq $1 | parallel -j $NUMERO_THREAD --bar --joblog send_log.log ./send_message_client.sh 2>> errori_send.txt >>output_send.txt

# ora simulo le interrogazioni dei client per vedere se il messaggio è stato processato

cat elenco_id_messaggi.txt | parallel -j $NUMERO_THREAD --bar --joblog receive_log.log ./test_result_client.sh  2>> errori_receive.txt >>output_receive.txt


