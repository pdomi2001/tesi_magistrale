-module(msg_func).

-export([test_reply/0, test_reply/1]).

test_reply() ->
	io_lib:format("{\"title\": \"post\", \"post\": ~p }", ["test post"]). 

test_reply(Arg) ->
	{ehtml, io_lib:format("{\"title\": \"post\", \"post\": \"~p\" }", [yaws_api:parse_post(Arg)])}. 
	%{ehtml, f("{\"title\": \"post\", \"post\": \"~p\" }", [yaws_api:parse_post(Arg)])}.
