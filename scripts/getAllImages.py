#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 16 22:17:23 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from Database import Database

jsonStr = '{"image_type":['
db = Database()
if db.connect() :
    sql = "SELECT `name`,`description` FROM `image_type_desc`";
    
    if db.execute(sql) :
        data = db.fetchall()
        
        for d in data:
            jsonStr += '{"name":"'+str(d[0])+'",'
            jsonStr += '"description":"'+str(d[1])+'"},'
        
        if len(data) > 0 :
            jsonStr = jsonStr[:-1]
            
    db.close()
    
jsonStr += ']}'        
print jsonStr
