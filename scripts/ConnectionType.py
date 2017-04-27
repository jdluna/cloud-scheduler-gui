#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 16:44:00 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


class ConnectionType:
    __type = None
    
    def setType(self, t):
        self.__type = t
    
    def getType(self):
        return self.__type



class IPOP(ConnectionType,object):
    
    def __init__(self):
        super(IPOP,self).setType("IPOP")



class ENT(ConnectionType,object):

    def __init__(self):
        super(ENT,self).setType("ENT")