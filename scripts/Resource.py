#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 16:44:00 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


from datetime import datetime,timedelta
NOW = datetime.utcnow()

MONTH29DAYS = [2]
MONTH30DAYS = [4,6,9,11]
MONTH31DAYS = [1,3,5,7,8,10,12]

class Resource:
    __total = None
    __type = None
    __availableAmount = None
    __siteId = None
    
    def __init__(self,siteId=None,total=None,typ=None,availAmount=None):
        self.__total = total
        self.__type = typ
        self.__availableAmount = availAmount
	self.__siteId = siteId
    
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
    
    def setAvailableAmount(self,db=None,begin=NOW.strftime("%Y-%m-%d %H:00:00"),end=NOW.strftime("%Y-%m-%d %H:00:00")):
        begin = str(begin)
        end = str(end)
        typ = self.getType()
        siteId = self.__siteId 
        maxUsed = 0
        
        if begin == end:
            #get dashboard => get only one hour
            sql2 = "SELECT `"+str(typ).lower()+"` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `start` = '"+str(begin)+"';"
	    if db.execute(sql2) :
                maxUsed = db.fetchone()
                if maxUsed != None:
                    maxUsed = maxUsed[0]
		    print maxUsed
        
        else:
            #function 'search'
            
            tmpBegin = datetime.strptime(begin, "%Y-%m-%d %H:00:00")
            tmpEnd = datetime.strptime(end, "%Y-%m-%d %H:00:00")

            while tmpBegin != tmpEnd:
                """ one round = one hour """        

                sql2 = "SELECT `"+str(typ).lower()+"` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `start` = '"+str(tmpBegin.strftime("%Y-%m-%d %H:00:00"))+"';" 
		if db.execute(sql2) :
                    used = db.fetchone()
                    if used != None:
                        used = used[0]
                    if used > maxUsed:
                        maxUsed = used
                else:
                    used = 0
                    
                tmpBegin = tmpBegin + timedelta(hours=1)
                 
        
        self.__availableAmount = int(self.getTotal())-int(maxUsed)
        
        
    def getAvailableAmount(self) :
        return self.__availableAmount  
        
    def setAmount(self, amt):
        self.__amount  = amt

    def getAmount(self):
        return self.__amount 
        
    
