#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 01 23:57:57 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

from SiteManager import SiteManager
from Database import Database
import string
import random
from datetime import datetime,timedelta

class ReservationManager:
    __isComplete = False
    __imgTypeError = False
    __siteManager = None
    __db = None
    __siteError = []
    __resError = []
    __reservationID = None
    
    def __init__(self):
        self.__isComplete = False
        self.__imgTypeError = False
        self.__siteManager = SiteManager()
        self.__db = None
        self.__siteError = []
        self.__resError = []
        self.__reservationID = []
    
    def createReservation(self, userId, begin, end, sitesId, resources, imgType):
        self.__db = Database();        
        
        #check available resources in sites
        if self.__db.connect():
            siteStatus = [False]*len(sitesId)
            
            
            try:
                for i in range(0,len(sitesId)):
                    #sitesId = list of all site user selected.
                    
                
                    #get data of this site
                    self.__db.execute('SELECT * FROM `site` WHERE `site_id` = "'+str(sitesId[i])+'";')
                    data = self.__db.getCursor().fetchone()
                    site = self.__siteManager.createSite(data)
                    
                    
                    #check image type
                    if imgType in site.getImageType():
                        
                        #True -> check available resources in site from begin to end
                        res = site.getResources()
                        resStatus = [False]*len(res)
                        
                        
                        #-> check available resources in site from begin to end
                        for j in range(0,len(res)):
                            res[j].setAvailableAmount(db=self.__db,begin=begin,end=end)
                            if int(res[j].getAvailableAmount()) >= int(resources[i][j]):
                                resStatus[j] = True
                            else:
                                self.__addSiteError(i)
                                self.__addResourceError(j)
                                
                        if not False in resStatus:
                            #resources of this site are available enough
                            siteStatus[i] = True
                    else:
                        self.__setImgTypeError()
                        
                    
                            
                if not False in siteStatus:
                #all conditions are okay, this reservation can be created
                
                    ### UPDATE `reservation` table
                    while True:
                        ref = self.idGenerator()
                    
                        self.__db.execute('SELECT * FROM `reservation` WHERE `reference_number` = "'+str(ref)+'";')
                        data = self.__db.getCursor().fetchone()
                        
                        if data == None:
                            break
                    
                    sql = 'INSERT INTO `reservation`(`user_id`, `start`, `end`, `reference_number`, `image_type`) VALUES ("'+str(userId)+'","'+str(begin)+'","'+str(end)+'","'+str(ref)+'","'+str(imgType)+'");'
                    self.__db.execute(sql)
                    
                    self.__reservationID = self.__db.getCursor().lastrowid
                    
                    
                    
                    ### UPDATE `site_reserved` table
                    for i in range(0,len(sitesId)):
                        sql = 'INSERT INTO `site_reserved` VALUES ('
                        sql += '"'+str(self.__reservationID)+'","'+str(sitesId[i])+'","'
                        
                        for j in range(0,len(res)):
                            sql += str(resources[i][j])+'","'
                         
                        sql += 'waiting"'
                        sql += ');'
                        self.__db.execute(sql)
                        
                    
                    ### UPDATE `schedule` table
                    tmpBegin = begin
                    beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                        
                    while beginToEnd>=timedelta(hours=1):
                        
                        tmpEnd = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                            
                        for i in range(0,len(sitesId)):
                            self.__db.execute('SELECT * FROM `schedule` WHERE `site_id` = "'+str(sitesId[i])+'" and `start` = "'+str(tmpBegin)+'";')
                            data = self.__db.getCursor().fetchone()
                            
                            if data == None:
                                #still not have this time slot of this site
                            
                                sql = 'INSERT INTO `schedule` VALUES ('
                                sql += '"'+str(sitesId[i])+'","'+str(tmpBegin)+'","'+str(tmpEnd)+'","'
                                
                                for j in range(0,len(res)):
                                    sql += str(resources[i][j])+'","'
                                 
                                sql = sql[:-2]
                                sql += ');'
                            
                            else:
                                #already have this time slot of this site
                            
                                self.__db.execute("SELECT * FROM `schedule` LIMIT 0;")
                                tableDesc = self.__db.getCursor().description

                                
                                sql = 'UPDATE `schedule` SET'
                                
                                for j in range(0,len(res)):
                                    #note : data[3] is CPU
                                    sql += ' `'+str(tableDesc[3+j][0]) + '` = "' + str(int(resources[i][j])+int(data[3+j]))+'",'
                                 
                                sql = sql[:-1]
                                sql += ' WHERE `site_id` = "'+str(sitesId[i])+'" AND `start` = "'+str(tmpBegin)+'";'
                            
                            self.__db.execute(sql)
                                
                            
                        tmpBegin = tmpEnd
                        beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
    
                    self.__db.commit()
                    self.__isComplete = True
            except:
                self.__db.rollback()
                
        else:
            self.__isComplete = False
            
    def getReservationStatus(self):
        if self.__isComplete:
            return 'success'
        else:
            return 'fail'
        
        
    def __setImgTypeError(self):
        self.__imgTypeError = True
        
    def isImgTypeError(self):
        return self.__imgTypeError  
        
    def __addSiteError(self,siteIndex):
        self.__siteError.append(siteIndex)
            
    def getSiteError(self):
        return self.__siteError
        
    def __addResourceError(self,resTypeIndex):
        self.__resError.append(resTypeIndex)
        
    def getResourceError(self):
        return self.__resError

    def getReservationID(self):
        return self.__reservationID

    def idGenerator(self, size=32, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for self._ in range(size))
