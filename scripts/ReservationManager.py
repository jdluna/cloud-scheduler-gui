#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 01 23:57:57 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

from SiteManager import SiteManager
from Site import Site
from Database import Database
import string
import random
from datetime import datetime,timedelta
from Reservation import Reservation
from AuthenticationManager import AuthenticationManager

NOW = datetime.utcnow()


class ReservationManager:
    
    def __init__(self):
        self.__isComplete = False
        self.__imgTypeError = False
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
    
    def canCreateReservation(self, sessionId, begin, end, sitesId, resources, imgType, step=1):
        self.__db = Database()        
        self.__sessionId = sessionId
        self.__begin = begin
        self.__end = end
        self.__sitesId = sitesId 
        self.__resources = resources
        self.__imgType = imgType
        
        if self.__db.connect():
            
            #check session id and get user id
            auth = AuthenticationManager()
            if auth.isSessionIdCorrect(self.__sessionId):
                self.__userId = auth.getUser().getUserId()
                
                #check available resources in sites
                siteStatus = [False]*len(sitesId)
                
                #get data of this site
                if step == 1:
                    self.__db.lock({ 'site' : 'READ', 'schedule':'READ' })
                else:
                    self.__db.lock({ 'site' : 'READ', 'schedule':'WRITE', 'site_reserved' : 'WRITE', 'reservation':'WRITE' })
                
                for i in range(0,len(sitesId)):
                    #sitesId = list of all site user selected.
                    self.__db.execute('SELECT * FROM `site` WHERE `site_id` = "'+str(sitesId[i])+'";')
                    data = self.__db.getCursor().fetchone()
                    site = Site(site=data,db=self.__db)        
                    
                    #-> check image type
                    self.__imgTypeError = True
                    for img in site.getImageType():
                        if str(self.__imgType) in img.get('name'):
                            self.__imgTypeError = False
                            
                    if self.__imgTypeError :
                        return False
                        
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
                 
                if step == 1:
                     self.__db.unlock()
                     self.__db.close()

                if not False in siteStatus:
                #all conditions are okay, this reservation can be created
                    return True
                             
        return False             
        
          
            
    def createReservation(self, title, description, reserveType):
        self.__title = title
        self.__description = description
        self.__reservedType = reserveType
        
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
                
                sql = 'SELECT `image_type_id` FROM `image_type_desc` WHERE `name` = "'+str(self.__imgType)+'";'
                self.__db.execute(sql)
                self.__imgType = self.__db.getCursor().fetchone()[0]
                
                
                sql = 'INSERT INTO `reservation`(`user_id`, `title`, `description`, `start`, `end`, `reference_number`, `image_type`, `type`) VALUES ("'+str(self.__userId)+'","'+str(self.__title)+'","'+str(self.__description)+'","'+str(self.__begin)+'","'+str(self.__end)+'","'+str(ref)+'","'+str(self.__imgType)+'","'+str(self.__reservedType)+'");'
                self.__db.execute(sql)
                
                self.__reservationID = self.__db.getCursor().lastrowid
                
                
                ### UPDATE `site_reserved` table
                for i in range(0,len(self.__sitesId)):
                    sql = 'INSERT INTO `site_reserved`(`reservation_id`, `site_id`, `status`, `cpu`, `memory`) VALUES ('
                    sql += '"'+str(self.__reservationID)+'","'+str(self.__sitesId[i])+'","waiting","'
                    
                    
                    for j in range(0,len(self.__resources[0])):
                        sql += str(self.__resources[i][j])+'","'
                    
                    sql = sql[:-2]
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
                           # self.__db.execute('LOCK TABLE `schedule` WRITE;')
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
                self.__db.unlock()
                
            except:
                self.__db.rollback()
                self.__isComplete = False         
            finally:
                self.__db.close() 
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
        
    def getImageTypeError(self):
        return self.__imgTypeError

    def getReservationID(self):
        return self.__reservationID
        

    def idGenerator(self, size=32, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for self._ in range(size))
        
        
    def getReservations(self, sessionId = None, userId = None, ended = True):
        
        if sessionId == None and userId == None:
            return None
               
        self.__db = Database()        
        self.__sessionId = sessionId
        self.__reservations = []
        
        if self.__db.connect():
            
            try:
                if userId == None:
                    #check session id and get user id
                    auth = AuthenticationManager()
                    if auth.isSessionIdCorrect(self.__sessionId):
                        self.__userId = auth.getUser().getUserId()
                else:
                    self.__userId = userId
                    
                if self.__userId != None:
                    sql = 'SELECT `username` FROM `user` WHERE `user_id`="'+str(self.__userId)+'";'
                    self.__db.execute(sql)
                    username = self.__db.getCursor().fetchone()[0]
                    self.__db.lock({'reservation':'READ'})
                    sql = 'SELECT `reservation_id`, `title`, `description`, `start`, `end`, `image_type`, `type` FROM `reservation` WHERE `user_id`="'+str(self.__userId)+'";'
                    self.__db.execute(sql)
                    data = self.__db.getCursor().fetchall()
                    currentTime = NOW
                    
                    for d in data:
                        end = d[4]
                        diff = currentTime - end
                        
                        r = Reservation(d)
                        r.setOwner(username)
                        
                        r.setReservationsSite() 
                        status = r.getReservationsSite()[0].getStatus()
                        
                        if ended:
                            #history (already ended)
                            if diff >= timedelta(hours=0) or status == 'cancel':
                                self.__reservations.append(r)
                        
                        else:
                            #see reservations which havn't ended
                            if diff < timedelta(hours=0) and status != 'cancel':                   
                                self.__reservations.append(r)     
                                
                    self.__db.unlock()
            finally:
                self.__db.close()
                
        return self.__reservations
    
    def getAllReservations(self, sessionId, ended = True):
        self.__db = Database()        
        self.__sessionId = sessionId
        self.__allReservations = []
        
        if self.__db.connect():
            #check session id and get user id
            auth = AuthenticationManager()
            if auth.isSessionIdCorrect(self.__sessionId):
                self.__userId = auth.getUser().getUserId()
                sql = 'SELECT `status` FROM `user` WHERE `user_id` = "'+str(self.__userId)+'";'
                self.__db.execute(sql)
                status = self.__db.getCursor().fetchone()[0]
                
                if str(status).lower() != 'admin':
                    return False
                else:
                    #get all reservations in the system
                    sql = 'SELECT `user_id` FROM `user`;'
                    self.__db.execute(sql)
                    data = self.__db.getCursor().fetchall()
                    
                    for d in data:
                        self.__allReservations.append(self.getReservations(userId=d[0],ended=ended))
              
        return self.__allReservations
        
    def getReservation(self, sessionId, reservationId):
        self.__db = Database()        
        self.__sessionId = sessionId
        
        if self.__db.connect():
            #check session id and get user id
            auth = AuthenticationManager()
            if auth.isSessionIdCorrect(self.__sessionId):
                self.__userId = auth.getUser().getUserId()
                sql = 'SELECT `username`, `status` FROM `user` WHERE `user_id` = "'+str(self.__userId)+'";'
                self.__db.execute(sql)
                u = self.__db.getCursor().fetchone()
                username = u[0]
                status = u[1]
                
                if str(status).lower() == 'admin':
                    sql = 'SELECT `reservation_id`, `title`, `description`, `start`, `end`, `image_type`, `type` FROM `reservation` WHERE `reservation_id`="'+str(reservationId)+'";'   
                    self.__db.execute(sql)
                    data = self.__db.getCursor().fetchone()
                   
                    r = Reservation(data)
                    r.setOwner(username)
                    
                    r.setReservationsSite() 
                    status = r.getReservationsSite()[0].getStatus()
                    return r
                                
        return None
            
        
    def extend(self, sessionId, end, reservationId):

        self.__db = Database() 
        sites = []
        
        if self.__db.connect():
            
            #check session id and get user id
            auth = AuthenticationManager()
            if auth.isSessionIdCorrect(sessionId):
                self.__userId = auth.getUser().getUserId()
                
                try:
                    self.__db.lock({'site':'READ','schedule':'WRITE','site_reserved':'READ','reservation':'WRITE'})
                    sql = 'SELECT `end` FROM `reservation` WHERE `reservation_id`="'+str(reservationId)+'";'
                    self.__db.execute(sql)
                    data = self.__db.getCursor().fetchone()            
                    endOld = str(data[0])
                    
                    if endOld != end:
                    
                        sql = 'SELECT * FROM `site_reserved` WHERE `reservation_id` = "'+str(reservationId)+'";'
                        self.__db.execute(sql)
                        data = self.__db.getCursor().fetchall()   
            
                        siteManager = SiteManager()
                        
                        for d in data:
                            
                            #one round = one site
                            siteId = d[1]
                            site = siteManager.getSite(siteId=siteId,dateReq=endOld,end=end,db=self.__db,locked=True)
                            
                            #check resource available from end of this reservation to end of new reservation
                            r = site.getResources()
                            for i in range(0,len(site.getResources())):
                                #d[4] = CPU, d[5] = Memory
                                if int(r[i].getAvailableAmount()) < int(d[4+i]):
                                    return False
                                r[i].setAmount(d[4+i])
                            
                            sites.append(site)
                                
                            
            
                        #----the resources are available----#
                        #reservation table
                        sql = 'UPDATE `reservation` SET `end` = "'+str(end)+'" WHERE `reservation_id` = "'+str(reservationId)+'";'
                        self.__db.execute(sql)  
    
                        
                        #site_reserved table no need to be updated
                        
                        #schedule table
                        tmpBegin = str(endOld)
                        beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                            
                        while beginToEnd>=timedelta(hours=1):
                            
                            tmpEnd = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                                
                            for i in range(0,len(sites)):
                                
                                siteId = sites[i].getSiteId()
                                r = sites[i].getResources()
                                
                                self.__db.execute('SELECT * FROM `schedule` WHERE `site_id` = "'+str(siteId)+'" and `start` = "'+str(tmpBegin)+'";')
                                data = self.__db.getCursor().fetchone()
                                
                                if data == None:
                                    #still not have this time slot of this site
                                
                                    sql = 'INSERT INTO `schedule` VALUES ('
                                    sql += '"'+str(siteId)+'","'+str(tmpBegin)+'","'+str(tmpEnd)+'","'
                                    
                                    for j in range(0,len(r)):
                                        sql += str(r[j].getAmount())+'","'
                                     
                                    sql = sql[:-2]
                                    sql += ');'
                                
                                else:
                                    #already have this time slot of this site
                                
                                    self.__db.execute("SELECT * FROM `schedule` LIMIT 0;")
                                    tableDesc = self.__db.getCursor().description
                                    
                                    sql = 'UPDATE `schedule` SET'
                                    
                                    for j in range(0,len(r)):
                                        #note : data[3] is CPU
                                        sql += ' `'+str(tableDesc[3+j][0]) + '` = "' + str(int(r[j].getAmount())+int(data[3+j]))+'",'
                                     
                                    sql = sql[:-1]
                                    sql += ' WHERE `site_id` = "'+str(siteId)+'" AND `start` = "'+str(tmpBegin)+'";'
                                    
                                self.__db.execute(sql)
                                    
                                
                            tmpBegin = tmpEnd
                            beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                    
                    
                        self.__db.commit()
                        return True
                
                except:
                    self.__db.rollback()
                    return False
                finally:
                    self.__db.unlock()
                    self.__db.close() 
                  
            else:
                self.__db.close() 
            
        return False
    
    
    def cancel(self, sessionId, reservationId, reason):
        self.__db = Database() 
        
        if self.__db.connect():
            try:
                #check session id and get user id
                auth = AuthenticationManager()
                if auth.isSessionIdCorrect(sessionId):
                    self.__userId = auth.getUser().getUserId()               
                    
                    #---get start and end time of reservation---
                    sql = 'SELECT `start`, `end` FROM `reservation` WHERE `reservation_id` = "'+str(reservationId)+'";'
                    self.__db.execute(sql)
                    data = self.__db.getCursor().fetchone()    
                    begin = str(data[0])
                    end = str(data[1])
                    
                    #---get list of site in the reservation---
                    sql = 'SELECT * FROM `site_reserved` WHERE `reservation_id` = "'+str(reservationId)+'";'
                    self.__db.execute(sql)
                    data = self.__db.getCursor().fetchall()    
                    sites = []
                    
                    for d in data:
                        siteId = d[1]
                        
                        self.__db.execute('SELECT * FROM `site` WHERE `site_id` = "'+str(siteId)+'";')
                        site_data = self.__db.getCursor().fetchone()   
                        
                        site = Site(site_data) #create site just for getting the amount of resource types
                        r = site.getResources()
                            
                        for i in range(0,len(r)):
                            #d[4] = CPU, d[5] = Memory
                            r[i].setAmount(d[4+i])
                        
                        sites.append(site)
                    
                    
                    #---set new the reservation table data---
                    #reservation table
                    newEnd = NOW.strftime("%Y-%m-%d %H:00:00") 
                    sql = 'UPDATE `reservation` SET `end`="'+str(newEnd)+'" WHERE `reservation_id` = "'+str(reservationId)+'";'   
                    self.__db.execute(sql)                      
                        
                    #site_reserved table
                    sql = 'UPDATE `site_reserved` SET `status`="cancel" WHERE `reservation_id` = "'+str(reservationId)+'";'
                    self.__db.execute(sql)
                    
                    
                    #canceled_reservation table
                    sql = 'INSERT INTO `canceled_reservation` VALUES ( "'+str(reservationId)+'", "'+str(reason)+'", "'+str(end)+'");'             
                    self.__db.execute(sql)
                    
                    
                    #schedule table 
                    self.__db.lock({'schedule':'WRITE'})
                    diff = datetime.strptime(begin, "%Y-%m-%d %H:00:00")-NOW
                    if diff < timedelta(hours=0):
                        #running reservation
                        tmpBegin = (NOW + timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")                                                                    
                    else:
                        #havn't start yet
                        tmpBegin = begin
                        
                    beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
                        
                    while beginToEnd>=timedelta(hours=1):
                        tmpEnd = (datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")+timedelta(hours=1)).strftime("%Y-%m-%d %H:00:00")
                            
                        for i in range(0,len(sites)):
                            
                            siteId = sites[i].getSiteId()
                            r = sites[i].getResources()
                            sql = 'SELECT * FROM `schedule` WHERE `site_id` = "'+str(siteId)+'" and `start` = "'+str(tmpBegin)+'";'
                            self.__db.execute(sql)
                            data = self.__db.getCursor().fetchone()
                            
                            usedAmount = []
                            for k in range(0,len(r)):
                                #CPU = data[3], Memory = data[4]
                                usedAmount.append(data[k+3])
                            
                            tableDesc = self.__db.getCursor().description
                            
                            sql = 'UPDATE `schedule` SET'
                            
                            for j in range(0,len(r)):
                                #note : data[3] is CPU
                                sql += ' `'+str(tableDesc[3+j][0]) + '` = "' + str(int(usedAmount[j])-int(r[j].getAmount()))+'",'
                             
                            sql = sql[:-1]
                            sql += ' WHERE `site_id` = "'+str(siteId)+'" AND `start` = "'+str(tmpBegin)+'";'
             
                            self.__db.execute(sql)
                         
                        tmpBegin = tmpEnd
                        beginToEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")-datetime.strptime(tmpBegin, "%Y-%m-%d %H:00:00")
     
                    
                    self.__db.commit()
                    return True
                
            except:
                self.__db.rollback()
                return False
            finally:
                self.__db.close()
            
        return False
        
    def updateReservationStatus(self,sessionId,reservationId,siteId,reservationStatus, adminDescription=''):
        self.__db = Database()        
        self.__sessionId = sessionId
        self.__allReservations = []
        
        if self.__db.connect():
            #check session id and get user id
            auth = AuthenticationManager()
            if auth.isSessionIdCorrect(self.__sessionId):
                self.__userId = auth.getUser().getUserId()
                sql = 'SELECT `status` FROM `user` WHERE `user_id` = "'+str(self.__userId)+'";'
                self.__db.execute(sql)
                status = self.__db.getCursor().fetchone()[0]
                
                if str(status).lower() != 'admin':
                    return False
                else:
                    #update site_reserved table
                    sql = 'UPDATE `site_reserved` SET `status` = "'+str(reservationStatus)+'" WHERE `reservation_id` = "'+str(reservationId)+'" AND `site_id` = "'+str(siteId)+'";'
                    sql2 = 'UPDATE `site_reserved` SET `admin_description` = "'+str(adminDescription)+'" WHERE `reservation_id` = "'+str(reservationId)+'" AND `site_id` = "'+str(siteId)+'";'

                    if self.__db.execute(sql2):
                        if self.__db.execute(sql):
                            #update both site's status and admin's description
                            self.__db.commit()
                            return True
                        else:
                            #update an admin's description but site's status is as same as the previous version
                            sql = 'SELECT * FROM `site_reserved` WHERE `status` = "'+str(reservationStatus)+'" AND `reservation_id` = "'+str(reservationId)+'" AND `site_id` = "'+str(siteId)+'";'
                            if self.__db.execute(sql):
                                if self.__db.getCursor().fetchone() != None:
                                    self.__db.commit()
                                    return True

        return False
