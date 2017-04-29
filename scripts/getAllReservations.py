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

from JSONFormatter import JSONFormatter
from ReservationManager import ReservationManager

resManager = ReservationManager()
reservations = resManager.getAllReservations(sessionId = SESSION_ID, ended = False)

jsonFormatter = JSONFormatter()

jsonStr = '{ "result" : [' 
cnt = 0

for i in range(0,len(reservations)):
    for j in range(0,len(reservations[i])):
        cnt += 1
        r = reservations[i][j]
        
        jsonStr += jsonFormatter.formatReservation(r)
        jsonStr += ',' #end one reservation
        

if cnt > 0 :
    jsonStr = jsonStr[:-1] 

jsonStr += '] }'
print jsonStr