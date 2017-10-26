PRAGMA Cloud Multi-site Cluster Reservation 
======================
.. contents::

Currently, we can make reservations for a cluster on a single physical site. 
We would like to add a capability to make a reservation that spans multiple physical sites. 
This means virtual nodes instantiated should be able to communicate over an additional network (IPOP or ENT).  If the ENT option is selected,
an ENT CIDR allocation will need to be provided for the virtual cluster.  Currently, we have the following CIDRS allocated for our use:  
10.102.0.0/16, 10.103.0.0/16, 10.104.0.0/16, 10.105.0.0/16.

Use case 1:
--------------------
User knows they need a multi-site virtual cluster for their experiment.  For example, we were recently asked to set up 3 VMs at different 
sites for a virtual SDN experiment.  

Path A:
~~~~~~~~
User selects multiple resources on the map and the resource cards show up in the right panel.  The user checks the "Select for reservation" 
box on desired resources and clicks on a "RESERVE" button.  Reservation screen pops up and currently shows: 

* Begin Date:
* End Date:
* For each resource, the name and number of CPUs and Memory desired
* Image type
  
If all selected resources support both IPOP and ENT, the below option should be specified with both IPOP and ENT listed.  

* Network type

If only IPOP or ENT are supported on all sites, the only option would be displayed.  If all resources selected do not support either 
ENT or IPOP, a helpful error message should be displayed.  For example,

"Multi-site reservation not possible with selected resources.  Selected resource SDSC supports the ENT network type but selected resource AIST does not.  Please only select resources that support either the ENT or IPOP network type and hit the RESERVE button again."
The user should be able to filter for sites that either support the ENT network type or IPOP network type.
For the ENT network type, the user should be able to specify an optional CIDR address.  If they do not specify a CIDR address, one will be 
automatically assigned to them.

Use case 2:
--------------------
User is searching for a certain number of resources where capacity 
is not available at any single site but is available if resources are combined from two or more sites and those sites support either ENT or 
IPOP.  The resources returned should either support all ENT or all IPOP -- i.e., if one resource supports IPOP and another supports ENT, 
they cannot be used together.


●	Establish what network can be provided
●	Total CPUs used
●	Total memory used
●	What site will run the Virtual Frontend and what sites will be running virtual compute nodes

