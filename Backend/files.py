import os
import sys

g=r"c:\Users\Aadil\Documents\GitHub\FOSS-united-centurition-hackathon\Backend\re"

def createUserFolder(username):
    a=os.path.join(g,username)
    os.makedirs(a)


def createUserRepo(username,repotitle):
    a=os.path.join(g,username)
    b=os.path.join(a,repotitle)
    os.makedirs(b)
    return b


def addfiletoRepo(location,filename):
    return True


def getRepoFiles(location):
    obj = os.scandir(location)
    a=[]
    print(obj)
    for entry in obj:
        if entry.is_dir() or entry.is_file():
            a.append([entry.name,entry.path])
    return a


def getRepoFileContent(location,fileName):
    return True


def writeToRepoFile(location,filename):
    return True

if __name__=="__main__":
    print(getRepoFiles(r"c:\Users\Aadil\Documents\GitHub\FOSS-united-centurition-hackathon\Backend\re\hypernovic"))
