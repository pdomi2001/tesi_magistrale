#!/usr/bin/bash
curl -X POST -d "[{\"msg-type\": \"test\", \"msg-content\": \"test message\" }]" http://localhost:8080/server.yaws

