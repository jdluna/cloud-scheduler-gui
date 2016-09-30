.. highlight:: rest

Student Project Ideas
============================================================
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

Create virtual cluster reservations:
--------------------------------
A user comes to the new GUI interface and sees all of the available cloud resourcs on the map. 
The user click on a Login button and successfully authenticates themselves to the GUI interface.


#. The user wants to create a single 32-core BioLinux virtual cluster on a particular site.  
They click on the icon for the AIST site in Japan and see 
that there are 64 nodes available now. They click on a "Reserve now" button and get a form that allows
them to select 32 cores, 64 GB of memory, and the BioLinux virtual cluster image.  The user hits the 
submit button and the a status window pops up indicating that virtual cluster is being booted and 
updates itself every minute until the virtual cluster is booted and available for the user to login.
At any point the user can close the status window, logout, and then log back in and should be able to
view their reservations and view the status.

#.  Same as (2) above except that when the user clicks on the AIST site, there are no cores currently available.
The GUI displays that there will be 8 cores will be available tomorrow starting at 8:00AM and 
asks if the user needs more cores than 8.  The user fills in a text box with 32 cores clicks on a button.  The 
GUI returns that 32 cores will be avaible in 2 days or the user can go to the UCSD resource and reserve 32 cores tomorrow at 7:00AM.

#. The user wants to create a multi-site BioLinux virtual cluster on two sites.  As in (1), 
they click on the AIST icon and reserve 32-cores.  Before they hit the submit button, they click on the 
UCSD resource see that there are 128-cores currrently available and use the same process to select
32-cores, 64 GB of memory, and the BioLinux virtual cluster image.  They also click an PRAGMA-ENT checkbox
indicating they want the two clusters to be on the same PRAGMA-ENT private network.  Then they hit the 
submit button and can view the status of the virtual cluster as it boots at both sites.



multiple clusters or servers on multiple sites
	can specify options for a reservation such as:
		number of cpus,
		memory, 
		time start, 
		duration of reservation, 
		type of image, 
		network specifics (ent, ipop)
	have a flexible filter for the above options (relax some constrains)
	find optimal reservation (time, sites) with respect to user specifications and sites availability


2. View existing reservations
	by site (admin interface)
	by user (user interface)
	map and list of reservations
	status of each reservation 
	time remaining for a reservation

3. Admin interface (low priority)
	manage users, groups, access control
	manage sites, filters, options
 
			
