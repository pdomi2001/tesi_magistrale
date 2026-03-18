#!/usr/bin/bash

# Assegniamo il primo argomento a una variabile con un nome chiaro
NUMERO_TESTS=$1

/usr/bin/time -p --output=$NUMERO_TESTS.txt ./stress_test_1.sh $NUMERO_TESTS
#time -o  ./stress_test_1.sh $NUMERO_TESTS >> risultati.txt

