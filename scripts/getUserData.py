#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Fri May 05 11:23:04 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


import cgi
form = cgi.FieldStorage()

###variable from front-end###
USERNAME = form.getvalue('username')
SESSION_ID = form.getvalue('session_id')
#############################

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from AuthenticationManager import AuthenticationManager
from JSONFormatter import JSONFormatter

auth = AuthenticationManager()
u = auth.createUser(USERNAME,getAnotherUserData=True)
user = auth.getUser()

jsonFormatter = JSONFormatter()
jsonStr = '{ "result" : "' +str(user!=None)+ '",'

if user!=None :
    jsonStr += jsonFormatter.formatUser(user)

jsonStr += ' }'

print jsonStr