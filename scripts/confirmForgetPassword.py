#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Fri Jun 02 19:01:47 2017

@author: bamboojfc
"""

import cgitb
cgitb.enable()
from User import User


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

import cgi
form = cgi.FieldStorage()

###variable from front-end###
ID = form.getvalue('id')
#############################

user = User(genId = ID)
u = user.resetPassword(genId = ID, confirm = True)
    
jsonStr = '{ "result" : "'+ str(u) +'" }'

print jsonStr