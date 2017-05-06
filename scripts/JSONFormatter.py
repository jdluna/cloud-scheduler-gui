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
        jsonStr = '{"id" : "'+str(s.getSiteId())+'",'
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
            jsonStr += str(img).replace("'",'"')+','
            
        if len(s.getImageType()) != 0:
            jsonStr = jsonStr[:-1]        
        jsonStr += '],'
        
        
        #get site's connection type
        jsonStr += '"connection_type" : ['
        for con in s.getConnectionType():
            jsonStr += str(con).replace("'",'"')+','
        
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
        jsonStr = ' { "reservation_id" : "'+str(r.getReservationId())+'", '
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
            
            jsonStr += '"status" : "'+str(s.getStatus())+'" ,'
            jsonStr += '"admin_description" : "'+str(s.getAdminDescription())+'" },'
        
        jsonStr = jsonStr[:-1]    
        jsonStr += ']' #end sites
        
        jsonStr += '}'
        
        return jsonStr
        
    def formatUser(self,u):
        jsonStr = '"session_id" : "' + str(u.getSessionToken()) + '"'
        jsonStr += ', "firstname" : "' + str(u.getFirstname()) + '"'
        jsonStr += ', "lastname" : "' + str(u.getLastname()) + '"'
        jsonStr += ', "email_address" : "' + str(u.getEmailAddress()) + '"'
        jsonStr += ', "phone_number" : "' + str(u.getPhoneNumber()) + '"'
        jsonStr += ', "status" : "' + str(u.getStatus()) + '"'
        jsonStr += ', "organization" : "' + str(u.getOrganization()) + '"'
        jsonStr += ', "position" : "' + str(u.getPosition()) + '"'
        jsonStr += ', "language" : "' + str(u.getLanguage()) + '"'
        jsonStr += ', "timezone" : "' + str(u.getTimezone()) + '"'
        jsonStr += ', "public_key" : "' + str(u.getPublicKey()) + '"'
        return jsonStr
        
        
    def formatJson(self,name,data):
        return '"'+str(name)+'" : "'+str(data)+'"'