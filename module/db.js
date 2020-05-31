const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Config = require('./config');

class Db {

    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db();
        } 
        return Db.instance;

    }

    constructor() {
        this._dbClient = null;
        this.connect();
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (!this._dbClient) {
                // Use connect method to connect to the server
                MongoClient.connect(Config.dbUrl, (err, client) => {

                    if (err) {
                        reject(err)
                        return;
                    }

                    this._dbClient = client.db(Config.dbName);
                    resolve(this._dbClient);

                });

            } else {
                resolve(this._dbClient);
            }
        })


    }

    find(collectionName, json) {
        return new Promise((resolve, reject)=>{
            this.connect().then((db) => {
                db.collect(collectionName).find(json).toArray((err, data) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(data);
                });
            });
        });
        
    }

    insert(collectionName, json) {
        return new Promise((resolve, reject)=>{
            this.connect().then((db) => {
                db.collect(collectionName).insertOne(json)((err, res) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(res);
                });
            });
        });

    }

    update(collectionName, jsonWhere, jsonUpdate) {
        return new Promise((resolve, reject)=>{
            this.connect().then((db) => {
                db.collect(collectionName).update(jsonWhere, {$set: jsonUpdate})((err, res) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(res);
                });
            });
        });
    }

    remove(collectionName, json) {
        return new Promise((resolve, reject)=>{
            this.connect().then((db) => {
                db.collect(collectionName).remove(json)((err, res) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(res);
                });
            });
        });
    }

    getObjectId(id) {
        return new ObjectID(id);
    }

}


module.exports = Db.getInstance();


