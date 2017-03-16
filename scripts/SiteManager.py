#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 01:52:36 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

from Database import Database

from Site import Site
from Resource import CPU, Memory
from datetime import datetime,timedelta


class SiteManager:
    
    __sites = []
    __resultType = "result"
    
    def __init__(self):
        self.__sites = []
        self.__resultType = "result"
        
    def getAllSites(self):

        db = Database()
        if db.connect():
            db.execute("SELECT * FROM `site`;")
            data = db.getCursor().fetchall()
            for d in data:
                site = self.createSite(d)              
                self.__sites.append(site)
                
            return self.__sites
        else:
            return None

    def getSites(self,resAmount=None,begin=None,end=None,allPeriod=True,days=0,hours=0,connectionType=None, imageType='Any'):
        #for search with criteria
    
        self.__sites = self.getAllSites()
        result = []
        conAndImgMatch = []

        for s in self.__sites:
            
            res = s.getResources()
            
            #initial criteria status
            resStatus = [False] * len(res) #create an array of False value with size = res size.
            conStatus = False
            imgStatus = False
            
            #check connection type
            if connectionType == None or connectionType in s.getConnectionType() :
                conStatus = True
                
            #check image type
            if imageType == 'Any' or imageType in s.getImageType() :
                imgStatus = True
                
            if conStatus and imgStatus:
                conAndImgMatch.append(s)
            
            #check resources available only the sites match connection type and image type criteria 
            db = Database()
            if db.connect() and conStatus and imgStatus:
                db.execute("START TRANSACTION;")
                
                if allPeriod:
                    #all period -> calculate only one time per resource of that site
                    for i in range(0,len(res)):
                        res[i].setAvailableAmount(db,begin,end)
                
                        if int(res[i].getAvailableAmount()) >= int(resAmount[i]):
                            resStatus[i] = True
                            
                    if not False in resStatus:
                        s.setBeginAvailable(begin)
                        s.setEndAvailable(end)
                        
                else:
                    #not all period -> should calculate until found
                    tmpBegin = begin
                    beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                    duration = timedelta(hours=hours,days=days)
                    
                    while False in resStatus and beginToEnd>=duration:
                        
                        for i in range(0,len(res)):
                            res[i].setAvailableAmount(db,tmpBegin,end)
                            if int(res[i].getAvailableAmount()) >= int(resAmount[i]):
                                resStatus[i] = True
                                s.setBeginAvailable(tmpBegin)
                                s.setEndAvailable((datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(days=days,hours=hours)).strftime("%Y-%m-%d %H:00:00"))
                            
                        tmpBegin = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                        beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
            
                #close database connection (end transaction)
                db.close()
                
                
                if not False in resStatus:
                    result.append(s)
                

        ## if there are no site match all criteria 
        ## -> suggest all sites match available resources but not in that time     
        if not result:  
            #result is empty
            self.__resultType = "suggest"
            
            for s in conAndImgMatch:
                # check only the site match in connection and image type
                res = s.getResources()
                
                # initial criteria status
                resTotalStatus = [False] * len(res) #create an array of False value with size = res size.
                resStatus = [False] * len(res)
                
                # Are total resources enough?
                for i in range(0,len(res)):
                    if res[i].getTotal() >= resAmount[i]:
                        resTotalStatus[i] = True
                        
                if not False in resTotalStatus:
                    #this site has enough resouces
                    #-> find the earilest available time
                
                    #calculate duration length
                    if allPeriod:
                        durationLength = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(begin, "%Y-%m-%d %H:00:00")
                    else:
                        durationLength = timedelta(days=days,hours=hours)
                    
                    db = Database()
                    if db.connect():
                        db.execute("START TRANSACTION;")
                        tmpBegin = datetime.now().strftime("%Y-%m-%d %H:00:00")
                        tmpEnd = (datetime.strptime(begin, "%Y-%m-%d %H:00:00")+durationLength).strftime("%Y-%m-%d %H:00:00")
                        while False in resStatus:
                            #will do until get available time of this site
                            
                            for i in range(0,len(res)):
                                res[i].setAvailableAmount(db,tmpBegin,tmpEnd)
                                if int(res[i].getAvailableAmount()) >= int(resAmount[i]):
                                    resStatus[i] = True
                                    s.setBeginAvailable(tmpBegin)
                                    s.setEndAvailable(tmpEnd)
                                
                            tmpBegin = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                            tmpEnd = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+durationLength).strftime("%Y-%m-%d %H:00:00")
                           
                        #close database connection (end transaction)
                        db.close()
                        
                        result.append(s)
        
        if not result:
            self.__resultType = "None"
            
        return result
        
    def getResultType(self):
        return self.__resultType
        
    def getSite(self,siteId = None, dateReq = datetime.now().strftime("%Y-%m-%d %H:00:00"), end = datetime.now().strftime("%Y-%m-%d %H:00:00")):
        #to get site description specific by time              
        dateReq = str(dateReq)
        end = str(end)
        
        if datetime.strptime(dateReq, "%Y-%m-%d %H:00:00") - datetime.strptime(end, "%Y-%m-%d %H:00:00") > timedelta(hours=0) :
            end = dateReq
         
         
        db = Database()
        if db.connect() and siteId != None:
            db.execute('SELECT * FROM `site` WHERE `site_id` = "'+str(siteId)+'";')
            data = db.getCursor().fetchone()

            site = self.createSite(data)
            res = site.getResources()

            db.execute("START TRANSACTION;")   

            for i in range(0,len(res)):
                res[i].setAvailableAmount(db=db,begin=dateReq,end=end)

                
            site.setRunningAmount(db,begin=dateReq)   
        
            return site
        else:
            return None
            
            
    def createSite(self, d):
        site = Site(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13])
        
        db = Database()
        if db.connect() :
            db.execute("START TRANSACTION;")
            site.addResource(db,CPU(siteId=d[0], total=d[14]))
            site.addResource(db,Memory(siteId=d[0], total=d[15]))
            db.close
        
        return site