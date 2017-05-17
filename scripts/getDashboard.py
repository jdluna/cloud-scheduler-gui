#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 21:52:22 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()

print "Content-Type: text/html"   
print "Access-Control-Allow-Origin: *"  
print


from SiteManager import SiteManager
from JSONFormatter import JSONFormatter

siteManager = SiteManager()
sites = siteManager.getAllSites()

jsonFormatter = JSONFormatter()

jsonStr = '{ "amount" : "'+str(len(sites))+'"'

jsonStr += ', "sites" : ['
for s in sites:
    jsonStr += jsonFormatter.formatSite(s)
    jsonStr += ','

if len(sites)>0:
    jsonStr = jsonStr[:-1]    
jsonStr += ']}'

print jsonStr
