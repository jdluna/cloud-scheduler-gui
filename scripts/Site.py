#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 01:52:36 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()


from Database import Database


class Site:
    __site_id = None
    __name = None
    __description = None
    __contact = None
    __location = None
    __pragma_boot_path = None
    __pragma_boot_version = None
    __python_path = None
    __temp_dir = None
    __username = None
    __deployment_type = None
    __site_hostname = None
    __latitude = None
    __longitude = None
    __image_types = []
    __connection_types = []
    __resources = []
    __beginAvailable = None
    __endAvailable = None
    __running = None
    
    def __init__(self, site_id, name=None, description=None, contact=None, location=None, pragma_boot_path=None, pragma_boot_version=None, python_path=None,temp_dir=None, username=None, deployment_type=None, site_hostname=None, latitude=None, longitude=None):
        self.__site_id = site_id
        self.__name = name
        self.__description = description
        self.__contact = contact
        self.__location = location
        self.__pragma_boot_path = pragma_boot_path
        self.__pragma_boot_version = pragma_boot_version
        self.__python_path = python_path
        self.__temp_dir = temp_dir
        self.__username = username
        self.__deployment_type = deployment_type
        self.__site_hostname = site_hostname
        self.__latitude = latitude
        self.__longitude = longitude
        self.__image_types = []
        self.__connection_types = []
        self.__resources = []
        self.__setConnectionType()
        self.__setImageType()
        self.__beginAvailable = None
        self.__endAvailable = None
        self.__running = None
            
        
    def getSiteId(self):
        return self.__site_id    
        
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
            sql = "SELECT `image_type` FROM `image_type` WHERE `site_id` = '"+str(self.__site_id)+"';"
            
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
            sql = "SELECT `connection_type` FROM `connection_type` WHERE `site_id` = '"+str(self.__site_id)+"';"
            
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
        sql = "SELECT `start` FROM `reservation` JOIN `site_reserved` ON `reservation`.`reservation_id` = `site_reserved`.`reservation_id` WHERE `site_reserved`.`site_id` = '"+str(self.__site_id)+"' AND `start` = '"+str(begin)+"';"
            
        if db.execute(sql) :
            self.__running = db.fetchall()
        
    def getRunningAmount(self):  
        if self.__running == None:
            self.__running = []
        return len(self.__running)
        
    def setStatus(self,status):
        self.__status = status
        
    def getStatus(self):
        return self.__status
        