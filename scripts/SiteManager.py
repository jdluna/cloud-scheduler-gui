#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 01:52:36 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

from Database import Database

from Site import Site
from Resource import Resource


class SiteManager:
    
    __sites = []
    
    def __init__(self):
        self.__sites = []
    
    def getAllSites(self):
        db = Database()
        if db.connect():
            db.execute("SELECT * FROM `site`;")
            data = db.getCursor().fetchall()
            for d in data:
                site = Site(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13],d[14],d[15])
                
                site.addResource(Resource(d[16],"CPU"))
                site.addResource(Resource(d[17],"memory"))
                                
                self.__sites.append(site)
                
            return self.__sites
        else:
            return None

    def getSite(self):
        pass