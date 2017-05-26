#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 07 22:26:22 2017

@author: CS401:Nannapas Banluesombatkul
"""

TIME_SESSION = 30

import cgitb
cgitb.enable()


from User import User
import datetime
import hashlib
from Database import Database
        
class AuthenticationManager: 

    
    def __init__(self):
        self.__usr = None

    
    def authenticate(self,username,password):
        self.createUser(username)
        hashObject = hashlib.sha512(password)
        passwordDig = hashObject.hexdigest()
        
        if self.getUser() != None and self.getUser().getPassword() == passwordDig:
            return True
        else:
            return False
        
        
    def getUser(self):
        return self.__usr  
        
    
    def isSessionExpired(self,sessionId):
        db = Database()        
        
        if db.connect() :     
            sql = "SELECT `last_login` FROM `session` WHERE `session_id` = '"+str(sessionId)+"';"
            
            if db.execute(sql):
                data = db.fetchone()
                if data != None:
                    ##calculate different time
                    currentTime = datetime.datetime.now()
                    lastLogin = data[0]
                    if (currentTime - lastLogin).total_seconds() / 60 > TIME_SESSION :
                        #session expired
                        return True
                    else:
                        #session not expired
                        return False
                        
        #database cannot connect or no session_id
        return True
    
        
    def createUser(self,username,getAnotherUserData=False):

        db = Database()
        if db.connect():
            sql = "SELECT * FROM `user` WHERE `username` = '"+str(username)+"';"
            db.execute(sql)
            data = db.getCursor().fetchone()
        
            if data != None:
                self.__usr = User(data=data,getAnotherUserData=getAnotherUserData)
        
            db.close()
    
    def isSessionIdCorrect(self, sessionId):
        self.__usr = User(sessionId = sessionId)
        
        if self.__usr.getUserId() != None:
            return True
            
        return False
                