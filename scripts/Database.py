#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 07 22:26:22 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()

import os
os.environ['PYTHON_EGG_CACHE'] = '/tmp'

import MySQLdb as db

###### variable for database #######
HOST = "localhost"
USER = "root"
PWD = "" 
DBNAME = "pragma"
WAIT_TIMEOUT = 180
####################################

class Database: 
    
    __conn = None
    __cur = None
    
    
    def connect(self):        
        self.__conn = db.connect(HOST,USER,PWD,DBNAME)
        if self.__conn :
            self.__conn.autocommit(False)
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
        
    def rollback(self):
        return self.__conn.rollback()
        
    def fetchone(self):
        return self.__cur.fetchone()
        
    def fetchall(self):
        return self.__cur.fetchall()
        
    def setTimeout(self):
        self.execute('SET WAIT_TIMEOUT = '+str(WAIT_TIMEOUT)+';')
        
    def lock(self,dic):
        self.setTimeout()
        sql = 'LOCK TABLE '
        for k, v in dic.iteritems():
            sql += '`'+k+'` '+v+','
        if len(dic) > 0:
            sql = sql[:-1]
        self.execute(sql)
        
    def unlock(self):
        self.execute('UNLOCK TABLES')
        
    def close(self):
        self.__conn.close()
        
        
        
        