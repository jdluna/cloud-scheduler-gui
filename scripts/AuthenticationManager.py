#!/Python27/python
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


print "Content-Type: text/html"     
print
        
        
class AuthenticationManager: 
    __username = ''
    __password = ''
    __usr = None
    __sessionId = None
    __userId = None
    __firstname = None
    __lastName = None
    __emailAddress = None
    __phoneNumber = None
    __status = None
    __timezone = None
    __organization = None
    __position = None
    __language = None
    __isAthenticate = False
    
    def __init__(self,username,password):
        self.__username = username
        self.__password = password
        self.__usr = None
        self.__isAthenticate = False
        
    
    
    def authenticate(self):
        db = Database()
        if db.connect():
            hashObject = hashlib.sha512(self.__password)
            passwordDig = hashObject.hexdigest()
            sql = "SELECT * FROM `user` WHERE `username` = '"+str(self.__username)+"' AND `password` = '"+str(passwordDig)+"';"
            db.execute(sql)
            data = db.getCursor().fetchone()
        
            if data != None:
                self.__isAthenticate = True
                '''
                self.__userId = data[0]
                self.__username = data[1]
                self.__firstname = data[3]
                self.__lastName = data[4]
                self.__emailAddress = data[5]
                self.__phoneNumber = data[6]
                self.__status = data[7]
                self.__organization = data[8]
                self.__position = data[9]
                self.__language = data[10]
                self.__timezone = data[11]
                '''
                self.__usr = User(self.__username,data[0],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11])
                
                db.close()

        return self.__isAthenticate
        
        
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
    
        
        
auth = AuthenticationManager('project401','1234')

if auth.authenticate() :
    sess = auth.getUser().getSessionToken()
    print sess + '</br>'
    print auth.isSessionExpired(sess)