#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Fri May 05 12:33:27 2017

@author: bamboojfc
"""

import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

###variable from front-end###
SESSION_ID = form.getvalue('session_id')
RESERVATION_ID = form.getvalue('reservation_id')
STATUS = form.getvalue('status')
#############################

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from JSONFormatter import JSONFormatter
from ReservationManager import ReservationManager

resManager = ReservationManager()
result = resManager.updateReservationStatus(sessionId = SESSION_ID, reservationId=RESERVATION_ID, status = STATUS)

jsonFormatter = JSONFormatter()

jsonStr = '{ "result" : "'+str(result)+'"'

if result:
    jsonStr += ', "reservation" :'
    r = resManager.getReservation(sessionId = SESSION_ID, reservationId=RESERVATION_ID)    
    jsonStr += jsonFormatter.formatReservation(r)
    

jsonStr += '}'
print jsonStr