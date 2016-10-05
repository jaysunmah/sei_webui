from flask import Flask, request
from flask_restful import Resource, Api
import time
import datetime

app = Flask(__name__)
api = Api(app)

class turtleCommands(Resource):
    def get(self, searchRequest):
        print(searchRequest)
        return searchRequest

    def put(self, searchRequest):
        #todos[todo_id] = requestdd.form['data']
        result = {}
        result['your_input'] = searchRequest
        return result

api.add_resource(turtleCommands, '/<string:searchRequest>')

if __name__ == '__main__':
    app.run(debug=True)
