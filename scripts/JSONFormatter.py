#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 28 11:54:47 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()

class JSONFormatter:
    
    def formatSite(self,s):
        jsonStr = ''
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
        jsonStr += '}'
        
        return jsonStr
        
    def formatReservation(self,r):
        jsonStr = ''
        jsonStr += ' { "reservation_id" : "'+str(r.getReservationId())+'", '
        jsonStr += '"title" : "'+str(r.getTitle())+'", '
        jsonStr += '"description" : "'+str(r.getDescription())+'", '
        jsonStr += '"begin" : "'+str(r.getStart())+'", '
        jsonStr += '"end" : "'+str(r.getEnd())+'", '
        jsonStr += '"owner" : "'+str(r.getOwner())+'", '
        jsonStr += '"image_type" : "'+str(r.getImageType())+'", '
        jsonStr += '"type" : "'+str(r.getType())+'", '
        
        jsonStr += '"sites" : ['
        
        sites = r.getReservationsSite()
        for s in sites:
            jsonStr += ' { "site_name" : "'+str(s.getName())+'", '
            
            for r in s.getResources():
                jsonStr += '"'+str(r.getType())+'" : "'+str(r.getAmount())+'" ,'
            
            jsonStr += '"status" : "'+str(s.getStatus())+'" },'
        
        jsonStr = jsonStr[:-1]    
        jsonStr += ']' #end sites
        
        jsonStr += '}'
        
        return jsonStr