#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 16:44:00 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


from datetime import datetime
import re

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
    
    def setAvailableAmount(self,db=None,typ=None,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00"),allPeriod=True,days=None,hours=None):
        siteId = self.__siteId
            
        #set begin data
        spl = re.split(' |-|:',begin)
        
        yBegin = spl[0]
        mBegin = spl[1]
        dBegin = spl[2]
        hhBegin = spl[3]
        
        #set end data
        spl2 = re.split(' |-|:',end)
        
        yEnd = spl2[0]
        mEnd = spl2[1]
        dEnd = spl2[2]
        hhEnd = spl2[3]
        
        
        maxUsed = 0
        
        if begin == end:
            #get dashboard => get only one hour
            sql2 = "SELECT `"+str(typ).lower()+"` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `start` = '"+str(begin)+"';"

            if db.execute(sql2) :
                maxUsed = db.fetchone()[0]
        
        elif allPeriod == True:
            #function 'search' which has specific begin and end datetime
            for l in range(int(yBegin),int(yEnd)+1):
                """ one round = one year """ 
                
                #first year     -> begin month will use value from user specify (real mBegin)
                #               -> end month have to check first: is that the end year? 
                #                                               true => use value from user specify
                #                                               false => fix value to last month of the year
            
                if l == int(yEnd):
                    #do while begin and end in same year OR this round is the last year from begin to end
                    mEnd = spl2[1]
                else:
                    #do while this is not last year from begin to end
                    mEnd = str(12)
            
                for k in range(int(mBegin),int(mEnd)+1):
                    """ one round = one month """ 
                    
                    #first month    -> begin day will use value from user specify (real dBegin)
                    #               -> end day have to check first: is that the end month? 
                    #                                               true => use value from user specify
                    #                                               false => fix value to last day of the month
                    
                    
                    if k == int(mEnd):
                        #do while begin and end in same month OR this round is the last month from begin to end
                        dEnd = spl2[2]
                    else:
                        #do while this is not last month from begin to end
                        if k in MONTH29DAYS:
                            #February
                            dEnd = str(29)
                        elif k in MONTH30DAYS:
                            dEnd = str(30)
                        else:
                            dEnd = str(31)
            
                    for j in range(int(dBegin),int(dEnd)+1):
                        """ one round = one day """ 
                        
                        #first day  -> begin hour will use value from user specify
                        #           -> end hour have to check first:    is that the end day? 
                        #                                               true => use value from user specify
                        #                                               false => fix value to 24 (because it will work to 23)
                        
                
                        if j == int(dEnd):
                            #do while begin and end in same day OR this round is the last day from begin to end
                            hhEnd = spl2[3]
                        else:
                            #do while this is not last day from begin to end
                            hhEnd = str(24)
                        
                        for i in range(int(hhBegin),int(hhEnd)):
                            """ one round = one hour """        
                            
                            spl = ["%02d" % int(x) for x in spl]
                            beginStr = str(spl[0])+'-'+str(spl[1])+'-'+str(spl[2])+' '+str(spl[3])+':00:00'
                        
                            sql2 = "SELECT `"+str(typ).lower()+"` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `start` = '"+str(beginStr)+"';"                                
                            if db.execute(sql2) :
                                used = db.fetchone()[0]
                                if used > maxUsed:
                                    maxUsed = used
                            else:
                                used = 0
                                
                            #update hour to next hour    
                            spl[3] = str(int(spl[3])+1) 
                            
                            
                        #update day to next day    
                        spl[2] = str(int(spl[2])+1) 
                        #update hour to begin of the day
                        hhBegin = 0
                        spl[3] = str(hhBegin)
                        
                    #update month to next month    
                    spl[1] = str(int(spl[1])+1) 
                    #update day to begin of the month
                    dBegin = 1
                    spl[2] = str(dBegin)  
                    
                #update year to next year    
                spl[0] = str(int(spl[0])+1) 
                #update day to begin of the month
                mBegin = 1
                spl[1] = str(mBegin) 
            
        else:
            #all period = False
            hours = int(days)*24+int(hours)
            
            
            
            for l in range(int(yBegin),int(yEnd)+1):
                """ one round = one year """ 
                
                #first year     -> begin month will use value from user specify (real mBegin)
                #               -> end month have to check first: is that the end year? 
                #                                               true => use value from user specify
                #                                               false => fix value to last month of the year
            
                if l == int(yEnd):
                    #do while begin and end in same year OR this round is the last year from begin to end
                    mEnd = spl2[1]
                else:
                    #do while this is not last year from begin to end
                    mEnd = str(12)
            
                for k in range(int(mBegin),int(mEnd)+1):
                    """ one round = one month """ 
                    
                    #first month    -> begin day will use value from user specify (real dBegin)
                    #               -> end day have to check first: is that the end month? 
                    #                                               true => use value from user specify
                    #                                               false => fix value to last day of the month
                    
                    
                    if k == int(mEnd):
                        #do while begin and end in same month OR this round is the last month from begin to end
                        dEnd = spl2[2]
                    else:
                        #do while this is not last month from begin to end
                        if k in MONTH29DAYS:
                            #February
                            dEnd = str(29)
                        elif k in MONTH30DAYS:
                            dEnd = str(30)
                        else:
                            dEnd = str(31)
            
                    for j in range(int(dBegin),int(dEnd)+1):
                        """ one round = one day """ 
                        
                        #first day  -> begin hour will use value from user specify
                        #           -> end hour have to check first:    is that the end day? 
                        #                                               true => use value from user specify
                        #                                               false => fix value to 24 (because it will work to 23)
                        
                
                        if j == int(dEnd):
                            #do while begin and end in same day OR this round is the last day from begin to end
                            hhEnd = spl2[3]
                        else:
                            #do while this is not last day from begin to end
                            hhEnd = str(24)
                        
                        for i in range(int(hhBegin),int(hhEnd)):
                            """ one round = one hour """        
                            
                            spl = ["%02d" % int(x) for x in spl]
                            beginStr = str(spl[0])+'-'+str(spl[1])+'-'+str(spl[2])+' '+str(spl[3])+':00:00'
                        
                            sql2 = "SELECT `"+str(typ).lower()+"` FROM `schedule` WHERE `site_id` = '"+str(siteId)+"' AND `start` = '"+str(beginStr)+"';"                                
                            if db.execute(sql2) :
                                used = db.fetchone()[0]
                                if used > maxUsed:
                                    maxUsed = used
                            else:
                                used = 0
                                
                            #update hour to next hour    
                            spl[3] = str(int(spl[3])+1) 
                            
                            
                        #update day to next day    
                        spl[2] = str(int(spl[2])+1) 
                        #update hour to begin of the day
                        hhBegin = 0
                        spl[3] = str(hhBegin)
                        
                    #update month to next month    
                    spl[1] = str(int(spl[1])+1) 
                    #update day to begin of the month
                    dBegin = 1
                    spl[2] = str(dBegin)  
                    
                #update year to next year    
                spl[0] = str(int(spl[0])+1) 
                #update day to begin of the month
                mBegin = 1
                spl[1] = str(mBegin) 
                    
        
        self.__availableAmount = int(self.getTotal())-int(maxUsed)
        
    def getAvailableAmount(self) :
        return self.__availableAmount  
        



class CPU(Resource,object):
    
    def __init__(self,siteId=None,total=None,availAmount=None):
        
        super(CPU,self).setType("CPU")
        super(CPU,self).setTotal(total)
        super(CPU,self).setSiteId(siteId)
        
    
    def setAvailableAmount(self,db=None,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00"),allPeriod=True,days=None,hours=None):
        self.__availableAmount = super(CPU,self).setAvailableAmount(db=db,typ='CPU',begin=begin,end=end,allPeriod=allPeriod,days=days,hours=hours)



class Memory(Resource,object):

    def __init__(self,siteId=None,total=None,availAmount=None):
        super(Memory,self).setType("memory")
        super(Memory,self).setTotal(total)
        super(Memory,self).setSiteId(siteId)

    def setAvailableAmount(self,db=None,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=datetime.now().strftime("%Y-%m-%d %H:00:00"),allPeriod=True,days=None,hours=None):
        self.__availableAmount = super(Memory,self).setAvailableAmount(db=db,typ='Memory',begin=begin,end=end,allPeriod=allPeriod,days=days,hours=hours)
    
