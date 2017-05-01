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

import cgi
form = cgi.FieldStorage()

###variable from front-end###
RESOURCES = form.getvalue('resources')
CONNECTION_TYPE = form.getvalue('connection_type')
IMAGE_TYPE = form.getvalue('image_type')
BEGIN = form.getvalue('begin')
END = form.getvalue('end')
ALL_PERIOD = form.getvalue('all_period')
DAYS = form.getvalue('days')
HOURS = form.getvalue('hours')
#############################


#prepare connection criteria
if "None" in CONNECTION_TYPE:
    CONNECTION_TYPE = None
    
#prepare all_period criteria
if ALL_PERIOD != True and ALL_PERIOD != False and "True" in ALL_PERIOD:
    ALL_PERIOD = True
elif ALL_PERIOD != True and ALL_PERIOD != False and "False" in ALL_PERIOD:
    ALL_PERIOD = False


#prepare criteria about resources
resourcesAmt = []
if RESOURCES != None:
    spl = RESOURCES.split(',')
    for s in spl:
        resourcesAmt.append(s)


#prepare criteria about days and hours
if ALL_PERIOD:
    if DAYS == None:
        DAYS = 0
    if HOURS == None:
        HOURS = 0

from JSONFormatter import JSONFormatter
from SiteManager import SiteManager
siteManager = SiteManager()
sites = siteManager.getSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS)

jsonFormatter = JSONFormatter()

jsonStr = '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
jsonStr += '"amount" : "'+str(len(sites))+'"'
jsonStr += ', "sites" : ['
for s in sites:
    jsonStr += jsonFormatter.formatSite(s)
    jsonStr = jsonStr[:-1]

    #get available time
    jsonStr += ', "time" : {'
    jsonStr += '"begin" : "'+ str(s.getBeginAvailable())+'",'
    jsonStr += '"end" : "'+str(s.getEndAvailable())+'"}'
    jsonStr += '},'
    
    
if len(sites) !=0:
    jsonStr = jsonStr[:-1]    
jsonStr += ']}'

print jsonStr
