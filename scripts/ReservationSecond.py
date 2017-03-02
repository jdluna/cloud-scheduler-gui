#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 02 21:22:06 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()



print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


###variable from front-end###
RESERVATION_ID = 67
TITLE = 'title'
DESCRIPTION = 'dsecription'
#############################



from ReservationManager import ReservationManager
reservationManager = ReservationManager()

result = reservationManager.addDescription(RESERVATION_ID, TITLE,DESCRIPTION)

jsonStr = '{ "result" : "'+str(result)+'" }'


print jsonStr