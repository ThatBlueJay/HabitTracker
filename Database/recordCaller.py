import psycopg2
import os
import random
import time

database = 'habittracker'
connection = psycopg2.connect(user='postgres',
                                  password='password',      
                                  host='localhost',
                                  port= '5432',
                                  database = 'habittracker')

cursor = connection.cursor()
cursor.execute("Select recordGenerator();")
connection.commit()
cursor.close()
connection.close()

# file = open("/mnt/c/Users/gordoz2/Documents/PosterBoy/PosterBoyDjango/out.txt", "a")
# d = time.strftime("%a, %d %b %Y %H:%M:%S", time.gmtime(time.time()))
# file.write("\nI finished at " + d)
# file.close()


"""
crontab:
0 * * * * /usr/bin/python3 /mnt/c/Users/gordoz2/Documents/PosterBoy/PosterBoyDjango/resetActions.py

need postgres and django and psycopg2 installed
"""