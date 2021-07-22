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

# Query : a json query 
# Return: a json structure of the query result (projected without _ID)
@app.route('/mongoquery', methods=['POST','GET'])
def mongoquery():
    print("Enter MONGO QUERY on")
    print("Modules")
    mongoclient = MongoClient("mongodb://localhost:27017/")
    #load the GDMA Database
    db=mongoclient["gdma"]
    #Query JSON passed to the API from AXIOS - its assumed the query will operate 
    #The query can be user-gner
    query = request.json
    print('JSON Query=',query)
    #out will not include the auto-id
    #we load the gdma_all collection which combines modules, programmes, instructors and streams
    query_result=db["gdma_all"].find(query,{"_id":0})
    #convert the query cursor into a list
    query_data=[]
    for x in query_result:
        query_data.append(x)
    querydf=pd.DataFrame(query_data)
    #create a JSON data structure from the querydf to be returned to AXIOS
    result=[]
    result=querydf.to_json(orient="records", indent=4)
    #prepare return of data
    print('Result',result)
    print('JSON Query=',query)
    print("Exit MONGO QUERY")
    #return JSON so front-end can iterate objects efficiently
    return result

# Query : a json query with a PROGRAMME NUMBER  
# Return: a json structure of MODULES in the PROGRAMME (projected without _ID)
@app.route('/mongolistmodules', methods=['POST','GET'])
def mongolistmodules():
    print("Enter MONGO LIST ")
    print("Modules")
    mongoclient = MongoClient("mongodb://localhost:27017/")
    #load the GDMA Database
    db=mongoclient["gdma"]
    #Query JSON passed to the API from AXIOS 
    #Query should be a query on a specific programme #{"Programme_ID":X}
    prog_query = request.json
    print('JSON Query=',prog_query)
    #we load the gdma_all collection which combines modules, programmes, instructors and streams
    #find returns a JSON dictionary for "Programme_ID":X
    query_result=db["gdma_all"].find(prog_query,{"_id":0})
    #convert the query data into a DF
    #put each document returned into a list
    query_data=[]
    for x in query_result:
        query_data.append(x)
    #read list item intointo a pandas dataframe querydf
    querydf=pd.DataFrame(query_data)
    #create a JSON data structure from the querydf to be returned to AXIOS
    #extract the IDS
    result=[]
    #extract the value of Module ID element form the data frame e.g. 1,6,9,10
    IDS=querydf['Module_IDS'].values
    #split the value into its component modules, e.g. [1,6,9,10]
    print("IDS",IDS)
    ID_list=IDS[0]
    ID_list=ID_list.split(",")
    comp_query=''
    print('ID List=',ID_list)
    for i in range(len(ID_list)):
        #we need to construct a query with each module id
        comp_query=comp_query+('{"Module_ID":"'+ID_list[i]+'"}')    
        if i<len(ID_list)-1:
            comp_query=comp_query+","
        print('comp_query',comp_query)

    #we need to create a json object to use in the MongoDB query - use JSON's json.loads api
    #comp_query=json.loads('{"Module_ID":"'+ID_list[i]+'"}')   
    #add the parent programme to the query so we can view the document later
    #gp back to the pandas dataframe querydf and extract the programme nunber
    #pid=querydf['Programme_ID'].values[0]

    comp_query='{"$or":['+comp_query+']}'
    print('comp_query',comp_query)
    #convert query to json
    comp_query=json.loads(comp_query)
    print('comp_query as JSON',comp_query)
    result=(db["gdma_all"].find(comp_query,{"_id":0}))
    print("Prepare for Exit")
    print("result",result)
    #Now we preare the cursor for returning to AXIOS
    query_data=[]
    for x in result:
        query_data.append(x)
    querydf=pd.DataFrame(query_data)
    print("Prepare for Exit")
    #create a JSON data structure from the querydf to be returned to AXIOS
    result=[]
    result=querydf.to_json(orient="records", indent=4)
    #prepare return of data
    print('Result',result)
    print('JSON Query=',comp_query)
    print("Exit MONGO LIST")
    #return JSON so front-end can iterate objects efficiently
    return result

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
 #host is on the local machine any IP addresses
serve(app, host='0.0.0.0', port=8020)



