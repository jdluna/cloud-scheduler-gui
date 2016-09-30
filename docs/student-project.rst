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

Ussage patterns or interactions:

The interface should be used for answering questions similar to the following:
1. Make a reservation for the resources
	reserve a single virtual cluster on a single site
	single virtual cluser spannibg multiple sites
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
 
			
