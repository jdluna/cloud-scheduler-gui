
.. highlight:: rest

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

      Files in /opt/cloud-scheduler/etc have examples of accessing MYSQL database

#. Your GUI development 

   #. /var/www/html/cloud-scheduler/testbed-map

      Can be viewed as http://FQDN/cloud-scheduler/testbed-map

     
MySQL database
------------------

The cloud scheduler uses MySQL database **clouddb** on its backend. 
You will be able to access the database directly when needed. 
The users in the database are the same now as you used for the hackathon and
can be changed and added just as any other resources in the cloud scheduler. 


There are daily automatic backups of the database and the backup files are in ::
  
    /state/partition1/backup/clouddb

You can run a backup and restore of the database for your own needs. Take a
look at backup/restore scripts in ::

   /root/code/ 

#. backup

   The backup script **backup-clouddb**  has all the settings for running a
   backup. Edit if needed.

#. restore 

   The restore script **restore-clouddb** can be used to restore a database to
   a previous kown state which will destroy all the changes done to the
   database later than the backup file was created. For example, to restore
   the database to the state as of 2016, November 30, one woudl run ::

       cd /root/code
       ./restore-clouddb /state/partition1/backup/clouddb/clouddb-20161130.sql.gz

#. partial updates

   The changes to the cloud scheduler database are doen usually via accessing
   the old GUI. In order to speed up od do some things automatically, one can
   create scripts to update just some of the tables. Take a look at :: 

       /opt/cloud-scheduler/etc/install-data.sql

   A similar script  can be used to change/add specific data to the tables ::

       mysql -D clouddb < your-sql-script


