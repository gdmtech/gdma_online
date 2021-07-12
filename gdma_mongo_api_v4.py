#GDM 
#David Williams
#Making an API in python

#from flask_cors import CORS
from flask import Flask, json, request
from flask_cors import CORS

##from spacy.lemmatizer import ADJ, NOUN
#from spacy_wordnet.wordnet_annotator import WordnetAnnotator
from waitress import serve
from sklearn.mixture import GaussianMixture
from sqlalchemy import create_engine
from scipy.spatial import distance
#import pymysql.cursors
#import en_core_web_sm as model
import pandas as pd
import pickle

#import mongo db drivers
#import pymongo
from pymongo import MongoClient

#create a flash app
app = Flask(__name__)
#allow CORS for all endpoints
CORS(app)

#endpoint value
#pass data via the POST form value or in the URL (if using insomnia)
@app.route('/mongoquery', methods=['POST','GET'])
def mongoquery():
    print("Enter MONGO QUERY")
    mongoclient = MongoClient("mongodb://localhost:27017/")
    db=mongoclient["gdma"]
    query = request.json
    #query={"Name":"David"}
    #access the dating collection in the datingdb
    csvcollection=db["courses"]
    print('JSON Query=',query)
    #projection without _id
    query_result=db["modules"].find(query,{"_id":0})
    #Display search result SHOW * FROM gdmcases 
    query_data=[]
    print('query result=",query-result')
    for x in query_result:
        print('Matching Document=',x)
        print(query_data)
        print (x)
        query_data.append(x)
    print(query_result)
    print (query_data)
    #read query result into a pandas dataframe
    querydf=pd.DataFrame(query_data)
    print(querydf)
    result=[]
    print('Result',result)
    #create a JSON row by row with an text indent of 4 spaces
    result=querydf.to_json(orient="records", indent=4)
    #prepare return of data
    print('Result',result)
    print("Exit MONGO QUERY")
    #return JSON so front-end can iterate objects efficiently
    return result

#endpoint value
#pass data via the POST form value or in the URL (if using insomnia)


@app.route('/mongowrite', methods=['POST','GET'])
def mongowrite():
    #create and write to mongdb at same time    
    
    #create a mongo client (db client-server)
    mongoclient = MongoClient("mongodb://localhost:27017/")
    print(mongoclient)
    #make a new DB called datingdb (lazy creation)
    db=mongoclient["datingdb"]
    db2=mongoclient["gdmdb"]
    #open the GDMA database
    db3=mongoclient["gdma"]

    #insert the JSON data as an DOCUMENT (row) in a COLLECTION (table)
    #data = request.json.get("data", None)
    #for i in data: 
    #    print(i["name"],i["age"],i["eyes"])
    
    #add data in order to create the database
    #create a collection (Table) called customers - Note : lazy creation
    #create the table if its not alredy created

    dblist=mongoclient.list_database_names()
    if "datingdb" in dblist:   
        print ('database exists')
    
     #create the table if its not alredy created
    #get ready to access a collection
    customers=db["customers"]
    print(db.list_collection_names())
        
    seed={"name":"peter","age":24,"eyes":"brown"}
    #insert a new document in the collection
    inserted=customers.insert_one(seed)
    #query the collection - SEARCH * in datingdb
    cursor=customers.find({})
    #iterate the collection and print each documet
    for x in cursor:
        print('find=',x)
    #inserted=customers.insert_many(data)   
    #print(inserted)
    
    
    #CSV Upload 
    #Create a DB Table in the TB to receive the CSV 
    #csvcollection=db["csvcollection"]
    csvcollection=db["dating"]
    #data=pd.read_csv("gdmcases.csv",encoding='utf_8')
    data=pd.read_csv("dating.csv")
    #data.dropna(inplace = True)
    print ("PD=",data)
    #convert all columns to a DICT (json) Structure - DICTS have no set order
    insert_data=data.to_dict("records")
    #sort the dict by ID
    #sorted_data=sorted(insert_data.items(),key=lambda x: x[1])
    print("Dict=",insert_data)
    #insert the DICT into Mongo
    csvcollection.insert_many(insert_data)
    
    #data2 = request.json.get('value2', None)
    #data4=request.get_json()
    #print (data3["test"])
    #print (data3["test2"])
   
   
    #print ('value=',data3.get["test2"])
    #read data form the form POST
    #data=request.form['value']
    #print('This is the data ',data,data1,data2,data3)
    #print('test2.value',data1['value'])
    print(request.method)
    #print(value)
    return('ok')

 #app.run() ##Replaced with below code to run it using waitress 
 #host is the local server ip
serve(app, host='127.0.0.1', port=8020)



