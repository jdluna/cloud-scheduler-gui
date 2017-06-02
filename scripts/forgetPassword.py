#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 27 22:40:22 2017

@author: bamboojfc
"""

import cgitb
cgitb.enable()
from AuthenticationManager import AuthenticationManager


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

import cgi
form = cgi.FieldStorage()

###variable from front-end###
EMAIL = form.getvalue('email')
NEW_PASSWORD = form.getvalue('password')
#############################

authManager = AuthenticationManager()
u = authManager.createUser(email = EMAIL)
user = authManager.getUser()
result = False

if user != None:
    result = user.resetPassword(NEW_PASSWORD)
    
jsonStr = '{ "result" : "'+ str(result) +'" }'

print jsonStr
