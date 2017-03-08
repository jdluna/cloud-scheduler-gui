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
from Reservation import Reservation


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
        self.__sessionId = None
        self.__begin = None
        self.__end = None
        self.__sitesId = None 
        self.__resources = None
        self.__imgType = None
        self.__userId = None
    
    def canCreateReservation(self, sessionId, begin, end, sitesId, resources, imgType):
        self.__db = Database()        
        self.__sessionId = sessionId
        self.__begin = begin
        self.__end = end
        self.__sitesId = sitesId 
        self.__resources = resources
        self.__imgType = imgType

        if self.__db.connect():
        
            #check session id and get user id
            self.__db.execute('SELECT `user_id` FROM `session` WHERE `session_id` = "'+str(self.__sessionId)+'";')
            uid = self.__db.getCursor().fetchone()
            if uid != None:
                self.__userId = uid[0]
                
                #check available resources in sites
                siteStatus = [False]*len(sitesId)
                
                
                for i in range(0,len(sitesId)):
                    #sitesId = list of all site user selected.
                    
                
                    #get data of this site
                    self.__db.execute('SELECT * FROM `site` WHERE `site_id` = "'+str(sitesId[i])+'";')
                    data = self.__db.getCursor().fetchone()
                    site = self.__siteManager.createSite(data)             
    
                        
                    #-> check available resources in site from begin to end
                    res = site.getResources()
                    resStatus = [False]*len(res)
                    
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
                        
                        
                #end transaction
                self.__db.close()
                    
                            
                if not False in siteStatus:
                #all conditions are okay, this reservation can be created
                    return True
           
           
                
        return False
                
            
            
    def createReservation(self, title, description):
        self.__title = title
        self.__description = description
        
        self.__db = Database() 
        
        if self.__db.connect(): 
            
            try:
                
                ### UPDATE `reservation` table
                while True:
                    ref = self.idGenerator()
                
                    self.__db.execute('SELECT * FROM `reservation` WHERE `reference_number` = "'+str(ref)+'";')
                    data = self.__db.getCursor().fetchone()
                    
                    if data == None:
                        break
                
                sql = 'INSERT INTO `reservation`(`user_id`, `title`, `description`, `start`, `end`, `reference_number`, `image_type`) VALUES ("'+str(self.__userId)+'","'+str(self.__title)+'","'+str(self.__description)+'","'+str(self.__begin)+'","'+str(self.__end)+'","'+str(ref)+'","'+str(self.__imgType)+'");'
                self.__db.execute(sql)
                
                self.__reservationID = self.__db.getCursor().lastrowid
                
                
                ### UPDATE `site_reserved` table
                for i in range(0,len(self.__sitesId)):
                    sql = 'INSERT INTO `site_reserved` VALUES ('
                    sql += '"'+str(self.__reservationID)+'","'+str(self.__sitesId[i])+'","'
                    
                    
                    for j in range(0,len(self.__resources[0])):
                        sql += str(self.__resources[i][j])+'","'
                    
                    sql += 'waiting"'
                    sql += ');'

                    self.__db.execute(sql)
                    
                
                ### UPDATE `schedule` table
                tmpBegin = self.__begin
                beginToEnd = datetime.strptime(self.__end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                    
                while beginToEnd>=timedelta(hours=1):
                    
                    tmpEnd = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                        
                    for i in range(0,len(self.__sitesId)):
                        self.__db.execute('SELECT * FROM `schedule` WHERE `site_id` = "'+str(self.__sitesId[i])+'" and `start` = "'+str(tmpBegin)+'";')
                        data = self.__db.getCursor().fetchone()
                        
                        if data == None:
                            #still not have this time slot of this site
                        
                            sql = 'INSERT INTO `schedule` VALUES ('
                            sql += '"'+str(self.__sitesId[i])+'","'+str(tmpBegin)+'","'+str(tmpEnd)+'","'
                            
                            for j in range(0,len(self.__resources[0])):
                                sql += str(self.__resources[i][j])+'","'
                             
                            sql = sql[:-2]
                            sql += ');'
                        
                        else:
                            #already have this time slot of this site
                        
                            self.__db.execute("SELECT * FROM `schedule` LIMIT 0;")
                            tableDesc = self.__db.getCursor().description
                            
                            sql = 'UPDATE `schedule` SET'
                            
                            for j in range(0,len(self.__resources[0])):
                                #note : data[3] is CPU
                                sql += ' `'+str(tableDesc[3+j][0]) + '` = "' + str(int(self.__resources[i][j])+int(data[3+j]))+'",'
                             
                            sql = sql[:-1]
                            sql += ' WHERE `site_id` = "'+str(self.__sitesId[i])+'" AND `start` = "'+str(tmpBegin)+'";'
                        
                        self.__db.execute(sql)
                            
                        
                    tmpBegin = tmpEnd
                    beginToEnd = datetime.strptime(self.__end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                
                
                self.__db.commit()
                self.__isComplete = True
               
            except:
                self.__db.rollback()
                self.__isComplete = False
        
        else:
            self.__isComplete = False
        
            
    def getCreateReservationStatus(self):
        if self.__isComplete:
            return 'success'
        else:
            return 'fail' 
        
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
        
        
    def getMyReservations(self, sessionId):
        self.__db = Database()        
        self.__sessionId = sessionId
        self.__myReservations = []
        
        if self.__db.connect():
            #check session id and get user id
            sql = 'SELECT `user_id` FROM `session` WHERE `session_id` = "'+str(self.__sessionId)+'";'
            self.__db.execute(sql)
            uid = self.__db.getCursor().fetchone()
            if uid != None:
                self.__userId = uid[0]
                sql = 'SELECT `reservation_id`,`title`,`end` FROM `reservation` WHERE `user_id`="'+str(self.__userId)+'"'
                self.__db.execute(sql)
                data = self.__db.getCursor().fetchall()

                for d in data:
                    r = Reservation()
                    r.setReservationId(d[0])
                    r.setTitle(d[1])
                    r.setEnd(d[2])
                    
                    r.setReservationStatus()                    
                    self.__myReservations.append(r)
                    
        return self.__myReservations
                
                
                