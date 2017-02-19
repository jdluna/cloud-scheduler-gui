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

class Resource:
    __total = None
    __type = None
    __availableAmount = None
    
    def __init__(self,total=None,typ=None,availAmount=None):
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



class CPU(Resource,object):
    
    def __init__(self,total=None,availAmount=None):
        super(CPU,self).setType("CPU")
        super(CPU,self).setTotal(total)
        
    def getAvailableAmount(self,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00")):
        #calculate available amount
        self.__availableAmount = int(self.getTotal())-10
        '''db = Database()
        if db.connect() :
            sql = "SELECT `image_type` FROM `test_image_type_name` WHERE `site_id` = '"+str(self.__site_id)+"';"
            
            if db.execute(sql) :
                data = db.fetchall()
                
                for d in data:
                    self.__image_types.append(d[0])
                       
            db.close()'''
        
    
        return self.__availableAmount  



class Memory(Resource,object):

    def __init__(self,total=None,availAmount=None):
        super(Memory,self).setType("memory")
        super(Memory,self).setTotal(total)

    def getAvailableAmount(self,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00")):
        #calculate available amount
        self.__availableAmount = int(self.getTotal())-10
    
        return self.__availableAmount  