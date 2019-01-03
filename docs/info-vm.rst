

Using virtual machines
=============================

.. contents::

Introduction
---------------

This is a summary of using a virtual machine for cloude scheduler GUI
development and testing.  

Login
~~~~~~

To login to your virtual machine you will need to use ssh.  The virtual
machine FQDN (fully qualified host name) is given to you in email. ::

    ssh root@FQDN

You will be working in root account to be able to accesss the database and
GUI installations. 


Installed software
-------------------

Most of the software that you need is already installed and you will do your
updates in place. 

#. Cloud scheduler GUI is installed in 
  
   #. /var/www/html/cloud-scheduler

      This is the web interface

   #. /opt/cloud-scheduler

      Source code for cloud scheduler

MySQL database
------------------

The cloud scheduler uses MySQL database **pragma** on its backend. 
You will be able to access the database directly when needed. ::

  # mysql pragma
  
Making changes to GUI
-------------------
To make changes to the GUI, you will need to make your changes in /opt/scheduler and copy the application over to /var/www/html/cloud-scheduler as follows ::

   # cd /opt/cloud-scheduler/UI
   # npm run build-linux
   
After it completes a new file will be created at src/app/app.js ::

   # cp src/app/app.js /var/www/html/cloud-scheduler/
     
You can then view the changes using http://<FQDN>/cloud-scheduler.  To view the admin username and password, type::

   # cat ~/cloud-gui.login
   
During testing you may need a valid session id if you are testing from the browser.  E.g.

http://<FQDN>/cloud-scheduler/scripts/CreateReservation.py?sites_id=UCSD&session_id=A6H8SG&… 

To get session id ::

  # mysql pragma
  Reading table information for completion of table and column names
  You can turn off this feature to get a quicker startup with -A
  
  Welcome to the MySQL monitor.  Commands end with ; or \g.
  Your MySQL connection id is 1403332
  Server version: 5.1.73 Source distribution
  
  Copyright (c) 2000, 2013, Oracle and/or its affiliates. All rights reserved.
  
  Oracle is a registered trademark of Oracle Corporation and/or its
  affiliates. Other names may be trademarks of their respective
  owners.
  
  Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

  mysql> select * from session;
  +---------+------------+---------------------+--------+
  | user_id | session_id | last_login          | status |
  +---------+------------+---------------------+--------+
  |       7 | 1GQXMY     | 2017-10-17 23:44:58 |      1 |
  |       8 | 53PVNM     | 2017-11-07 15:12:32 |      1 |
  |       4 | 5GBL95     | 2017-10-18 18:58:28 |      1 |
  |       1 | A6H8SG     | 2018-02-07 13:39:29 |      0 |
  |       9 | ACHFBG     | 2017-12-10 20:26:15 |      1 |
  |       6 | HWPTZS     | 2018-02-08 14:50:02 |      1 |
  |       2 | K2H7W2     | 2018-02-07 13:40:43 |      0 |
  +---------+------------+---------------------+--------+
  7 rows in set (0.00 sec)


Resources:
------------------
Free access on campus to React and NodeJS references:

http://proquest.safaribooksonline.com

Images can be found here:

https://fontawesome.com/cheatsheet

https://fontawesome.com/how-to-use/svg-with-js

