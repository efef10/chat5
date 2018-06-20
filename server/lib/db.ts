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

    editData(objID:number, data:any){
        this.readFromJson();
        return new Promise((resolve,reject)=>{
            let myObject;
            for(let obj of this.myData[this.fileName]){
                if(obj.id === objID){
                    myObject=obj;
                }
            }

            let index = this.myData[this.fileName].indexOf(myObject);
            if(myObject.type === "user"){
                this.myData[this.fileName][index].password = data.password;
                this.myData[this.fileName][index].age = data.age;
            }
            else{
                this.myData[this.fileName][index].children = data.children;
                //fixme
            }
            this.writeToJson();
            resolve(myObject);
        })
    }

    deleteData(objId:number,keyField:string,anotherField?:number){
        return new Promise((resolve,reject)=>{
            this.readFromJson().then(()=>{
                let myObject;
                // for(let obj of this.myData[this.fileName]){
                //     if(obj[keyField] === objId){
                //         myObject=obj;
                //     }
                // }
                for(let obj of this.myData[this.fileName]){
                    if(obj[keyField] === objId){
                        if(!anotherField || obj["parentId"] === anotherField){
                            myObject=obj;
                        }
                    }
                }

                let index = this.myData[this.fileName].indexOf(myObject);
                this.myData[this.fileName].splice(index,1);

                this.writeToJson();
                if(!myObject){
                    resolve({});
                }
                resolve(myObject);
            });
        })
    }
}
