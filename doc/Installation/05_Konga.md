# Installation / Configuration Konga

[Konga](https://pantsel.github.io/konga/) is an elegant Kong GUI that enables you to manage your Kong API Gateway with ease.  

If you did clone/download the XpaRestDemo project you have a version in %XPAREST_DEMO%\kong\konga  

You can install it with:   
> cd %XPAREST_DEMO%\kong\konga  
> npm i

You can run it with:
> cd %XPAREST_DEMO%\kong\konga  
> npm start

 Konga listens by default on port 1337. To access the GUI point your browser to:
 > http://localhost:1337/

If you start the GUI for the first time you'll have to register a user first.  

If you did alter the Kong configuration by adding/modifying APIs you should dump the configuration to a file. Otherwise your changes will be gone, when the Docker containers with Kong and Cassandra are stopped.
You can use kongfig for this:
> kongfig dump --host localhost:8001 > config.yml
