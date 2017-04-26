#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 23 22:33:07 2017

@author: bamboojfc
"""

import cgitb
cgitb.enable()


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

import cgi
form = cgi.FieldStorage()


###variable from front-end###
connectionType = form.getvalue('connection_type')
#############################

sites = connectionType.split('|')

first = sites[0]
firstList = first.split(',')

status = False

for l in firstList:
    cnt=0
    for i in range(1,len(sites)):
        if l in sites[i]:
            cnt+=1
    
    if cnt==len(sites)-1:
        print '{"result" : "True"}'
        status = True
        break
    
if status != True:           
    print '{"result" : "False"}'
