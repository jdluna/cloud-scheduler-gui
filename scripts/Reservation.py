#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 08 23:54:20 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()


from Database import Database
from Site import Site


class Reservation:
    
    def __init__(self):
        self.__sites=[]
    
    def setReservationId(self, reservationId):
        self.__reservationId = reservationId
        
    def getReservationId(self):
        return self.__reservationId
           
    def setTitle(self,title):
        self.__title = title
        
    def getTitle(self):
        return self.__title
        
    def setEnd(self, end):
        self.__end = end
        
    def getEnd(self):
        return self.__end
        
      
    def setReservationStatus(self):
        self.__db = Database()
        if self.__db.connect():
            sql = 'SELECT `site_id`,`status` FROM `site_reserved` WHERE `reservation_id` = "'+str(self.__reservationId)+'"'
            self.__db.execute(sql)
            data = self.__db.getCursor().fetchall()
            for d in data:
                siteId = d[0]
                s = Site(site_id = siteId)
                s.setStatus(d[1])
                
                self.__db.execute('SELECT `name` FROM `site` WHERE `site_id`="'+str(siteId)+'"')
                s.setName(self.__db.getCursor().fetchone()[0])
                self.__sites.append(s)
                
        
    def getReservationStatus(self):
        return self.__sites
        