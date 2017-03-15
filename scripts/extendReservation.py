#!/Python27/python
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


###variable from front-end###
SESSION_ID = 'S44NIY'
END = '2017-03-17 10:00:00'
RESERVATION_ID = '1'
#############################



from ReservationManager import ReservationManager
reservationManager = ReservationManager()

reservation = reservationManager.extend(SESSION_ID, END, RESERVATION_ID)

    
jsonStr = '{ "result" : "' +str(reservation)+ '" }'

print jsonStr