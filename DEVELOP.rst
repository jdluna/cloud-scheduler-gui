Cloud Scheduler GUI development

Installation
==============

From your home directory

#. Checkout github repository  and switch to your branch :: 

       git clone https://github.com/pragmagrid/cloud-scheduler-gui.git
       cloud-scheduler-gui
       git checkout multisite

#. Create distribution, run the following commands :: 

       cd UI
       npm install

   Open file **/var/www/html/cloud-scheduler-gui/UI/src/config/endpoints.js**
   and edit first line that specifies endpoint (variable **API_SERVER**) to your URL server and API path. 
   For example ::

       $ const API_SERVER = 'http://rocks-55.sdsc.edu/cloud-scheduler/scripts'

#. Create build using command ::

       npm run build-unix

   This will generate an **app.js** file in your **dist/** directory.  

#.  Deploy **apps.js** file generated in a previous step on your webserver  ::

       sudo cp dist/app.js /var/www/html/cloud-scheduler

Code maintenance
==============

Check in your changes into Github frequently -- Javascript is hard to debug so it's good to be able to backtrack when needed.

#. notify git waht files you want to commit  ::

      git add <name of changed file>
 
#.  use commit command below (It will open an editor) and 
    always use descriptive comments about the change or addition ::

      git commit 

#.  Push your changes from your local repository to the github ::

      git push


