#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 01:52:36 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

from Database import Database

from Site import Site
from Resource import CPU, Memory
from datetime import datetime


class SiteManager:
    
    __sites = []
    
    def __init__(self):
        self.__sites = []
    
    def getAllSites(self):

        db = Database()
        if db.connect():
            db.execute("SELECT * FROM `test_site`;")
            data = db.getCursor().fetchall()
            for d in data:
                site = Site(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13])
                
                site.addResource(CPU(d[14]))
                site.addResource(Memory(d[15]))
                                
                self.__sites.append(site)
                
            return self.__sites
        else:
            return None

    def getSites(self,cpu=0,memory=0,begin=datetime.now().strftime("%Y-%m-%d %H:00:00"),end=None,allPeriod=True,days=None,hours=None,connectionType=None, imageType='Any'):
        
        self.__sites = self.getAllSites()
        result = []

        for s in self.__sites:
            
            res = s.getResources()
            status = False
            
            #check CPU
            if int(res[0].getAvailableAmount()) >= int(cpu):
                status = True
                
            #check memory
            if status != False and int(res[1].getAvailableAmount()) >= int(memory):
                status = True
            else:
                status = False
                
            #check connection type
            if status != False and (connectionType == None or connectionType in s.getConnectionType()) :
                status = True
            else:
                status = False
                
            #check image type
            if status != False and (imageType == 'Any' or imageType in s.getImageType()) :
                status = True
            else:
                status = False
            
            if status:
                result.append(s)
                
                
        return result
        