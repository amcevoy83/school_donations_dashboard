from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'ds023054.mlab.com'
MONGODB_PORT = 23054
DBS_NAME = 'heroku_fct1twrg'
COLLECTION_NAME = 'projects'
FIELDS = {'funding_status': True, 'school_state':True, 'resource_type': True, 'poverty_level':True, 'date_posted': True, 'total_donations': True, 'primary_focus_area':True, '_id': False}

MONGO_URI = 'mongodb://aoife:password@ds023054.mlab.com:23054/heroku_fct1twrg'

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/donorsUS/projects")
def donor_projects():
    connection = MongoClient(MONGO_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS,limit=200)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

if __name__ == '__main__':
    app.run(debug=True)