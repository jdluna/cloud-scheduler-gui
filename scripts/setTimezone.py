#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 02 00:04:12 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()



print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


###variable from front-end###
SESSION_ID = 'WWX9KX'
TIMEZONE = 'UTC+07:00'
#############################



from User import User
user = User(sessionId = SESSION_ID)
user.setTimezone(TIMEZONE)

result = user.getUserId() is not None and (user.getTimezone() == TIMEZONE)

jsonStr = '{ "result" : "' +str(result)+ '" }'


print jsonStr