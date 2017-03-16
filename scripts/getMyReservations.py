#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 08 23:11:57 2017

@author: bamboojfc
"""


import cgitb
cgitb.enable()


###variable from front-end###
SESSION_ID = 'CUIQC5'
#############################

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from ReservationManager import ReservationManager

resManager = ReservationManager()
reservations = resManager.getReservations(sessionId = SESSION_ID, ended = False)
jsonStr = '{ "result" : [' 

for r in reservations:
    jsonStr += ' { "reservation_id" : "'+str(r.getReservationId())+'", '
    jsonStr += '"title" : "'+str(r.getTitle())+'", '
    jsonStr += '"end" : "'+str(r.getEnd())+'", '
    jsonStr += '"sites" : ['
    
    sites = r.getReservationStatus()
    for s in sites:
        jsonStr += ' { "site_name" : "'+str(s.getName())+'", '
        jsonStr += '"status" : "'+str(s.getStatus())+'" },'
    
    jsonStr = jsonStr[:-1]    
    jsonStr += ']' #end sites
    
    jsonStr += '},' #end one reservation

if len(reservations) > 0 :
    jsonStr = jsonStr[:-1] 

jsonStr += '] }'
print jsonStr