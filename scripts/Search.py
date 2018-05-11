#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 16 22:17:23 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgi
import cgitb
import itertools

from JSONFormatter import JSONFormatter
from SiteManager import SiteManager

cgitb.enable()

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

form = cgi.FieldStorage()

###variable from front-end###
RESOURCES = "32,64"
CONNECTION_TYPE = "ENT"
IMAGE_TYPE = "rocks-basic"
BEGIN = "2018-05-19 16:00:00"
END = "2018-05-24 16:00:00"
ALL_PERIOD = "False"
DAYS = 2
HOURS = 0
numsite = 2
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

siteManager = SiteManager()
jsonFormatter = JSONFormatter()
#sites1 = siteManager.getSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS)
#sites = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
if (numsite <=1):
    sites1 = siteManager.getSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS)
    jsonStr = ""
    jsonStr += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
    jsonStr += '"amount" : "'+str(len(sites1))+'"'
    jsonStr += ', "sites" : ['
    for s in sites1:
        jsonStr += jsonFormatter.formatSite(s)
        jsonStr = jsonStr[:-1]
        #get available time
        jsonStr += ', "time" : {'
        jsonStr += '"begin" : "'+ str(s.getBeginAvailable())+'",'
        jsonStr += '"end" : "'+str(s.getEndAvailable())+'"}'
        jsonStr += '},'
    
    
    if len(sites1) !=0:
        jsonStr = jsonStr[:-1]    
    jsonStr += ']}'

    print jsonStr
elif (numsite == 4):
    cpu,mem = RESOURCES.split(',')
    c1 = int(int(cpu)*0.25)
    m1 = int(int(mem)*0.25)
    resourcesAmt =  resourcesAmt1 = str(c1)+","+str(m1)
    count = 0
    sites = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites2 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites3 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)      
    sites4 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)      
    jsonStr2 = ""
    jsonStr2 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
    jsonStr2 += '"amount" : "'+str(len(sites))+'",'
    jsonStr2 += '"multiSites" : ['
    for s in range(0,len(sites)):
        
        for s1 in range(s,len(sites)):
            for s2 in range(s1,len(sites)):
                for s3 in range(s2,len(sites)):
                    if(s == s1) or (s == s2) or (s == s3) or (s1 == s2) or (s1 == s3) or (s2 == s3):continue
                    else:
                        goo = "("+str(s)+","+str(s1)+","+str(s2)+","+str(s3)+")"
                        print goo
                        jsonStr2 += '{"sites":['
                        jsonStr2 += jsonFormatter.formatSite92(sites[s],sites,RESOURCES,numsite,count)
                        jsonStr2 += jsonFormatter.formatSite92(sites2[s1],sites2,RESOURCES,numsite,count)
                        jsonStr2 += jsonFormatter.formatSite92(sites3[s2],sites3,RESOURCES,numsite,count)  
                        jsonStr2 += jsonFormatter.formatSite92(sites4[s3],sites4,RESOURCES,numsite,count)
        #print jsonFormatter.formatSite92(s)
        #get available time
                        jsonStr2 = jsonStr2[:-1]
                        jsonStr2 += '],"time" : {'
                        jsonStr2 += '"begin" : "'+ str(sites[s].getBeginAvailable())+'",'
                        jsonStr2 += '"end" : "'+str(sites[s].getEndAvailable())+'"},'
                        jsonStr2 += '"image_type" : {"name":'
                        jsonStr2 +=  '"'+IMAGE_TYPE+'"'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                        jsonStr2 += '},'#imagetype
                        jsonStr2 += '"connection_type" :{"name":'
                        jsonStr2 +=      '"'+CONNECTION_TYPE+'"'#jsonFormatter.getmuticonnec(s)  
                        jsonStr2 += '},'#connection
                        
            
                        jsonStr2 += '"speedCPU" : "-",'
                        jsonStr2 += '"speedNet" : "-"' 
                        jsonStr2 += '},' 
    jsonStr2 = jsonStr2[:-1]
    jsonStr2 += ']'#mutisite
    jsonStr2 += '}'
        
        
        #print jsonStr
    print jsonStr2
