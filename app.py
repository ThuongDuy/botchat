from flask import Flask, render_template, request,jsonify
from flask_restful import Resource, Api
from chat import get_response
from cbr import cbr
app = Flask(__name__)
api = Api(app)
@app.get("/")
def index_get():
    return render_template("base.html")

class CauHoi(Resource):
    def post(self):
        text=request.get_json().get("message")
        arr=[]
        for i in range(len(text)-1):
            arr.append(int(text[i]))
        arr.append(float(text[-1]))
        if(arr[-1]<38):
            arr[-1]=1
        elif (arr[-1]<39):
            arr[-1]=2
        else:
            arr[-1]=3
        print(arr)
        response=cbr(arr)
        message={"data":response}
        print(message)
        return jsonify(message)
class GiaoTiep(Resource):
    def post(self):
        text=request.get_json().get("message")
        print("aaaaa")
        print(text)
        response = get_response(text)
        if(response =='tư vấn'):
            message={"answer":response,"check":1}
        else:
            message={"answer":response,"check":0}
        return jsonify(message)
       
api.add_resource(GiaoTiep, '/giaotiep')
api.add_resource(CauHoi,'/cauhoi')
if __name__ == '__main__':
     app.run(debug=True)