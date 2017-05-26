#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 07 02:23:37 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

###variable from front-end###
SESSION_ID = form.getvalue('session_id')
BEGIN = form.getvalue('begin')
END = form.getvalue('end')
SITES_ID = form.getvalue('sites_id')
RESOURCES = form.getvalue('resources')
IMG_TYPE = form.getvalue('img_type')
TITLE = form.getvalue('title')
DESCRIPTION = form.getvalue('description')
TYPE = form.getvalue('type')
#############################


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


####prepare connection criteria###
#SITES_ID will be a list of sites(id)
spl = SITES_ID.split(',')
SITES_ID = []
for s in spl:
    SITES_ID.append(s)
SITES_ID = list(SITES_ID)
    
#RESOURCES will be a 2D list of resources
#example format: RESOURCES = '12,16|4,6'
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


reservation = reservationManager.canCreateReservation(SESSION_ID, BEGIN, END, SITES_ID, RESOURCES, IMG_TYPE, 3)
result = 'fail'

if reservation :
    reservationManager.createReservation(TITLE, DESCRIPTION, TYPE)
    result = reservationManager.getCreateReservationStatus()
    
    
jsonStr = '{ "result" : "' +str(result)+ '",'

if result == 'fail':
    jsonStr += ' "isImageTypeError" : "' + str(reservationManager.getImageTypeError()) + '",'
    
    resError = reservationManager.getResourceError()
    resErrorStatus = len(resError) > 0
    siteError = reservationManager.getSiteError()
    jsonStr += ' "isResourceError" : "' + str(resErrorStatus) + '"'
    
    if resErrorStatus == True:
        jsonStr += ', "site_error" : ['
        for i in range(0,len(resError)):
            jsonStr += '{"site_id" : "' + str(SITES_ID[siteError[i]]) + '" , "resource_index" : "' + str(resError[i]) + '"},'
        
        
        jsonStr = jsonStr[:-1]
        jsonStr += ']'
        
else:
    jsonStr += ' "reserve_id" : "'+str(reservationManager.getReservationID()) + '"'

jsonStr += '}'

print jsonStr