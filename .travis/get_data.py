import urllib3.request, urllib.request
import requests as req
import os
import json
def repos():
    url = "https://api.github.com/orgs/codeclubtbms/repos"
    response = req.get(url, auth=("haideralipunjabi", "40ecf50415c23efdf5d72c8a124c1e2c79ef1eef"))
    data = response.json()
    for repo in data:
      contributors = req.get(repo["contributors_url"], auth=("haideralipunjabi", "40ecf50415c23efdf5d72c8a124c1e2c79ef1eef")).json()
      repo["contributors"] = contributors

    json.dump(data,open('assets/data/repos.json',"w"))  

repos()
