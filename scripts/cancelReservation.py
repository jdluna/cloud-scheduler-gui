#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 16 01:33:06 2017

@author: bamboojfc
"""

import cgitb
cgitb.enable()


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


###variable from front-end###
SESSION_ID = 'ACB123'
RESERVATION_ID = '7'
REASON = 'my job finish!'
#############################



from ReservationManager import ReservationManager
reservationManager = ReservationManager()

reservation = reservationManager.cancel(SESSION_ID, RESERVATION_ID, REASON)

    
jsonStr = '{ "result" : "' +str(reservation)+ '" }'

print jsonStr