#!/usr/bin/bash
# Assegniamo il primo argomento a una variabile con un nome chiaro
ID_CHIAMATA=$1
#curl -X POST -d "[{\"msg-type\": \"test\", \"msg-content\": \"test message\" }]" http://localhost:8080/server.yaws
#curl -X POST -d "{\"msg_type\": \"test_messaggio\", \"msg_content\": \"test message\" }" http://localhost:8080/server.yaws
#curl -X POST -d "{\"msg_type\": \"test_messaggio\", \"numero_iterazioni\": 1, \"nome\": \"Sara\" }" http://localhost:8080/server.yaws
#curl -X POST -d "{\"msg_type\":\"test_messaggio\",\"numero_iterazioni\":1,\"nome\":\"Sara\"}" http://localhost:8080/server.yaws
curl -X POST -d "{\"msg_type\":\"test_message_m\", \"msg_content\": {\"numero_iterazioni\":$ID_CHIAMATA,\"test\":\"Sara\"}}" http://localhost:8080/server.yaws

