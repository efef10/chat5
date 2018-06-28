import * as fs from 'fs'
import * as path from 'path'
// import {User} from '../models/User';
// import {Group} from '../models/Group';


const baseDir = path.join(__dirname.replace('dist'+path.sep,''));


export class DB{
    private myData:any;
    private fileName:string;

    constructor(fileName:string){
        this.fileName = fileName;
        this.readFromJson();
    }

    async readFromJson (){
        let data = await fs.readFileSync(`${baseDir}/db/${this.fileName}.json`);
        this.myData = JSON.parse(data.toString()||`{"${this.fileName}":[]}`);
        return this.myData;
    }

    writeToJson(){
        fs.writeFileSync(`${baseDir}/db/${this.fileName}.json`, JSON.stringify(this.myData));
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

    getData(conditions?:{field:string,value:any}[]):Promise<any[]>{
        return new Promise((resolve,reject)=>{
            this.readFromJson().then((myData)=>{
                if(!!conditions){
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
                    resolve([...myObjects]);
                }
                else{
                    resolve([...myData[this.fileName]]);
                }

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
                for(let update of updates){
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

