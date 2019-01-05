# Installation / Configuration MongoDB & RESTHeart
Some of the samples use MongoDB to store JSON objects and they use the RESTHeart Web API to access (read / write) data from MongoDB (as an alternative 
to a ODBC based solutions, since Magix Xpa does not really support MongoDB). If you have a proper Docker for Windows installation you can use 
docker-compose to provision MongoDB & RESTHeart. XpaRestDemo does however not take care for persistent storage (like on docker volumes). So either 
you do configure this yourself (when needed) or you install MongoDB and RESTHeart "standalone" on the machine where you have your Magic installation.

