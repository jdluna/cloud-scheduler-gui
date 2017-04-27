#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 01:52:36 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()


from Database import Database
from Resource import CPU, Memory


class Site:
    __resources = []
    
    def __init__(self, site=None, site_id=None):   
        
        if site_id != None:
            self.__siteId = site_id
        
        if site != None:
            self.__siteId = site[0]
            self.__name = site[1]
            self.__description = site[2]
            self.__contact = site[3]
            self.__location = site[4]
            self.__pragma_boot_path = site[5]
            self.__pragma_boot_version = site[6]
            self.__python_path = site[7]
            self.__temp_dir = site[8]
            self.__username = site[9]
            self.__deployment_type = site[10]
            self.__site_hostname = site[11]
            self.__latitude = site[12]
            self.__longitude = site[13]
            
            db = Database()
            if db.connect() :
                db.execute("START TRANSACTION;")
                self.addResource(db,CPU(siteId=self.__siteId, total=site[14]))
                self.addResource(db,Memory(siteId=self.__siteId, total=site[15]))
            db.close
            
        self.__image_types = []
        self.__connection_types = []
        self.__resources = []
        self.__setConnectionType()
        self.__setImageType()
            
        self.__beginAvailable = None
        self.__endAvailable = None
            
        
    def getSiteId(self):
        return self.__siteId    
        
    def setName(self,name):
        self.__name = name
    
    def getName(self):
        return self.__name   
        
    def getDescription(self):
        return self.__description  
        
    def getContact(self):
        return self.__contact   
        
    def getLocation(self):
        return self.__location   
        
    def getPragmaBootPath(self):
        return self.__pragma_boot_path   
        
    def getPragmaBootVersion(self):
        return self.__pragma_boot_version   
        
    def getPythonPath(self):
        return self.__python_path   
        
    def getTempDir(self):
        return self.__temp_dir 
        
    def getUsername(self):
        return self.__username   
        
    def getDeploymentType(self):
        return self.__deployment_type   
        
    def getSiteHostname(self):
        return self.__site_hostname  
        
    def getLatitude(self):
        return self.__latitude   
        
    def getLongitude(self):
        return self.__longitude   
        
    def getImageTypeId(self):
        return self.__image_type_id   

    def __setImageType(self):
        
        db = Database()
        if db.connect() :
            sql = "SELECT `image_type` FROM `image_type` WHERE `site_id` = '"+str(self.__siteId)+"';"
            
            if db.execute(sql) :
                data = db.fetchall()
                
                for d in data:
                    self.__image_types.append(d[0])
                       
            db.close()
    
    def getImageType(self):
        return self.__image_types
        
        
    def getConnectionId(self):
        return self.__connection_id  
        
    def __setConnectionType(self):        
        db = Database()
        if db.connect() :
            sql = "SELECT `connection_type` FROM `connection_type` WHERE `site_id` = '"+str(self.__siteId)+"';"
            
            if db.execute(sql) :
                data = db.fetchall()
                
                for d in data:
                    self.__connection_types.append(d[0])
                       
            db.close()


    def getConnectionType(self):        
        return self.__connection_types
        
        
    def addResource(self,db,res):
        res.setAvailableAmount(db=db)
        self.__resources.append(res)
        
    def setResources(self,res):
        self.__resources = res
        
    def getResources(self):
        return self.__resources 


    def setBeginAvailable(self,d):
        self.__beginAvailable = d   
        
    def getBeginAvailable(self):
        return self.__beginAvailable
        
    def setEndAvailable(self,d):
        self.__endAvailable = d
    
    def getEndAvailable(self):
        return self.__endAvailable     
        
    def setRunningAmount(self,db,begin):
        sql = "SELECT `start` FROM `reservation` JOIN `site_reserved` ON `reservation`.`reservation_id` = `site_reserved`.`reservation_id` WHERE `site_reserved`.`site_id` = '"+str(self.__siteId)+"' AND `start` = '"+str(begin)+"';"
            
        if db.execute(sql) :
            self.__runningAmount = len(db.fetchall())
        else:
            self.__runningAmount = 0
        
    def getRunningAmount(self):  
        return self.__runningAmount
        
    def setStatus(self,status):
        self.__status = status
        
    def getStatus(self):
        return self.__status
        