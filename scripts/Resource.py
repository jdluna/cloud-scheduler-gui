#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 16:44:00 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


from datetime import datetime
from Database import Database
import re

class Resource:
    __total = None
    __type = None
    __availableAmount = None
    __siteId = None
    
    def __init__(self,siteId=None,total=None,typ=None,availAmount=None):
        self.__total = total
        self.__type = typ
        self.__availableAmount = availAmount
    
    def setTotal(self,total):
        self.__total = total
        
    def getTotal(self):
        return self.__total
    
    def setType(self, t):
        self.__type = t
    
    def getType(self):
        return self.__type    
        
    def setSiteId(self, s):
        self.__siteId = s
    
    def getSiteId(self):
        return self.__siteId  



class CPU(Resource,object):
    
    def __init__(self,siteId=None,total=None,availAmount=None):
        super(CPU,self).setType("CPU")
        super(CPU,self).setTotal(total)
        super(CPU,self).setSiteId(siteId)
        
    def setAvailableAmount(self,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00")):
        siteId = super(CPU,self).getSiteId()        
        
        #calculate available amount of CPU
        db = Database()
        if db.connect() :
            db.execute("START TRANSACTION;")
            sql = "SELECT `total_cpu` FROM `site` WHERE `site_id` = '"+str(siteId)+"';"
            if db.execute(sql) :
                total = db.fetchone()[0]
                
            #calculate id from sum of digit
            digit = ''.join(re.split(' |-|:',begin))
            number = sum(int(x) for x in digit if x.isdigit())
            
            
            sql2 = "SELECT `cpu` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `id` = '"+str(number)+"';"
                        
            if db.execute(sql2) :
                used = db.fetchone()[0]
            else:
                used = 0
        
        self.__availableAmount = int(total)-int(used)

    def getAvailableAmount(self) :
        return self.__availableAmount  



class Memory(Resource,object):

    def __init__(self,siteId=None,total=None,availAmount=None):
        super(Memory,self).setType("memory")
        super(Memory,self).setTotal(total)
        super(Memory,self).setSiteId(siteId)

    def setAvailableAmount(self,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00")):
        #calculate available amount of CPU
        siteId = super(Memory,self).getSiteId()
        db = Database()
        if db.connect() :
            db.execute("START TRANSACTION;")
            sql = "SELECT `total_memory` FROM `site` WHERE `site_id` = '"+str(siteId)+"';"
            if db.execute(sql) :
                total = db.fetchone()[0]
                
            #calculate id from sum of digit
            digit = ''.join(re.split(' |-|:',begin))
            number = sum(int(x) for x in digit if x.isdigit())
            
            sql2 = "SELECT `memory` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `id` = '"+str(number)+"';"
                        
            if db.execute(sql2) :
                used = db.fetchone()[0]
            else:
                used = 0
            
            db.close()
        
        self.__availableAmount = int(total)-int(used)
        
    def getAvailableAmount(self) :
        return self.__availableAmount  