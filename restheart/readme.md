# MongoDB abd RESTHeart
Some of the samples do store data in a MongoDB and do use RESRHeart to access this DB / data.  
More information about RESTHeart you can find here: https://restheart.org  

Provisioning is with docker-compose. You need to have Docker properly installed on your machine.

$ mkdir restheart && cd restheart
$ curl https://raw.githubusercontent.com/SoftInstigate/restheart/master/docker-compose.yml --output docker-compose.yml
$ docker-compose up -d

## create a database
curl -v -u admin:changeit -X PUT localhost:8080/db { "desc": "magic"}

## create a collection
curl -v -u admin:changeit -X PUT localhost:8080/db { "desc": "XpaRestDemo"}


