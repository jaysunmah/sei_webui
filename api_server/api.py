from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
import time
import datetime

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

class turtleCommands(Resource):
    def get(self, searchRequest):
        print(searchRequest)
        return searchRequest

    def post(self, searchRequest):
        args = parser.parse_args()
        print(args)

api.add_resource(turtleCommands, '/<string:searchRequest>')

if __name__ == '__main__':
    app.run(debug=True)
