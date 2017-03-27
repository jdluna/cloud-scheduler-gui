#!/Python27/python
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


###variable from front-end###
USERNAME = 'PXZ99J'
NEW_PASSWORD = '12345'
#############################

authManager = AuthenticationManager()
user = authManager.createUser(USERNAME).getUser()

if user != None:
    result = user.resetPassword(NEW_PASSWORD)
    
jsonStr = '{ "result" : "'+ str(result) +'" }'

print jsonStr
