#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 07 22:26:22 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()

import MySQLdb as db

###### variable for database #######
HOST = "localhost"
USER = "root"
PWD = "" 
DBNAME = "pragma"
####################################

class Database: 
    
    __conn = None
    __cur = None
    
    
    def connect(self):        
        self.__conn = db.connect(HOST,USER,PWD,DBNAME)
        if self.__conn :
            self.__cur = self.__conn.cursor()
            return True
        else:
            return False
            
    def getConn(self):
        return self.__conn
        
    def getCursor(self):
        return self.__cur
        
    def execute(self,sql):
        return self.__cur.execute(sql)
        
    def commit(self):
        return self.__conn.commit()
        
    def fetchone(self):
        return self.__cur.fetchone()
        
    def fetchall(self):
        return self.__cur.fetchall()
        
    def close(self):
        self.__conn.close()
        

        
        