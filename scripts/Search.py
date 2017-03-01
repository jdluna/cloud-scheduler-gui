#!/Python27/python
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


###variable from front-end###
CPU_AMT = 2
MEMORY_AMT = 2
CONNECTION_TYPE = "None"
IMAGE_TYPE = 'centOS7'
BEGIN = '2017-03-01 09:00:00'
END = '2017-03-01 10:00:00'
ALL_PERIOD = True
DAYS = 0
HOURS = 1
#############################


#prepare connection criteria
if "None" in CONNECTION_TYPE:
    CONNECTION_TYPE = None


#prepare criteria about resources
if CPU_AMT == None:
    CPU_AMT = 0
if MEMORY_AMT == None:
    MEMORY_AMT = 0
resourcesAmt = [CPU_AMT,MEMORY_AMT]


from SiteManager import SiteManager
siteManager = SiteManager()
sites = siteManager.getSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS)


jsonStr = '{ "result_type" : "' + str(siteManager.getResultType()) + '", '

jsonStr += '"amount" : "'+str(len(sites))+'"'

jsonStr += ', "sites" : ['
for s in sites:
    jsonStr += '{"id" : "'+str(s.getSiteId())+'",'
    jsonStr += '"name" : "'+str(s.getName())+'",'
    jsonStr += '"description" : "'+str(s.getDescription())+'",'
    jsonStr += '"contact" : "'+str(s.getContact())+'",'
    jsonStr += '"location" : "'+str(s.getLocation())+'",'
    jsonStr += '"pragma_boot_path" : "'+str(s.getPragmaBootPath())+'",'
    jsonStr += '"pragma_boot_version" : "'+str(s.getPragmaBootVersion())+'",'
    jsonStr += '"python_path" : "'+str(s.getPythonPath())+'",'
    jsonStr += '"temp_dir" : "'+str(s.getTempDir())+'",'
    jsonStr += '"username" : "'+str(s.getUsername())+'",'
    jsonStr += '"deployment_type" : "'+str(s.getDeploymentType())+'",'
    jsonStr += '"site_hostname" : "'+str(s.getSiteHostname())+'",'
    jsonStr += '"latitude" : "'+str(s.getLatitude())+'",'
    jsonStr += '"longitude" : "'+str(s.getLongitude())+'",'

    #get site's image type
    jsonStr += '"image_type" : ['
    for img in s.getImageType():
        jsonStr += '{"name" : "'+str(img)+'"},'
        
    if len(s.getImageType()) != 0:
        jsonStr = jsonStr[:-1]        
    jsonStr += '],'
    
    
    #get site's connection type
    jsonStr += '"connection_type" : ['
    for con in s.getConnectionType():
        jsonStr += '{"name" : "'+str(con)+'"},'
    
    if len(s.getConnectionType()) != 0:
        jsonStr = jsonStr[:-1]
    jsonStr += '],'
    
    
    #get site's resources    
    for r in s.getResources():
        jsonStr += '"'+ str(r.getType()) + '" : {'
        jsonStr += '"total" : "'+str(r.getTotal())+'",'
        jsonStr += '"available" : "'+str(r.getAvailableAmount())+'"},'
    

    #get available time
    jsonStr += '"time" : {'
    jsonStr += '"begin" : "'+ str(s.getBeginAvailable())+'",'
    jsonStr += '"end" : "'+str(s.getEndAvailable())+'"},'
    
        
    jsonStr = jsonStr[:-1]
    jsonStr += '},'
    
    
    
if len(sites) !=0:
    jsonStr = jsonStr[:-1]    
jsonStr += ']}'

print jsonStr
