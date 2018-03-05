Cloud Scheduler GUI development

Installation
==============

From your home directory

#. git clone https://github.com/pragmagrid/cloud-scheduler-gui.git

#. cd cloud-scheduler-gui

#. git checkout <branch name>

#. cd UI

#. npm install

#. open file "/var/www/html/cloud-scheduler-gui/UI/src/config/endpoints.js" and change endpoint of "API_SERVER" (first line) to your URL server and API path.  For example ::

  $ const API_SERVER = 'http://rocks-55.sdsc.edu/cloud-scheduler/scripts'

#. npm run build-unix

This will generate an app.js file in your dist directory.  Copy this to the html dir

#. sudo cp dist/app.js /var/www/html/cloud-scheduler

Check in your changes into Github frequently -- Javascript is hard to debug so it's good to be able to backtrack when needed.

#. git add <name of changed file>
 
#. git commit

#. git push


