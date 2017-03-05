#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 01 01:36:30 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()



print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print


###variable from front-end###
SITE_ID = 1
DATE_REQUIRE = '2017-03-07 09:00:00'
#############################



from SiteManager import SiteManager
siteManager = SiteManager()
if DATE_REQUIRE == None:
    s = siteManager.getSite(siteId = SITE_ID)
else:
    s = siteManager.getSite(siteId = SITE_ID, dateReq = DATE_REQUIRE)

jsonStr = '{ "site" :' 
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

    
jsonStr = jsonStr[:-1]
jsonStr += '},'


#get amount of running clusters
jsonStr += '"running" : "'+str(s.getRunningAmount())+'" '
jsonStr += '}'

print jsonStr
