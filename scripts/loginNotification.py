#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 02 00:04:12 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

###variable from front-end###
SESSION_ID = form.getvalue('session_id')
#############################


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


import pusher

pusher_client = pusher.Pusher(
  app_id='348529',
  key='43cff02ec435f9ddffa1',
  secret='7f7f0f08b4b6a35aa509',
  ssl=True
)

pusher_client.trigger('notification', 'login', {'message': SESSION_ID})
