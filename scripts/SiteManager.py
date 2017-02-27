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
    
    def __init__(self):
        self.__sites = []
        
    def getAllSites(self):

        db = Database()
        if db.connect():
            db.execute("SELECT * FROM `site`;")
            data = db.getCursor().fetchall()
            for d in data:
                site = Site(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13])
                
                site.addResource(CPU(siteId=d[0], total=d[14]))
                site.addResource(Memory(siteId=d[0], total=d[15]))
                
                                
                self.__sites.append(site)
                
            return self.__sites
        else:
            return None

    def getSites(self,resAmount=None,begin=None,end=None,allPeriod=True,days=None,hours=None,connectionType=None, imageType='Any'):
        
        self.__sites = self.getAllSites()
        result = []

        for s in self.__sites:
            
            res = s.getResources()
            
            #initial criteria status
            resStatus = [False] * len(res) #create an array of False value with size = res size.
            conStatus = False
            imgStatus = False
            
            db = Database()
            if db.connect() :
                db.execute("START TRANSACTION;")
            
        
                #check resources available
                if allPeriod:
                    #all period -> calculate only one time per resource of that site
                    for i in range(0,len(res)):
                        res[i].setAvailableAmount(db,begin,end,allPeriod,days,hours)
                
                        if int(res[i].getAvailableAmount()) >= int(resAmount[i]):
                            resStatus[i] = True
                        
                else:
                    #not all period -> should calculate until found
                    tmpBegin = begin
                    beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                    duration = timedelta(hours=hours,days=days)       
                    """print beginToEnd
                    print duration
                    print beginToEnd>duration
                    print '</br>' """
                    
                    while False in resStatus and beginToEnd>=duration:
                        
                        for i in range(0,len(res)):
                            res[i].setAvailableAmount(db,tmpBegin,end,allPeriod,days,hours)
                            if int(res[i].getAvailableAmount()) >= int(resAmount[i]):
                                resStatus[i] = True
                                s.setBeginAvailable(tmpBegin)
                                s.setEndAvailable((datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(days=days,hours=hours)).strftime("%Y-%m-%d %H:00:00"))
                            
                        tmpBegin = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                        beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")                            
                            
                            
            
                #close database connection (end transaction)
                db.close()
                    
    
                #check connection type
                if connectionType == None or connectionType in s.getConnectionType() :
                    conStatus = True
                else:
                    conStatus = False
                    
                #check image type
                if imageType == 'Any' or imageType in s.getImageType() :
                    imgStatus = True
                else:
                    imgStatus = False
                
                
                if False in resStatus:
                    resAllStatus = False
                else:
                    resAllStatus = True
                    
                if resAllStatus and conStatus and imgStatus:
                    result.append(s)
                
                
        return result
        
        