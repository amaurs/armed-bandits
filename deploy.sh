#!/bin/sh

OPTIONS="-avzC --exclude-from exclude.txt"
TRANSPORT='ssh -p 22'
CONNECTION='root@96.126.98.33'
REMOTE_PATH='/home/amaury/www/sites/amaurs.com/reinforcement'

rsync $OPTIONS -e "$TRANSPORT" . $CONNECTION:$REMOTE_PATH