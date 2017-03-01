#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 02 00:04:12 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()



print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


###variable from front-end###
USER_ID = 1
BEGIN = '2017-03-01 09:00:00'
END = '2017-03-02 10:00:00'
SITES_ID = '3'
RESOURCES = '2,4|8,6'
IMG_TYPE = 'centOS7'
#############################


####prepare connection criteria###
#SITES_ID will be a list of sites(id)
spl = SITES_ID.split(',')
SITES_ID = []
for s in spl:
    SITES_ID.append(s)
SITES_ID = list(SITES_ID)
    
#RESOURCES will be a 2D list of resources
#->RESOURCES[0] = resources of SITES_ID[0]
#->RESOURCES[0][0] = amount of resource type 1st (CPU) of SITE_ID[0]
spl = RESOURCES.split('|')
RESOURCES = []
for s in spl:
    spl2 = s.split(',')
    res = []
    for i in spl2:
        res.append(i)
    RESOURCES.append(res)
RESOURCES = list(RESOURCES)
################################## 


from ReservationManager import ReservationManager
reservationManager = ReservationManager()
s = reservationManager.createReservation(USER_ID, BEGIN, END, SITES_ID, RESOURCES, IMG_TYPE)
print reservationManager.getReservationStatus()