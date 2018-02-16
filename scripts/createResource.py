#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 07 02:23:37 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb

cgitb.enable()

import cgi

form = cgi.FieldStorage()

#### var from front-end -> resource values #####
# 사이트 아이디 안해도 될걸?
#SITE_ID = form.getvalue('site_id')
NAME = form.getvalue('_name')
DESCRIPTION = form.getvalue('description')
CONTACT = form.getvalue('contact')
LOCATION = form.getvalue('location')
PRAGMA_BOOT_PATH = form.getvalue('pragma_boot_path')
PRAGMA_BOOT_VERSION = form.getvalue('pragma_boot_version')
PYTHON_PATH = form.getvalue('python_path')
TEMP_DIR = form.getvalue('temp_dir')
USERNAME = form.getvalue('username')
DEPLOYMENT_TYPE = form.getvalue('deployment_type')
SITE_HOSTNAME = form.getvalue('site_hostname')
LATITUDE = form.getvalue('latitude')
LONGITUDE = form.getvalue('longitude')
TOTAL_CPU = form.getvalue('total_cpu')
TOTAL_MEMORY = form.getvalue('total_memory')





print "Content-Type: text/html"
print "Access-Control-Allow-Origin: *"
print


from ResourceManager import ResourceManager

resourceManager = ResourceManager()
result = 'success'

resource = resourceManager.canCreateResource(NAME, DESCRIPTION, CONTACT, LOCATION, PRAGMA_BOOT_PATH, PRAGMA_BOOT_VERSION, PYTHON_PATH, TEMP_DIR, USERNAME, DEPLOYMENT_TYPE, SITE_HOSTNAME, LATITUDE, LONGITUDE, TOTAL_CPU, TOTAL_MEMORY)


jsonStr = '{ "result" : "' + str(result) + '",'

jsonStr += ' "reserve_id" : "' + str(resourceManager.getReservationName()) + '"'

jsonStr += '}'

print jsonStr
