
Student Project Ideas
======================
.. contents::

The PRAGMA Cloud scheduler is a lightweight scheduling solution which is designed 
to provide automated reservation and sharing of resources to PRAGMA community members. 
It currently  enables users to create single virtual clusters at individual PRAGMA sites 
with a future development to create single virtual clusters that span multiple sites.
  
We envision this interface being used to display other types of resources for other projects (e.g., sensor sites).

Below are some usage patterns that we would like the new GUI to support:

Create virtual cluster reservation
-----------------------------------

#. **Single cluster reservation on a single site**

   + *Example 1:* The user wants to create a single 32-core BioLinux virtual cluster on a 
     particular site - AIST.  The user clicks on the icon for the AIST site and sees
     that there are 64 nodes available now. The user clicks on a "Reserve now" button and 
     gets a form that allows to select 32 cores, 64 GB of memory, and the BioLinux virtual cluster image.  
     The user hits the "Submit" button and the status (window popup or a portion of the original screen) 
     indicates that virtual cluster is booting. The status is updated (every 1-2 minutes) until the virtual 
     cluster is booted and is available for the user to login. At any point, the user can close the status 
     window, logout, and then login back and should be able to view the reservation and their status.

   + *Example 2:* Same as above except that when the user clicks on the AIST site, there are 
     no 32 cores currently available.  The GUI shows that 32 cores will be avaible 
     in 2 days or the user can go to the UCSD resource and reserve 32 cores tomorrow at 7:00AM.
     The user fills in a text box with 32 cores for the chosen site clicks on a submit button.  
	 

#. **Single virtual cluster spanning multiple sites**

   + *Example 3:* The user wants to create a multi-site BioLinux virtual cluster on two sites.  As in (1), 
     the user clicks on the AIST icon and reserves 32-cores.  Before hitting the submit button, the user 
     clicks on the UCSD resource and sees that there are 128-cores currrently available. The user can use 
     the same process to select 32-cores, 64 GB of memory, and the BioLinux
     virtual cluster image. Optionally, the user can click a ENT checkbox indicating that two clusters 
     will be using the PRAGMA-ENT private network.  After the reservation submission, the
     user can view the status of the virtual cluster as it boots at both sites.


#. **Multiple clusters or servers on multiple sites**

   The user can specify multiple sites on which to run mutiple virtual images. 

#. **Reservation options**

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

A user with administrative priviledges should be able to see all users' reservations.
A user without administrative priviledges should be able to see only its own reservations.

+ **Global view** 

  All reservations can be shown as symbols on the map indicating sites
  involded  and listed (by name or reservation ID) in the sidebar or a popup window. 
  From  the "Global View" there shoudl be an easy way to get to:
  + Sie View
  * User View
  * Status View


+ **Site View**  (admin interface)

  A click on a site symbol on the global view map will show all the existing reservations
  for the site (can be a list or a popup window). If a user has admin priviledges, 
  reservatons for all users will be shown, otherwise only user's own reservationa will be shown.

+ **User View** 

  All reservations for a particular user are shown. For an admin user, reservations for any
  user  can be shown. Can see details such as cluster name and link to a status view. 
 
+ **Status View** 

  This view should provide details about the reservation status. 
  Each stage can be represented by a differnt color (as on the dial) or in some
  other way like a status bar.  

  + **booting** during the booting stage when the reservation was just made,
    give updates about the booting status. May be downloading image, updating
    image, start image boot, start compute nodes, etc.  A completion of each
    consequitive stage fills in status bar (whatever representation it might
    be) till all si done.
  * **available**  during this stage a user who reequested a virtual cluster can
    login and use the cluster. The availability should also show remaiining
    cluster reservation  time (days, or at the "end of life"  hours).
  * **down**  suring this stage thevirtual cluster is shutdown either because
    the reservation has expired or because the site had to shut  down (rare but possible). 


Admin interface 
----------------------------------
+ User registration

  + Users can register for accounts.  These accounts will need to be approved by the PRAGMA Cloud Administrator
  
+ User management
  + PRAGMA Cloud Administrators can create user accounts and approve/disapprove pending account request.
  
+ Group management and access control
  + Create  any number of user groups 
  + Grant / modify group access permissions 
  
+ Site and resource management
  + Resource administrators can to add a new resource
  + Resource administrators can modify resource attributes for their resources (e.g., available CPUs)
  + Resource administrators can grant access to users or groups to use their resource.

