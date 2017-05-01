#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 08 16:19:36 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

###variable from front-end###
USERNAME = form.getvalue('username')
PASSWORD = form.getvalue('password')
#############################


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from AuthenticationManager import AuthenticationManager

auth = AuthenticationManager()
result = auth.authenticate(USERNAME,PASSWORD)
jsonStr = '{ "result" : "' +str(result)+ '"'

if result :
    sessionId = auth.getUser().getSessionToken()
    jsonStr += ', "session_id" : "' + str(sessionId) + '"'
    jsonStr += ', "firstname" : "' + str(auth.getUser().getFirstname()) + '"'
    jsonStr += ', "lastName" : "' + str(auth.getUser().getLastname()) + '"'
    jsonStr += ', "email_address" : "' + str(auth.getUser().getEmailAddress()) + '"'
    jsonStr += ', "phone_number" : "' + str(auth.getUser().getPhoneNumber()) + '"'
    jsonStr += ', "status" : "' + str(auth.getUser().getStatus()) + '"'
    jsonStr += ', "organization" : "' + str(auth.getUser().getOrganization()) + '"'
    jsonStr += ', "position" : "' + str(auth.getUser().getPosition()) + '"'
    jsonStr += ', "language" : "' + str(auth.getUser().getLanguage()) + '"'
    jsonStr += ', "timezone" : "' + str(auth.getUser().getTimezone()) + '"'

jsonStr += ' }'

print jsonStr