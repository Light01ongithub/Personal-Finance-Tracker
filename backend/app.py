from flask import Flask,jsonify,redirect,request
from flask_cors import CORS
import database.database as db

app=Flask(__name__)

CORS(app)


@app.route("/submit",methods=["POST"])
def submit():
    
    data=request.get_json()
    
    db.create_something(data["Date"],data["Type"],data["Category"],data["Description"],data["Amount"])
    
    return jsonify({
        "message":"data is recived"
    }
    )

@app.route("/getdata",methods=["GET"])
def dashboard():
    data=db.get_all_data()
    return jsonify(data)

@app.route("/prev_income",methods=["GET"])
def prev_income():
    response=db.preview_income()
    return jsonify(response)



@app.route("/prev_expense",methods=["GET"])
def prev_expense():
    response=db.preview_expense()
    return jsonify(response)


@app.route("/update/<int:id>",methods=["PUT"])

def update(id):
    data=request.get_json()
    db.update_database(id,data["Date"],data["Type"],data["Category"],data["Description"],data["Amount"])
    return jsonify({"message":"update successfuly"})


@app.route("/delete/<int:id>",methods=["DELETE"])
def delete(id):
    db.delete_element(id)
    return jsonify({"message":"item deleted"})


@app.route("/report" , methods=["GET"])
def report():
    month=request.args.get("month")
    year=request.args.get("year")
    month=month.zfill(2)
    
    response=db.data_report(month,year)
    return jsonify(response)
    

@app.route("/monthtrend",methods=["GET"])
def monthreport():
    year=request.args.get("year")
    
    responce=db.rpoet_mtrend(year)
    return jsonify(responce)


    
    
if __name__=="__main__":
    app.run(debug=True)