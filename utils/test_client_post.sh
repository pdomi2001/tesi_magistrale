#!/usr/bin/bash
#curl -X POST -d "[{\"msg-type\": \"test\", \"msg-content\": \"test message\" }]" http://localhost:8080/server.yaws
curl -X POST -d "{\"msg_type\": \"test_messaggio\", \"msg_content\": \"test message\" }" http://localhost:8080/server.yaws
curl -X POST -d "{\"msg_type\": \"test_messaggio\", \"numero_iterazioni\": 1, \"nome\": \"Sara\" }" http://localhost:8080/server.yaws

