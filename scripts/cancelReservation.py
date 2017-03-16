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
SESSION_ID = 'CUIQC5'
RESERVATION_ID = '3'
#############################



from ReservationManager import ReservationManager
reservationManager = ReservationManager()

reservation = reservationManager.cancel(SESSION_ID, RESERVATION_ID)

    
jsonStr = '{ "result" : "' +str(reservation)+ '" }'

print jsonStr