#!/usr/bin/bash
echo "**** Sincronizzo il server YAWS ****"
rsync -v -a -r /usr/share/yaws/www/* /home/paride/tesi/tesi_magistrale/src_erlang/yaws

echo ""
echo "**** Sincronizzo il server PHP ****"
rsync -v -a -r /var/www/html/* /home/paride/tesi/tesi_magistrale/src_erlang/php