elif (numsite == 3):
    cpu,mem = RESOURCES.split(',')
    c1 = int(int(cpu)*0.3)
    m1 = int(int(mem)*0.3)
    resourcesAmt =  resourcesAmt1 = str(c1)+","+str(m1)
    count = 0
    sites = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites2 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites3 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)      
    jsonStr2 = ""
    jsonStr2 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
    jsonStr2 += '"amount" : "'+str(len(sites))+'",'
    jsonStr2 += '"multiSites" : ['
    for s in range(0,len(sites)):
        for s1 in range(s,len(sites)):
            for s2 in range(s1,len(sites)):
                if(s == s1) or (s == s2) or (s1 == s2):continue
                else:
                    #goo = "("+str(s)+","+str(s1)+","+str(s2)+")"
                    #print goo
                    jsonStr2 += '{"sites":['
                    jsonStr2 += jsonFormatter.formatSite92(sites[s],sites,RESOURCES,numsite,count)
                    jsonStr2 += jsonFormatter.formatSite92(sites2[s1],sites2,RESOURCES,numsite,count)
                    jsonStr2 += jsonFormatter.formatSite92(sites3[s2],sites3,RESOURCES,numsite,count)  
                       
        #print jsonFormatter.formatSite92(s)
        #get available time
                    jsonStr2 = jsonStr2[:-1]
                    jsonStr2 += '],"time" : {'
                    jsonStr2 += '"begin" : "'+ str(sites[s].getBeginAvailable())+'",'
                    jsonStr2 += '"end" : "'+str(sites[s].getEndAvailable())+'"},'
                    jsonStr2 += '"image_type" : ['
                    jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites[s])+'},'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites2[s1])+'}'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites3[s2])+'}'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    
                    jsonStr2 += '],'#imagetype
                    jsonStr2 += '"connection_type" :['
                    jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites[s],str(CONNECTION_TYPE))+'},'#jsonFormatter.getmuticonnec(s)  
                    jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites2[s1],str(CONNECTION_TYPE))+'}'#jsonFormatter.getmuticonnec(s)  
                    jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites3[s2],str(CONNECTION_TYPE))+'}'#jsonFormatter.getmuticonnec(s)  
                    
                    jsonStr2 += '],'#connection
                    jsonStr2 += '"speedCPU" : "-",'
                    jsonStr2 += '"speedNet" : "-"' 
                    jsonStr2 += '},' 
    jsonStr2 = jsonStr2[:-1]
    jsonStr2 += ']'#mutisite
    jsonStr2 += '}'

        #print jsonStr
    print jsonStr2
 
