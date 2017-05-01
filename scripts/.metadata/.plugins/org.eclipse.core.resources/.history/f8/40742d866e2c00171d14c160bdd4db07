#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 08 23:11:57 2017

@author: bamboojfc
"""


import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

###variable from front-end###
SESSION_ID = form.getvalue('session_id')
#############################

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from ReservationManager import ReservationManager
from JSONFormatter import JSONFormatter

resManager = ReservationManager()
reservations = resManager.getReservations(sessionId = SESSION_ID, ended = False)

jsonFormatter = JSONFormatter()
jsonStr = '{ "result" : [' 

for r in reservations:
    jsonStr += jsonFormatter.formatReservation(r)
    jsonStr += ',' #end one reservation

if len(reservations) > 0 :
    jsonStr = jsonStr[:-1] 

jsonStr += '] }'
print jsonStr