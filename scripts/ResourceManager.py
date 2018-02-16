#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 01 23:57:57 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()

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


    def canCreateResource(self, name, description,  contact, location, pragma_boot_path, pragma_boot_version, python_path, temp_dir, username, deployment_type, site_hostname, latitude, longitude, total_cpu, total_memory):
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

        # 디비 연결 되면, => 일단 auth 매니저도 제끼고 테스트 ㄱ
        if self.__db.connect():
            #auth = AuthenticationManager()
            sql = 'INSERT INTO `site`(`name`, `description`, `contact`, `location`, `pragma_boot_path`, `pragma_boot_version`, `python_path`, `temp_dir`, `username`, `deployment_type`, `site_hostname`, `latitude`, `longitude`, `total_cpu`, `total_memory` ) VALUES ("'+str(self.__name)+'","'+str(self.__descrtiption)+'","'+str(self.__contact)+'","'+str(self.__location)+'","'+str(self.__pragma_boot_path)+'","'+str(self.__pragma_boot_version)+'","'+str(self.__python_path)+'","'+str(self.__temp_dir)+'","'+str(self.__username)+'","'+str(self.__deployment_type)+'","'+str(self.__site_hostname)+'","'+str(self.__latitude)+'","'+str(self.__longitude)+'","'+str(self.__username)+'","'+str(self.__username)+'");'
            self.__db.execute(sql)

            self.__db.commit()

            self.__db.close()

    def getReservationName(self):
        return self.__name
