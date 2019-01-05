# Installation/Configuration Magic Xpa 3.3

You should already have a proper Magic Xpa 3.3 installation. If not, you can download the free Single User edition from http://info.magicsoftware.com/Magic-xpa-Free-Single-User-Edition ,  which is sufficient for XpaRestDemo project.  Regarding installation / configuration pls. follow the instructions of the vendor. If you have it installed and running you should be able to load the XpaRestDemo project (XpaRestDemo.edp) from its installation directory.  

There's some .INI settings required for the application to run. These you can find in "@Merge INI" /conf/XpaRestDemo.ini. You should adjust the
settings there according to your installation and then merge it in your personal .INI by adding the location of that file to command line, prefixed with an "@" character. 
If you have Magic Xpa installed in c:\Magic\Xpa 3.3, the command line to start Studio would look like following:  
C:\Magic\Xpa3.3\MgxpaStudio.exe \@"C:\Magic\Samples\XpaRestDemo\conf\XpaRestDemo.ini"  

## Installation / Configuration Microsoft IIS
Since there's no Magic requester for NGINX, this demo project uses the existing "Magic & Internet" installation, which is either MS IIS or Apache and which gets configured 
by Magic Xpa Setup program. 

Some of the samples in XpaRestDemo will however need ports 80 (http) and 443 (https) in order to serve the sample content and APIs. If this is the case, you 
will need to have to reconfigure IIS to listen on different ports (like 90 and 453).  

