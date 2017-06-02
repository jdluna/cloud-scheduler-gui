#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 16 22:17:23 2017

@author: CS401:Nannapas Banluesombatkul
"""

#ATTRIBUTE_JS = '/var/www/html/cloud-scheduler-gui/UI/src/config'
ATTRIBUTE_JS = './src/config'
ATTRIBUTE_JSON = '../scripts/config'

try :
    import os
    cwd = os.getcwd()
    print 'current dir : '+cwd
    jsonStr = ''
    isExist = False
    with open(ATTRIBUTE_JS+'/attributes.js', 'r') as f:
        text = f.read().split('/*')[0]
	jsonStr += '{'
        attr=text.split('export const ')
        for a in attr:
            var = a.split('=')
            if len(var) == 2:  
                vName = var[0].replace(' ','')
                vValue = var[1]
                vValue=vValue.replace('\n','')
                jsonStr += '"'+str(vName)+'":'+str(vValue)+','
                isExist = True
        if isExist:
            jsonStr = jsonStr[:-1]
        jsonStr += '}'
    	print 'create-config-file at : '+ ATTRIBUTE_JSON
        f = open(ATTRIBUTE_JSON+'/attributes.json', 'w')
        f.write(jsonStr)
        f.close()
    
    print '{"result" : "True"}'

except:
    print '{"result" : "False"}'

