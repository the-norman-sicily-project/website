#!/usr/bin/env python3

import ftplib
import os

SERVER = os.environ["FTP_SERVER"]
USERNAME = os.environ["FTP_USERNAME"]
PASSWORD = os.environ["FTP_PASSWORD"]

myFTP = ftplib.FTP(SERVER, USERNAME, PASSWORD)
myFTP.set_debuglevel(2)
source_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "dist")
myFTP.cwd(os.environ["FTP_REMOTE_PATH"])

def placeFiles(ftp, path):
    for name in os.listdir(path):
        localpath = os.path.join(path, name)
        if os.path.isfile(localpath):
            print("STOR", name, localpath)
            ftp.storbinary('STOR ' + name, open(localpath,'rb'))
        elif os.path.isdir(localpath):
            print("MKD", name)

            try:
                ftp.mkd(name)

            # ignore "directory already exists"
            except error_perm as e:
                if not e.args[0].startswith('550'):
                    raise

            print("CWD", name)
            ftp.cwd(name)
            placeFiles(ftp, localpath)
            print("CWD", "..")
            ftp.cwd("..")

placeFiles(myFTP, source_path)

myFTP.quit()