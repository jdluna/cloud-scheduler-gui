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
from JSONFormatter import JSONFormatter

auth = AuthenticationManager()
result = auth.authenticate(USERNAME,PASSWORD)

jsonFormatter = JSONFormatter()
jsonStr = '{ "result" : "' +str(result)+ '",'

if result :
    user = auth.getUser()
    jsonStr += jsonFormatter.formatUser(user)

jsonStr += ' }'

print jsonStr