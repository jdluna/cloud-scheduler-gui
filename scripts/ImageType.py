#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 09 16:44:00 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


class ImageType:
    __type = None
    
    def setType(self, t):
        self.__type = t
    
    def getType(self):
        return self.__type



class CentOS7(ImageType,object):
    
    def __init__(self):
        super(CentOS7,self).setType("centOS7")



class HkuBioLinux(ImageType,object):

    def __init__(self):
        super(HkuBioLinux,self).setType("hku_biolinux")
        
        
        
class NchcSgeTest(ImageType,object):

    def __init__(self):
        super(NchcSgeTest,self).setType("nchc-sge-test")
        
        
        
class RocksBasic(ImageType,object):

    def __init__(self):
        super(RocksBasic,self).setType("rocks-basic")
        
        
        
class RocksAge(ImageType,object):

    def __init__(self):
        super(RocksAge,self).setType("rocks-age")