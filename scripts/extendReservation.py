#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 15 00:53:58 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()



print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

import cgi
form = cgi.FieldStorage()

###variable from front-end###
SESSION_ID = form.getvalue('session_id')
END = form.getvalue('end')
RESERVATION_ID = form.getvalue('reservation_id')
#############################


from ReservationManager import ReservationManager
reservationManager = ReservationManager()

reservation = reservationManager.extend(SESSION_ID, END, RESERVATION_ID)

    
jsonStr = '{ "result" : "' +str(reservation)+ '" }'

print jsonStr
