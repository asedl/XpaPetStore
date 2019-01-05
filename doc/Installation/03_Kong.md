# Installation / Configuration Kong API Gateway and platform

## Install a docker network for kong ...
docker network create kong-net

## Install Cassandra ...
docker run -d --name kong-database --network=kong-net -p 9042:9042 cassandra:3

## Migrate / Initialize Cassandra database ...
docker run --rm --network=kong-net -e "KONG_DATABASE=cassandra" -e "KONG_PG_HOST=kong-database" -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" kong:latest kong migrations up

## Start Kong (+Openresty +NGINX) ...
docker run -d --name kong --network=kong-net -e "KONG_DATABASE=cassandra" -e "KONG_PG_HOST=kong-database" -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" -e "KONG_PROXY_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" -p 8000:8000 -p 8443:8443 -p 8001:8001 -p 8444:8444 kong:latest

# Demo / Test

## Create a first (demo) service ...
curl -i -X POST --url "http://localhost:8001/services/" --data "name=xparestdemo_001" --data "url=http://localhost:90/MagicSingleUserEditionScripts/MGrqispi.dll?AppName=XpaTest"
curl -i -X POST --url "http://localhost:8001/services/" --data "name=xparestdemo_003" --data "url=http://host.docker.internal:90/MagicSingleUserEditionScripts/MGrqispi.dll?AppName=XpaTest&PrgName=Customers.Get"

curl -i -X POST --url "http://localhost:8001/services/" --data "name=XpaDemoService" --data "url=http://host.docker.internal:90/MagicSingleUserEditionScripts/MGrqispi.dll"


## Create a route to (demo) service ...
curl -i -X POST --url "http://localhost:8001/services/xparestdemo_001/routes" --data "hosts[]=test1.xpademo.com"
curl -i -X POST --url "http://localhost:8001/services/xparestdemo_002/routes" --data "hosts[]=test2.xpademo.com"

## invoke that service ....
curl -i -X GET --url "http://localhost:8000/" --header "Host: test1.xpademo.com"
curl -i -X GET --url "http://localhost:8000/" --header "Host: test2.xpademo.com"
curl -i -X GET --url "http://localhost:8000/" --header "Host: test3.xpademo.com"


curl -i -X POST --url "http://localhost:8001/services/example-service/plugins/" --data "name=key-auth"

curl -i -X POST --url "http://localhost:8001/consumers/" --data "username=andreas"

curl -i -X POST --url "http://localhost:8001/consumers/andreas/key-auth/" --data "key=API_KEY"

curl -i -X GET --url "http://localhost:8000" --header "Host: example.com" --header "apikey: API_KEY"
