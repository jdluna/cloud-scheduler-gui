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
    __siteManager = None
    __db = None
    
    def __init__(self):
        self.__isComplete = False
        self.__siteManager = SiteManager()
        self.__db = None
    
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
                        
                     
                        for j in range(0,len(res)):
                            res[j].setAvailableAmount(db=self.__db,begin=begin,end=end)
                            if int(res[j].getAvailableAmount()) >= int(resources[i][j]):
                                resStatus[j] = True
                                
                        if not False in resStatus:
                            #resources of this site are available enough
                            siteStatus[i] = True
                    
                            
                if not False in siteStatus:
                    #all conditions are okay, this reservation can be created
                
                    #UPDATE `reservation` table
                    ref = self.idGenerator()
                    sql = 'INSERT INTO `reservation`(`user_id`, `start`, `end`, `reference_number`, `image_type`) VALUES ("'+str(userId)+'","'+str(begin)+'","'+str(end)+'","'+str(ref)+'","'+str(imgType)+'");'
                    while not self.__db.execute(sql):
                        #reference number is duplicated
                        ref = self.idGenerator()
                        sql = 'INSERT INTO `reservation`(`user_id`, `start`, `end`, `reference_number`, `image_type`) VALUES ("'+str(userId)+'","'+str(begin)+'","'+str(end)+'","'+str(ref)+'","'+str(imgType)+'");'
                        
                    reservationID = self.__db.getCursor().lastrowid
                    
                    
                    
                    #UPDATE `site_reserved` table
                    for i in range(0,len(sitesId)):
                        sql = 'INSERT INTO `site_reserved` VALUES ('
                        sql += '"'+str(reservationID)+'","'+str(sitesId[i])+'","'
                        
                        for j in range(0,len(res)):
                            sql += str(resources[i][j])+'","'
                         
                        sql += 'waiting"'
                        sql += ');'
                        self.__db.execute(sql)
                        
                    
                    #UPDATE `schedule` table
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
        return self.__isComplete
            


    def idGenerator(self, size=32, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for self._ in range(size))
