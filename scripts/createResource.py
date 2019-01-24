#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Fri Feb 16 11:45:27 2018

@author: Chungnam National University : Eunjeong Jang
"""

import cgitb
cgitb.enable()

import cgi
form = cgi.FieldStorage()
list = cgi.FormContentDict()

#### var from front-end -> resource values #####
# 사이트 아이디 안해도 될걸?
#SITE_ID = form.getvalue('site_id')
SESSION_ID = form.getvalue('session_id')
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
NETWORK = form.getvalue('network')
IMAGE_TYPE = form.getvalue('image_type')
#########################################################


print "Content-Type: text/html"
print "Access-Control-Allow-Origin: *"
print

from ResourceManager import ResourceManager
resourceManager = ResourceManager()

resource = resourceManager.canCreateResource(SESSION_ID,NAME)
result = 'fail'

if resource :
    resourceManager.createResource(NAME, DESCRIPTION, CONTACT, LOCATION, PRAGMA_BOOT_PATH, PRAGMA_BOOT_VERSION, PYTHON_PATH, TEMP_DIR, USERNAME, DEPLOYMENT_TYPE, SITE_HOSTNAME, LATITUDE, LONGITUDE, TOTAL_CPU, TOTAL_MEMORY, NETWORK, IMAGE_TYPE)
    result = resourceManager.getCreateResourceStatus()

#result = 'success'




jsonStr = '{ "result" : "' + str(result) + '",'


if result == 'fail':
    jsonStr += '넌 뭔가 잘못을 했겠지'

else:
    jsonStr += ' "reserve_id" : "' + str(resourceManager.getReservationName()) + '"'

jsonStr += '}'

print jsonStr
