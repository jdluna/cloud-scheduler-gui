.. highlight:: rest

Student Project Ideas
======================
.. contents::

The PRAGMA Cloud scheduler is designed to be a lightweight scheduling 
solution to providing automated sharing of resources among PRAGMA community members. It 
currently allows users to create singe virtual clusters at individual PRAGMA sites and will
eventually allow them to create single virtual clusters that span multiple PRAGMA sites.
We wanted to leverage existing scheduling solutions so looked at various room reservation 
schedulers and settled on one called Booked.  It had a lot of nice features and was
extensible in that you could add custom fields.  However, when we dug into the code
for some more involved changes, we found it overly complex and difficult to work with.  Also,
while the Booked GUI was the cleanest of all other tools we looked at, it is not very intuitive for 
users to look at.  

The goal of this project will be to build a new GUI interface for the PRAGMA Cloud scheduler. 
When the user comes to the new GUI, they will see a map view like the one that you created during 
during the student hackathon.  From this interface, they will be able to create/reserve 
virtual clusters plus view and manage their virtual clusters.  The goals of the new GUI interface
are that it be more inuitive and user friendly and also modular and extensible.  We could also 
envision this interface being used to display other types of resources for other projects (e.g., sensor sites).

Below are some usage patterns that we would like the new GUI to support:

User Authentication 
--------------------
A user navigates to the GUI interface webpage) and using a **Login** button 
authenticates itself to the scheduler.  The user then can and sees all the 
available cloud resourcs on the map. 

Create virtual cluster reservation
-----------------------------------

#. Single cluster reservation on a single site

   + Example 1: The user wants to create a single 32-core BioLinux virtual cluster on a particular site.  
     They click on the icon for the AIST site in Japan and see 
     that there are 64 nodes available now. They click on a "Reserve now" button and get a form that allows
     them to select 32 cores, 64 GB of memory, and the BioLinux virtual cluster image.  The user hits the 
     submit button and the a status window pops up indicating that virtual cluster is being booted and 
     updates itself every minute until the virtual cluster is booted and available for the user to login.
     At any point the user can close the status window, logout, and then log back in and should be able to
     view their reservations and view the status.

   + Example 2: Same as above except that when the user clicks on the AIST site, there are 
     no cores currently available.  The GUI displays that there will be 8 cores will be available 
	 tomorrow starting at 8:00AM and asks if the user needs more cores than 8.  The user fills in 
	 a text box with 32 cores clicks on a button.  The GUI returns that 32 cores will be avaible 
	 in 2 days or the user can go to the UCSD resource and reserve 32 cores tomorrow at 7:00AM.

#. Single virtual cluster spanning multiple sites

   + Example  3: The user wants to create a multi-site BioLinux virtual cluster on two sites.  As in (1), 
     the user clicks on the AIST icon and reserves 32-cores.  Before hit the submit button, they click on the 
     UCSD resource see that there are 128-cores currrently available and use the same process to select
     32-cores, 64 GB of memory, and the BioLinux virtual cluster image.  They also click an PRAGMA-ENT checkbox
     indicating they want the two clusters to be on the same PRAGMA-ENT private network.  Then they hit the 
     submit button and can view the status of the virtual cluster as it boots at both sites.


#. Multiple clusters or servers on multiple sites

   The user can specify sites on which to run mutiple virtual images. 

#. Reservation options 

   #. Have a flexible filter for the options and the ability to relax them.
   #. Have the ability to find an reservation (time, sites) with respect to 
      user specifications and sites availability

   Possbile options are:

   + number of CPUs
   + memory
   + reservation time start 
   + reservation duration 
   + image type (there are idfferent images or templates given by name)
   + additional network specification (ENT, IPOP)


View existing reservations
---------------------------

+ by site (admin interface)
+ by user (user interface)
+ map and list of reservations
+ status of each reservation 
+ time remaining for a reservation

Admin interface (low priority)
----------------------------------

+ manage users, groups, access control
+ manage sites, filters, options
 
