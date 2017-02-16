#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 16:44:00 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


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
        
    def getAvailableAmount(self):
        #calculate available amount
        self.__availableAmount = int(self.getTotal())-10
    
        return self.__availableAmount  



class Memory(Resource,object):

    def __init__(self,total=None,availAmount=None):
        super(Memory,self).setType("memory")
        super(Memory,self).setTotal(total)

    def getAvailableAmount(self):
        #calculate available amount
        self.__availableAmount = int(self.getTotal())-10
    
        return self.__availableAmount  