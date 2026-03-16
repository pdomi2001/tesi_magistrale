-module(ping_pong).
-export([start/0, ping/2, pong/0]).

start() ->
    PongPid = spawn(fun pong/0),
    spawn(fun() -> ping(3, PongPid) end).

% Processo PING - invia ping e aspetta pong
ping(0, PongPid) ->
    PongPid ! stop,
    io:format("Ping: ho finito!~n");

ping(N, PongPid) ->
    PongPid ! {ping, self()},
    receive
        pong ->
            io:format("Ping: ricevuto pong~n"),
            ping(N - 1, PongPid)
    end.

% Processo PONG - aspetta ping e risponde pong
pong() ->
    receive
        {ping, PingPid} ->
            io:format("Pong: ricevuto ping~n"),
            PingPid ! pong,
            pong();
        stop ->
            io:format("Pong: fermato~n")
    end.
