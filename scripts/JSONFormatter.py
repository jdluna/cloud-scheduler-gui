#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 28 11:54:47 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()
import json

class JSONFormatter:
    def formatSite92(self,s,sites,RESOURCES,numsite,count):
        jsonStr = ""
        wiriteID = True
        
        c,m = RESOURCES.split(',')
        c = int(c)/int(numsite)
        m = int(m)/int(numsite)
        
        for a in s.getResources():
            if (wiriteID):
                jsonStr += '{"'+ str(a.getType()) + '" : {'
                jsonStr += '"total" : '+str(a.getTotal())+','
                jsonStr += '"available" : '+str(a.getAvailableAmount())+','
                jsonStr += '"use" : '+str(c)+'},'
                jsonStr += '"id" : '+str(a.getSiteId())+','                    
                wiriteID = False
            else:
                jsonStr += '"'+ str(a.getType()) + '" : {'
                jsonStr += '"total" : '+str(a.getTotal())+','
                jsonStr += '"available" : '+str(a.getAvailableAmount())+','
                jsonStr += '"use" : '+str(m)+'},'
                wiriteID = True
                jsonStr += '"name" : "'+str(s.getName())+'"},'
        #jsonStr = jsonStr[:-1] 
        #print jsonStr
        return jsonStr
    def formatSite82(self,s,site,RESOURCES,numsite,count):
        jsonStr = ""
        wiriteID = True
        
        c,m = RESOURCES.split(',')
        c = int(c)/int(numsite)
        m = int(m)/int(numsite)
        jsonStr = '"sites":[{'
        
        for a in s.getResources():
            if (wiriteID):
                jsonStr += '"'+ str(a.getType()) + '" : {'
                jsonStr += '"total" : '+str(a.getTotal())+','
                jsonStr += '"available" : '+str(a.getAvailableAmount())+','
                jsonStr += '"use" : "'+str(c)+'"},'
                jsonStr += '"id" : "'+str(a.getSiteId())+'",'
                
                wiriteID = False
            else:
                jsonStr += '"'+ str(a.getType()) + '" : {'
                jsonStr += '"total" : '+str(a.getTotal())+','
                jsonStr += '"available" : '+str(a.getAvailableAmount())+','
                jsonStr += '"use" : '+str(m)+'},'
                wiriteID = True
                jsonStr += '"name" : "'+str(s.getName())+'"'
        
        print jsonStr
        return jsonStr
    def getmutiimage(self,s):
        jsonStr = str(s.getImageType()).replace("'",'"')
        jsonStr = jsonStr.replace("[","")
        jsonStr = jsonStr.replace("]","")
        jsonStr = jsonStr.replace("{","")
        jsonStr1 = jsonStr.split(",")
        #print jsonStr1[0]
        return jsonStr1[0]
    def getmuticonnec(self,s,connect):
        jsonStr = str(s.getConnectionType()).replace("'",'"')
        jsonStr = jsonStr.replace("[","")
        jsonStr = jsonStr.replace("]","")
        jsonStr = jsonStr.replace("{","")
        jsonStr = jsonStr.replace("}","")
        target = '"name": "'+str(connect)+'"'
        jsonStr1 = jsonStr.split(",")
        for s in range(0,len(jsonStr1)):
            if target == jsonStr1[s]:
                #print jsonStr1[s]
                #print "OK"
                return jsonStr1[s]
        return str(target)
    def mergeConnection(self,site1,site2,typeconnection):
        Csite1 = str(site1.getConnectionType()).replace("'",'"')
        Csite1 = Csite1.replace("[","")
        Csite1 = Csite1.replace("]","")
        Csite1 = Csite1.replace("{","")
        Csite1 = Csite1.replace("}","")
        Csite2 = str(site2.getConnectionType()).replace("'",'"')
        Csite2 = Csite2.replace("[","")
        Csite2 = Csite2.replace("]","")
        Csite2 = Csite2.replace("{","")
        Csite2 = Csite2.replace("}","")
        Csite1 = Csite1.split(",")
        Csite2 = Csite2.split(",")
        answer = ""
        if(len(Csite1) == len(Csite2) == 2):
            answer = '{"name":"'+'ENT'+'"},{"name":"'+'IPOP'+'"}'
        elif(len(Csite1) == len(Csite2) == 1):
            if(Csite1[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
            else:
                    answer = '{"name":"'+'IPOP'+'"}'
        else:
            if(len(Csite1) > len(Csite2)):
                if(Csite2[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
                else:
                    answer = '{"name":"'+'IPOP'+'"}'
            if(len(Csite1) < len(Csite2)):
                if(Csite1[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
                else:
                    answer = '{"name":"'+'IPOP'+'"}'
        #print answer
        return answer
    def merge3Connection(self,site1,site2,site3,typeconnection):
        Csite1 = str(site1.getConnectionType()).replace("'",'"')
        Csite1 = Csite1.replace("[","")
        Csite1 = Csite1.replace("]","")
        Csite1 = Csite1.replace("{","")
        Csite1 = Csite1.replace("}","")
        Csite2 = str(site2.getConnectionType()).replace("'",'"')
        Csite2 = Csite2.replace("[","")
        Csite2 = Csite2.replace("]","")
        Csite2 = Csite2.replace("{","")
        Csite2 = Csite2.replace("}","")
        Csite3 = str(site3.getConnectionType()).replace("'",'"')
        Csite3 = Csite3.replace("[","")
        Csite3 = Csite3.replace("]","")
        Csite3 = Csite3.replace("{","")
        Csite3 = Csite3.replace("}","")
        Csite1 = Csite1.split(",")
        Csite2 = Csite2.split(",")
        Csite3 = Csite3.split(",")
        answer = ""
        
        if(len(Csite1) == len(Csite2) == len(Csite3) == 2):
            answer = '{"name":"'+'ENT'+'"},{"name":"'+'IPOP'+'"}'
        elif(len(Csite1) == len(Csite2) == len(Csite3) == 1):
            if(Csite1[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
            else:
                    answer = '{"name":"'+'IPOP'+'"}'
        else:
            if(Csite1) > (Csite2) or Csite1 > Csite3:
                if(Csite1[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
                else:
                    answer = '{"name":"'+'IPOP'+'"}'
                return answer
            if Csite2 >Csite1 or Csite2 > Csite1:
                if(Csite2[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
                else:
                    answer = '{"name":"'+'IPOP'+'"}'
                return answer
            if Csite3 >Csite1 or Csite3 > Csite2:
                if(Csite2[0] == '"name": "ENT"'):
                    answer = '{"name":"'+'ENT'+'"}'
                else:
                    answer = '{"name":"'+'IPOP'+'"}'
                return answer
        #print answer
        return answer   
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
        jsonStr += '"description" : '+json.dumps(r.getDescription())+', '
        jsonStr += '"begin" : "'+str(r.getStart())+'", '
        jsonStr += '"end" : "'+str(r.getEnd())+'", '
        jsonStr += '"owner" : "'+str(r.getOwner())+'", '
        jsonStr += '"image_type" : "'+str(r.getImageType())+'", '
        jsonStr += '"type" : "'+str(r.getType())+'", '
        
        jsonStr += '"sites" : ['
        
        sites = r.getReservationsSite()
        for s in sites:
            jsonStr += ' { "site_id": ' + str(s.getSiteId()) + ', "site_name" : "'+str(s.getName())+'", '
            
            for r in s.getResources():
                jsonStr += '"'+str(r.getType())+'" : "'+str(r.getAmount())+'" ,'
            
            jsonStr += '"status" : "'+str(s.getStatus())+'" ,'
            jsonStr += '"admin_description" : '+json.dumps(s.getAdminDescription())+' },'
        
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
