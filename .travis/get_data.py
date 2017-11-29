import urllib3.request, urllib.request
import requests as req
import os
import json
def repos():
    url = "https://api.github.com/orgs/codeclubtbms/repos"
    response = req.get(url, auth=(os.environ.get('GITHUB_USERNAME'), os.environ.get('GH_TOKEN')))
    print(response.text,file=open('assets/data/repos.json',"w"))

repos()
