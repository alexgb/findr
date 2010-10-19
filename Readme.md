#Install


1) install npm, see [website](http://github.com/isaacs/npm)

    curl http://npmjs.org/install.sh | sh

2) install required packages

    rake install
    
3) create your settings file in `config/settings.json`

4) create upstart script like the following and install into `/etc/init/findr.conf`

    \#!upstart
    description "find'r node.js server"
    author      "AUTHOR"

    start on startup
    stop on shutdown

    env NODE_PATH=/home/alex/local/lib/node

    respawn
    
    script
        cd /PATH/TO/PROJECT
        exec sudo -u USER /PATH/TO/NODE /PATH/TO/PROJECT/server.js >> /PATH/TO/PROJECT/tmp/logs/node.log 2>&1
    end script
    
    
5) create web server configuration to proxy requests to node. This is for static requests only.

    <VirtualHost *:80>
      ServerName MYHOST.EXAMPLE.COM
      ProxyPass / http://127.0.0.1:CONFIG_PORT/
      ProxyPassReverse / http://127.0.0.1:CONFIG_PORT/
      ProxyPreserveHost On
    </VirtualHost>
    
6) upstart the application 

    sudo start findr