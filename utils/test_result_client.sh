#!/usr/bin/bash

# Assegniamo il primo argomento a una variabile con un nome chiaro
ID_RICHIESTA=$1

curl -X POST -d "{\"msg_type\":\"test_message_s\", \"msg_content\": {\"id\":$ID_RICHIESTA}}" http://localhost:8080/server.yaws
#	 			{  "msg_type": "test_message_r", 	"msg_content": {  "id": id_message_to_check }}
