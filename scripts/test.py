import MySQLdb as db

###### variable for database #######
HOST = "localhost"
USER = "root"
PWD = "root" 
DBNAME = "pragma"
WAIT_TIMEOUT = 180
####################################

try:con=db.connect(HOST,USER,PWD,DBNAME)

except Exception as e: print('fail')
cursor = con.cursor()
cursor.execute('select * from site')
result = cursor.fetchall()
if result:
    for z in result:
        print z[1]
     