elif (numsite == 2):
    #runnumber = 1
    count = 0
    cpu,mem = RESOURCES.split(',')
    c = int(int(cpu)*0.5)
    m = int(int(mem)*0.5)
    resourcesAmt = str(c)+","+str(m)
    
    sites = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    if len(sites) == 0:
        cpu,mem = RESOURCES.split(',')
        c1 = int(int(cpu)*0.8)
        c2 = int(int(cpu)*0.2)
        m1 = int(int(mem)*0.8)
        m2 = int(int(mem)*0.2)
        resourcesAmt1 = str(c1)+","+str(m1)
        resourcesAmt2 = str(c2)+","+str(m2)
        sites1 = siteManager.getMutiSites(resAmount=resourcesAmt1,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
        sites2 = siteManager.getMutiSites(resAmount=resourcesAmt2,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
        if len(sites1) != 0 and len(sites2) != 0:
           jsonStr2 = ""
           jsonStr2 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
           jsonStr2 += '"amount" : "'+str(len(sites))+'",'
           jsonStr2 += '"multiSites" : ['
           for s in range(0,len(sites1)):
                for s1 in range(s,len(sites2)):
                    if(s1 == s):continue
                    else:
                        jsonStr2 += '{"sites":['
                        #goo = "("+str(len(sites))+","+str(s)+","+str(s1)+")"
                        #print goo
                        jsonStr2 += jsonFormatter.formatSite92(sites1[s],sites,RESOURCES,numsite,count)
                        jsonStr2 += jsonFormatter.formatSite92(sites2[s1],sites,RESOURCES,numsite,count)  
                        jsonStr2 = jsonStr2[:-1]
                        jsonStr2 += '],"time" : {'
                        jsonStr2 += '"begin" : "'+ str(sites[s].getBeginAvailable())+'",'
                        jsonStr2 += '"end" : "'+str(sites[s].getEndAvailable())+'"},'
                        jsonStr2 += '"image_type" : ['
                        jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites1[s])+'},'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                        jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites2[s1])+'}'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    
                        jsonStr2 += '],'#imagetype
                        jsonStr2 += '"connection_type" :['
                        jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites1[s],str(CONNECTION_TYPE))+'},'#jsonFormatter.getmuticonnec(s)  
                        jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites2[s1],str(CONNECTION_TYPE))+'}'#jsonFormatter.getmuticonnec(s)  
                        jsonStr2 += '],'#connection
                   
            
                        jsonStr2 += '"speedCPU" : "-",'
                        jsonStr2 += '"speedNet" : "-"' 
                        jsonStr2 += '},' 
           jsonStr2 = jsonStr2[:-1]
           jsonStr2 += ']'#mutisite
           jsonStr2 += '}'
        #print jsonStr
        print jsonStr2
    else:
        jsonStr2 = ""
        jsonStr2 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
        jsonStr2 += '"amount" : "'+str(len(sites))+'",'
        jsonStr2 += '"multiSites" : ['
        for s in range(0,len(sites)):
            for s1 in range(s,len(sites)):
                if(s1 == s):continue
                else:
                    jsonStr2 += '{"sites":['
                    jsonStr2 += jsonFormatter.formatSite92(sites[s],sites,RESOURCES,numsite,count)
                    jsonStr2 += jsonFormatter.formatSite92(sites[s1],sites,RESOURCES,numsite,count)  
                    jsonStr2 = jsonStr2[:-1]
                    jsonStr2 += '],"time" : {'
                    jsonStr2 += '"begin" : "'+ str(sites[s].getBeginAvailable())+'",'
                    jsonStr2 += '"end" : "'+str(sites[s].getEndAvailable())+'"},'
                    jsonStr2 += '"image_type" : ['
                    jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites[s])+'},'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites[s1])+'}'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    
                    jsonStr2 += '],'#imagetype
                    jsonStr2 += '"connection_type" :['
                    jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites[s],str(CONNECTION_TYPE))+'},'#jsonFormatter.getmuticonnec(s)  
                    jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites[s1],str(CONNECTION_TYPE))+'}'#jsonFormatter.getmuticonnec(s)  
                    jsonStr2 += '],'#connection
                    jsonStr2 += '"speedCPU" : "-",'
                    jsonStr2 += '"speedNet" : "-"'
                    jsonStr2 += '},' 
        jsonStr2 = jsonStr2[:-1]
        jsonStr2 += ']'#mutisite
        jsonStr2 += '}'

        #print jsonStr
        
        print jsonStr2
#jsonStr21 = ""
#for x in xrange(0, len(sites)):
#    if (x+1 != len(sites)):
#        for y in xrange(x+1,len(sites)):
#            s = sites[x]
#            s2 = sites[y]
#            jsonStr21 += '{"sites" :['
#            jsonStr21 += jsonFormatter.formatSite92(s)
#            jsonStr21 += ','
#            jsonStr21 += jsonFormatter.formatSite92(s2)
#            #print jsonFormatter.formatSite92(s)
#            #get available time
#            jsonStr21 += '], "time" : {'
#            jsonStr21 += '"begin" : "'+ str(s.getBeginAvailable())+'",'
#            jsonStr21 += '"end" : "'+str(s.getEndAvailable())+'"},'
#            jsonStr21  += '"image_type" : ['
#            jsonStr21 += jsonFormatter.getmutiimage(s)
#            jsonStr21 += '],'#imagetype
#            jsonStr21  += '"connection_type" :['
#            jsonStr21 += jsonFormatter.getmuticonnec(s)  
#            jsonStr21 += '],'#connection
#            jsonStr21 += '"speedCPU" : "",'
#            jsonStr21 += '"speedNet" : ""'
#            jsonStr21 += '},'
#jsonStr21 = jsonStr21[:-1] 
#jsonStr21 += ']'#mutisite
#jsonStr21 += '}'
#print jsonStr
#print jsonStr21


