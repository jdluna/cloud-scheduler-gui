#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 01 01:36:30 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


###variable from front-end###
SITE_ID = form.getvalue('site_id')
DATE_REQUIRE = form.getvalue('date_req')
#############################

from JSONFormatter import JSONFormatter
from SiteManager import SiteManager
siteManager = SiteManager()
if DATE_REQUIRE == None:
    s = siteManager.getSite(siteId = SITE_ID)
else:
    s = siteManager.getSite(siteId = SITE_ID, dateReq = DATE_REQUIRE)

jsonFormatter = JSONFormatter()

jsonStr = '{ "site" :' 
jsonStr += jsonFormatter.formatSite(s)

#get amount of running clusters
jsonStr += ', "running" : "'+str(s.getRunningAmount())+'" '
jsonStr += '}'

print jsonStr
