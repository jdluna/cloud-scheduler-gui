#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 01 23:57:57 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()

import cgi
from SiteManager import SiteManager
from Site import Site
from Database import Database
import string
import random
from datetime import datetime,timedelta
from Reservation import Reservation
from AuthenticationManager import AuthenticationManager

NOW = datetime.utcnow()

class ResourceManager:

    def __init__(self):
        self.__name = None
        self.__description = None
        self.__contact = None
        self.__location = None
        self.__pragma_boot_path = None
        self.__pragma_boot_version = None
        self.__python_path = None
        self.__temp_dir = None
        self.__username = None
        self.__deployment_type = None
        self.__site_hostname = None
        self.__latitude = None
        self.__longitude = None
        self.__total_cpu = None
        self.__total_memory = None
        self.__network = None    # for connection type of resource
        self.__image_type = []
        self.__isComplete = False   # 이걸로 나중에 result를 success로 바꿀지 fail로 바꿀지 결정하는 변수임
        self.__db = None
        self.__check_name_duplication = False
        # 에러는 list, array의 형태로 관리하기


    # 리소스를 생성할 수 있는지 없는지 결정하는 함수 / 여기서 체크해야할 점은 name이 중복되는지 아닌지 확인하기
    def canCreateResource(self, name):
        self.__db = Database()
        self.__name = name

        # 디비 연결 되면, => 일단 auth 매니저도 제끼고 테스트 ㄱ
        if self.__db.connect():
            #auth = AuthenticationManager()

            # 여기서 site name 중복되는지 확인하기
            try:
                # 이걸로 사이트 이름 중복되는지 확인하는 쿼리문 날리기
                sql = 'SELECT `name` FROM `site` WHERE `name` = "' + str(self.__name)+'";'
                self.__db.execute(sql)
                data = self.__db.getCursor().fetchone()

                # 데이터 있으면 True로 바까줌
                if data != None:
                    self.__check_name_duplication = True
                    self.__db.unlock()
                    return False

                self.__isComplete = True
                self.__db.unlock()

            except:
                self.__db.rollback()
                self.__isComplete = False
            finally:
                self.__db.close()

            if self.__isComplete == True:
                return True
            else:
                return False
        else:
           return False
            # 이게 끝나고 DB 커넥션 에러 같은걸 만들어 주면 좋겠다 그치?

    def setConnectionType(self, name, network):
        self.__db = Database()
        self.__name = name
        self.__network = network
        connection_type = None
        site_id = None

        if self.__network == "ENT":
            connection_type = 1
        if self.__network == "IPOP":
            connection_type = 2

        if self.__db.connect():
            sql = 'SELECT `site_id` FROM `site` WHERE `name` = "' + str(self.__name)+'";'
            self.__db.execute(sql)
            site_id = self.__db.getCursor().fetchone()[0]

            sql = 'INSERT INTO `connection_type`(`site_id`,`connection_type_id` ) VALUES ( '+str(site_id)+' ,'+str(connection_type)+');'
            self.__db.execute(sql)
            self.__db.commit()
            self.__db.close()
        
    def setImageType(self, name, image_type):
        self.__db = Database()
        self.__name = name
        self.__image_type = image_type
        image_type_id = []
        site_id = None
        
        #convert list type
        self.__image_type = image_type.split(",")

        if self.__db.connect():
            sql = 'SELECT `site_id` FROM `site` WHERE `name` = "'+str(self.__name)+'";'
            self.__db.execute(sql)
            site_id = self.__db.getCursor().fetchone()[0]


            for i in self.__image_type:
                sql = 'SELECT `image_type_id` FROM `image_type_desc` WHERE `name` = "' + str(i) + '";'
                self.__db.execute(sql)
                image_type_id.append(self.__db.getCursor().fetchone()[0])


            for image in image_type_id:
                sql = 'INSERT INTO `image_type`(`site_id`,`image_type_id` ) VALUES ( '+str(site_id) + ' ,'+str(image)+');'
                self.__db.execute(sql)
            self.__db.commit()
            self.__db.close()


    def createResource(self, name, description,  contact, location, pragma_boot_path, pragma_boot_version, python_path, temp_dir, username, deployment_type, site_hostname, latitude, longitude, total_cpu, total_memory, network,image_type):
        self.__db = Database()
        self.__name = name
        self.__descrtiption = description
        self.__contact = contact
        self.__location = location
        self.__pragma_boot_path = pragma_boot_path
        self.__pragma_boot_version = pragma_boot_version
        self.__python_path = python_path
        self.__temp_dir = temp_dir
        self.__username = username
        self.__deployment_type = deployment_type
        self.__site_hostname = site_hostname
        self.__latitude = latitude
        self.__longitude = longitude
        self.__total_cpu = total_cpu
        self.__total_memory = total_memory
        self.__network = network
        self.__image_type = image_type

        # 디비 연결 되면, => 일단 auth 매니저도 제끼고 테스트 ㄱ
        if self.__db.connect():
            #auth = AuthenticationManager()
            sql = 'INSERT INTO `site`(`name`, `description`, `contact`, `location`, `pragma_boot_path`, `pragma_boot_version`, `python_path`, `temp_dir`, `username`, `deployment_type`, `site_hostname`, `latitude`, `longitude`, `total_cpu`, `total_memory`,`network` ) VALUES ("'+str(self.__name)+'","'+str(self.__descrtiption)+'","'+str(self.__contact)+'","'+str(self.__location)+'","'+str(self.__pragma_boot_path)+'","'+str(self.__pragma_boot_version)+'","'+str(self.__python_path)+'","'+str(self.__temp_dir)+'","'+str(self.__username)+'","'+str(self.__deployment_type)+'","'+str(self.__site_hostname)+'","'+str(self.__latitude)+'","'+str(self.__longitude)+'","'+str(self.__total_cpu)+'","'+str(self.__total_memory)+'","'+str(self.__image_type)+'");'
            self.__db.execute(sql)
            
            self.__db.commit()

            self.__db.close()

            #self.setConnectionType(self.__name, self.__network)
            self.setImageType(self.__name, self.__image_type)

    def getReservationName(self):
        return self.__name

    def getCreateResourceStatus(self):
        if self.__isComplete:
            return 'success'
        else:
            return 'fail'
