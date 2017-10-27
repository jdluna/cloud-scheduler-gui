PRAGMA Cloud Multi-site Cluster Reservation 
======================
.. contents::

Currently, we can make reservations for a cluster on a single physical site. 
We would like to add a capability to make a reservation that spans multiple physical sites. 
This means virtual nodes instantiated should be able to communicate over an additional network (IPOP or ENT).  If the ENT option is selected,
an ENT CIDR allocation will need to be provided for the virtual cluster.  Currently, we have the following CIDRS allocated for our use:  
10.102.0.0/16, 10.103.0.0/16, 10.104.0.0/16, 10.105.0.0/16.  We will need the GUI to manage the allocation of IP addresses from this space similar to how Amazon EC2 handles the allocation of public IP addresses.  For example, suppose a user wants to launch 3 virtual clusters each with 1 frontend and 3 compute nodes.  That is 12 nodes total and the smallest CIDR space we can select for all of those is 16 which is usually represented as a.b.c.d/28.  In our case, say the first available CIDR is 10.103.0.0.  We can then allocate the IP addresses as follows: 

VC1 - pragma boot vc 24 add-iface=openflow:10.103.0.1/28 

* frontend: 10.103.0.1
* compute-0: 10.103.0.2
* compute-1: 10.103.0.3
* compute-2: 10.103.0.4

VC2 - pragma boot vc 24 add-iface=openflow:10.103.0.5/28

* frontend: 10.103.0.5
* compute-0: 10.103.0.6
* compute-1: 10.103.0.7
* compute-2: 10.103.0.8

VC3 -  pragma boot vc 24 add-iface=openflow:10.103.0.9/28

* frontend: 10.103.0.9
* compute-0: 10.103.0.10
* compute-1: 10.103.0.11
* compute-2: 10.103.0.12

For more information about CIDR addresses, you can see https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks. We want users to be able to have an interface in the GUI where they can view their allocated CIDR addresses and request a new allocation. From a database viewpoint, you would probably want to track: userid, cidr, allocated where status is allocated is true or false.

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

If the user selects the ENT network type and they have unallocated CIDR addresses associated with their account, they should show up I'd to show an an optional CIDR address should be displayed.  If they do not specify a CIDR address, one will be 
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

