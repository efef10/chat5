import * as fs from 'fs'
// import {User} from '../models/User';
// import {Group} from '../models/Group';

export class DB{
    private myData:any;
    private fileName:string;

    constructor(fileName:string){
        this.fileName = fileName;
        this.readFromJson();
    }

    async readFromJson (){
        let data = await fs.readFileSync(`${__dirname}/db/${this.fileName}.json`);
        this.myData = JSON.parse(data.toString()||`{"${this.fileName}":[]}`);
        return this.myData;
    }

    writeToJson(){
        fs.writeFileSync(`${__dirname}/db/${this.fileName}.json`, JSON.stringify(this.myData));
    }

    setMyData(data:any){
        this.myData[this.fileName] = data;
        this.writeToJson();
    }

    initiate(){
        return new Promise((resolve,reject)=>{
            this.myData = JSON.parse(`{"${this.fileName}":[]}`)
            // this.myData = JSON.parse('');
            this.writeToJson();
            resolve(this.myData[this.fileName]);
        })
    }

    getData():Promise<any[]>{
        return new Promise((resolve,reject)=>{
            this.readFromJson().then((myData)=>{
                resolve([...myData[this.fileName]]);
            });

        })
    }

    addData(data:any){
        return new Promise((resolve,reject)=>{
            this.readFromJson().then(()=>{
                this.myData[this.fileName].push(data);
                this.writeToJson();
                resolve(data);
            });

        })
    }

    deleteFileContent(){
        return new Promise((resolve,reject)=>{
            this.myData = JSON.parse(`{"${this.fileName}":[]}`);
            this.writeToJson();
            resolve(true);
        })

    }

    // editData(objID:string, data:any){
    //     this.readFromJson();
    //     return new Promise((resolve,reject)=>{
    //         let myObject;
    //         for(let obj of this.myData[this.fileName]){
    //             if(obj.id === objID){
    //                 myObject=obj;
    //             }
    //         }
    //
    //         let index = this.myData[this.fileName].indexOf(myObject);
    //         if(myObject.type === "user"){
    //             this.myData[this.fileName][index].password = data.password;
    //             this.myData[this.fileName][index].age = data.age;
    //         }
    //         else{
    //             this.myData[this.fileName][index].children = data.children;
    //             //fixme
    //         }
    //         this.writeToJson();
    //         resolve(myObject);
    //     })
    // }

    editData(conditions:{field:string,value:any}[],updates:{field:string,value:any}[]){
        this.readFromJson();
        return new Promise((resolve,reject)=>{
            let myObjects=[];
            for(let obj of this.myData[this.fileName]) {
                let objInConditions = true;
                for (let condition of conditions) {
                    if(obj[condition["field"]]!==condition["value"]){
                        objInConditions=false;
                        break;
                    }
                }
                if(objInConditions){
                    myObjects.push(obj);
                }
            }

            for(let obj of myObjects){
                let index = this.myData[this.fileName].indexOf(obj);
                for(let update in updates){
                    this.myData[this.fileName][index][update["field"]] = update["value"];
                    this.writeToJson();
                    this.readFromJson();
                }
            }


            resolve(myObjects);
        })
    }

    deleteData(conditions:{field:string,value:any}[]){
        this.readFromJson();
            return new Promise((resolve,reject)=>{
                let myObjects=[];
                for(let obj of this.myData[this.fileName]) {
                    let objInConditions = true;
                    for (let condition of conditions) {
                        if(obj[condition["field"]]!==condition["value"]){
                            objInConditions=false;
                            break;
                        }
                    }
                    if(objInConditions){
                        myObjects.push(obj);
                    }
                }

                for(let obj of myObjects){
                    let index = this.myData[this.fileName].indexOf(obj);
                    this.myData[this.fileName].splice(index,1);
                    this.writeToJson();
                    this.readFromJson();
                }
                this.writeToJson();
                resolve(myObjects);
            });
        }
    }

