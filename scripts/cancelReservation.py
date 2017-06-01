#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 16 01:33:06 2017

@author: bamboojfc
"""

import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

###variable from front-end###
SESSION_ID = form.getvalue('session_id')
RESERVATION_ID = form.getvalue('reservation_id')
REASON = form.getvalue('reason')
#############################

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


from ReservationManager import ReservationManager
reservationManager = ReservationManager()
reservation = reservationManager.cancel(SESSION_ID, RESERVATION_ID, REASON)

jsonStr = '{ "result" : "' +str(reservation)+ '",'
if reservation:
    jsonStr += '"request" : "' + reservationManager.returnRequestLock() + '", "getlock" : "'+ reservationManager.returnGetLock() + '", "unlock" : "' + reservationManager.returnUnlock() +'" }'
else:
    jsonStr = jsonStr[:-1]
    jsonStr += '}'
print jsonStr