#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 16 22:17:23 2017
@author: CS401:Nannapas Banluesombatkul
"""

import cgi
import cgitb
import itertools

cgitb.enable()

from JSONFormatter import JSONFormatter
from SiteManager import SiteManager


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

form = cgi.FieldStorage()

###variable from front-end###

#############################
RESOURCES = form.getvalue('resources')
CONNECTION_TYPE = form.getvalue('connection_type')
IMAGE_TYPE = form.getvalue('image_type')
BEGIN = form.getvalue('begin')
END = form.getvalue('end')
ALL_PERIOD = form.getvalue('all_period')
DAYS = form.getvalue('days')
HOURS = form.getvalue('hours')
numsite = form.getvalue('numOfSite')
typecheck = form.getvalue('type')
###############################
if typecheck == "SINGLE":
    numsite = "1"
isAny = False
divisible2 = False
divisible3 = False
divisible4 = False
if numsite != "Any":
    numsite = int(numsite)
    isAny = False
    c,m = RESOURCES.split(",")
    c = int(c)%numsite
    m = int(m)%numsite
    if c == 0 and m == 0:
        divisible2 = True
        divisible3 = True
        divisible4 = True
else:
    numsite = 2
    isAny = True
    c,m = RESOURCES.split(",")
    c2 = int(c)%2
    m2 = int(m)%2

    c3 = int(c)%3
    m3 = int(m)%3

    c4 = int(c)%4
    m4 = int(m)%4

    if(c2 == 0 and m2 == 0): divisible2 = True
    if(c3 == 0 and m3 == 0): divisible3 = True
    if(c4 == 0 and m4 == 0): divisible4 = True
#print c+","+m
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
if(numsite == 2 and (not divisible2) and isAny):numsite = 3
if(numsite == 3 and (not divisible3) and isAny):numsite = 4
if (numsite <=1):
    resourcesAmt = []
    spl = RESOURCES.split(',')
    for s in spl:
        resourcesAmt.append(str(int(int(s)*0.5)))
    #print resourcesAmt
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
elif (numsite == 2 and divisible2):
    resourcesAmt = []
    spl = RESOURCES.split(',')
    for s in spl:
        resourcesAmt.append(str(int(int(s)*0.5)))
    sites = siteManager.getSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS)
    found = False
    if len(sites) == 0:
        resourcesAmt1 = []
        resourcesAmt2 = []
        spl = RESOURCES.split(',')
        for s in spl:
            resourcesAmt.append(str(int(int(s)*0.8)))
        spl = RESOURCES.split(',')
        for s in spl:
            resourcesAmt2.append(str(int(int(s)*0.2)))
        sites1 = siteManager.getMutiSites(resAmount=resourcesAmt1,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
        sites2 = siteManager.getMutiSites(resAmount=resourcesAmt2,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
        
        if len(sites1) != 0 and len(sites2) != 0:
           count = 0
           jsonStr2 = ""
           jsonStr2 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
           jsonStr2 += '"amount" : "'+str(len(sites))+'",'
           jsonStr2 += '"multiSites" : ['
           for s in range(0,len(sites1)):
                for s1 in range(s,len(sites2)):
                    if(s1 == s):continue
                    else:
                        count  = count +1
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
                        if(CONNECTION_TYPE == None):
                            jsonStr2 += jsonFormatter.mergeConnection(sites1[s],sites2[s1],CONNECTION_TYPE)
                        else:
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
           jsonStr1 = ""
           jsonStr1 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
           jsonStr1 += '"amount" : "'+str(count)+'",'
           jsonStr1 += '"multiSites" : ['
           jsonStr = jsonStr1+jsonStr2
           print jsonStr
        elif isAny:
            numsite = 3
    else:
        count = 0
        jsonStr2 = ""
        for s in range(0,len(sites)):
            for s1 in range(s,len(sites)):
                if(s1 == s):continue
                else:
                    count = count +1
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
                    if(CONNECTION_TYPE == None):
                        jsonStr2 += jsonFormatter.mergeConnection(sites[s],sites[s1],CONNECTION_TYPE)
                    else:
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
        jsonStr1 = ""
        jsonStr1 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
        jsonStr1 += '"amount" : "'+str(count)+'",'
        jsonStr1 += '"multiSites" : ['
        jsonStr = jsonStr1+jsonStr2
        print jsonStr
elif (numsite == 3 and divisible3):
   
    resourcesAmt = []
    spl = RESOURCES.split(',')
    for s in spl:
        resourcesAmt.append(str(int(int(s)*0.25)))
    #print resourcesAmt
    count = 0
    sites = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites2 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites3 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)      
    jsonStr2 = ""
    if len(sites) > 0 and len(sites2) > 0 and len(sites3) > 0:  
        for s in range(0,len(sites)):
            for s1 in range(s,len(sites)):
                for s2 in range(s1,len(sites)):
                    if(s == s1) or (s == s2) or (s1 == s2):continue
                    else:
                        count = count + 1
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
                        jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites2[s1])+'},'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                        jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites3[s2])+'}'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                    
                        jsonStr2 += '],'#imagetype
                        jsonStr2 += '"connection_type" :['
                        jsonStr2 += jsonFormatter.merge3Connection(sites[s],sites2[s1],sites3[s2],CONNECTION_TYPE)
                        #jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites[s],str(CONNECTION_TYPE))+'},'#jsonFormatter.getmuticonnec(s)  
                        #jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites2[s1],str(CONNECTION_TYPE))+'},'#jsonFormatter.getmuticonnec(s)  
                        #jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites3[s2],str(CONNECTION_TYPE))+'}'#jsonFormatter.getmuticonnec(s)  
                    
                        jsonStr2 += '],'#connection
                        jsonStr2 += '"speedCPU" : "-",'
                        jsonStr2 += '"speedNet" : "-"' 
                        jsonStr2 += '},' 
        jsonStr2 = jsonStr2[:-1]
        jsonStr2 += ']'#mutisite
        jsonStr2 += '}'

        #print jsonStr
        jsonStr1 = ""
        jsonStr1 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
        jsonStr1 += '"amount" : "'+str(count)+'",'
        jsonStr1 += '"multiSites" : ['
        jsonStr = jsonStr1+jsonStr2
        print jsonStr
    elif isAny:
        numsite = 4
elif (numsite == 4 and divisible4):
    resourcesAmt = []
    spl = RESOURCES.split(',')
    for s in spl:
        resourcesAmt.append(str(int(int(s)*0.25)))
    #print resourcesAmt
    count = 0
    jsonStr2 = ""
    sites = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites2 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)
    sites3 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)      
    sites4 = siteManager.getMutiSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS,numbersite=numsite)      
    for s in range(0,len(sites)):
        for s1 in range(s,len(sites)):
            for s2 in range(s1,len(sites)):
                for s3 in range(s2,len(sites)):
                    if(s == s1) or (s == s2) or (s == s3) or (s1 == s2) or (s1 == s3) or (s2 == s3):continue
                    else:
                        count = count +1
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
                        jsonStr2 += '"image_type" : ['
                        jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites[s])+'},'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)
                        jsonStr2 +=  '{'+jsonFormatter.getmutiimage(sites2[s1])+'}'#jsonFormatter.getmutiimage(s,IMAGE_TYPE)         
                        jsonStr2 += '],'#imagetype
                        jsonStr2 += '"connection_type" :['
                        jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites[s],str(CONNECTION_TYPE))+'},'#jsonFormatter.getmuticonnec(s)  
                        jsonStr2 += '{'+jsonFormatter.getmuticonnec(sites2[s1],str(CONNECTION_TYPE))+'}'#jsonFormatter.getmuticonnec(s)  
                        jsonStr2 += '],'#connection
                         
            
                        jsonStr2 += '"speedCPU" : "-",'
                        jsonStr2 += '"speedNet" : "-"' 
                        jsonStr2 += '},' 
    jsonStr2 = jsonStr2[:-1]
    jsonStr2 += ']'#mutisite
    jsonStr2 += '}'
    jsonStr1 = ""
    jsonStr1 += '{ "result_type" : "' + str(siteManager.getResultType()) + '", '
    jsonStr1 += '"amount" : "'+str(count)+'",'
    jsonStr1 += '"multiSites" : ['    
    jsonStr = jsonStr1+jsonStr2   
        #print jsonStr
    print jsonStr
    if len(sites) == 0:
        numsite = -1
if(numsite == -1):
    jsonStr = '{ "result_type" : "' +"None"+ '", '
    jsonStr += '"amount" : "'+"0"+'"'
    jsonStr += ', "sites" : ['
    jsonStr += ']}'
    print jsonStr

