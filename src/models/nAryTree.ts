// import {Group} from './Group';
// import {User} from './User';
//
// interface INAryTree{
//     getRoot():Group|null
//     allGroupsOfUser(userName:string, arr:Group[], currentGroup:Group):Group[]
//     allGroupsNames(currentGroup:Group|null,currentAllGroups:string[]):string[]
//     showGroupPath(group:Group):string
//     returnGroupsAndUsers():{level:number, name:string, type:string, count:number}[]
//     // _returnGroupsAndUsers(group:Group, arr:{level:number, name:string, type:string, count:number}[], level:number):number
//     _rootIsNull():boolean
//     getGroupByPath(path:string):Group|null
//     deleteTree():void
//     searchGroup(groupName:string, currentGroup:Group, groups:string[]):string[]
//     addInitialGroup(groupName:string):boolean
// }
//
// export class nAryTree implements INAryTree{
//     private root:Group|null;
//     // private treeName:string;
//
//     constructor(groupName?:string){
//         this.root = null;
//         // this.treeName = groupName || "nAryTreeGroup";
//     }
//
//     public getRoot(){
//         return this.root;
//     }
//
//     public allGroupsOfUser(userName:string, arr?:Group[], currentGroup?:Group|null){
//         var foundGroups = arr || [];
//         var group = currentGroup;
//         if(group === undefined){
//             group = this.root;
//         }
//         if (group === null || !group.hasChildren()){
//             return foundGroups;
//         }
//         var children = group.getChildren();
//         if(children[0] instanceof User){
//             for (var i=0 ; i<children.length; i++){
//                 let user = children[i] as User;
//                 if(user.getUserName()===userName){
//                     foundGroups.push(group);
//                     break;
//                 }
//             }
//         }
//         else{
//             for (var i=0 ; i<children.length; i++){
//                 this.allGroupsOfUser(userName, foundGroups, children[i] as Group);
//             }
//         }
//         return foundGroups;
//     }
//
//     public allGroupsNames(currentGroup?:Group|null,currentAllGroups?:string[]){
//         var allGroups = currentAllGroups || [];
//         var group = currentGroup;
//         if(group === undefined){
//             group = this.root;
//         }
//         if(!group){
//             return allGroups;
//         }
//         allGroups.push(group.getGroupName());
//         var children = group.getChildren();
//         if(!group.hasChildren() || children[0] instanceof User){
//             return allGroups;
//         }
//         for (var i=0 ; i< children.length ; i++){
//             this.allGroupsNames(children[i] as Group,allGroups)
//         }
//         return allGroups;
//
//     }
//
//     public showGroupPath(group:Group){
//         var path = group.getGroupName();
//         // while(group.getParent()){
//         //     path = group.getParent().getGroupName() + ">" + path;
//         //     group = group.getParent();
//         // }
//         let parent = group.getParent();
//         while(parent){
//             path = parent.getGroupName() + ">" + path;
//             parent = parent.getParent();
//         }
//         return path;
//     }
//
//     public returnGroupsAndUsers(){
//         var myGroup = this.root;
//         var myLevel = 0;
//         let arr:{level:number, name:string, type:string, count:number}[];
//         arr = [];
//         if(!!myGroup){
//             this._returnGroupsAndUsers(myGroup, arr, myLevel);
//         }
//         return arr;
//     }
//
//     private _returnGroupsAndUsers(group:Group, arr:{level:number, name:string, type:string, count:number}[], level:number){
//         var myGroup = group;
//         var myLevel = level;
//         var arr = arr || [];
//         if(myGroup === null){
//             return 0;
//         }
//         if(!myGroup.hasChildren()){
//             arr.push({level:myLevel,
//                 name :myGroup.getGroupName(),
//                 type :"Group",
//                 count:0});
//             return 0;
//         }
//         var children = myGroup.getChildren();
//         if(children[0] instanceof User){
//             for (var i=children.length-1 ; i>=0; i--){
//                 arr.push({level:myLevel + 1,
//                     name :(children[i] as User).getUserName(),
//                     type :"User",
//                     count:0});
//             }
//             arr.push({level:myLevel,
//                 name :myGroup.getGroupName(),
//                 type :"Group",
//                 count:children.length});
//             return children.length;
//         }
//         var sum = 0;
//         for (var i=children.length -1; i>=0 ; i--){
//             sum+=this._returnGroupsAndUsers(children[i] as Group,arr,myLevel+1);
//         }
//         arr.push({level:myLevel,
//             name :myGroup.getGroupName(),
//             type :"Group",
//             count:sum});
//         return sum;
//
//     }
//
//     public _rootIsNull(){
//         return this.root === null;
//     }
//
//     public getGroupByPath(path:string){
//         var arr = path.split(">");
//         var group = this.root;
//         if (group === null){
//             return null;
//         }
//         if(!((group as Group).getGroupName() === arr[0])){
//             return null;
//         }
//         for (var i=1; i<arr.length ; i++){
//             let children = (group as Group).getChildren();
//             if(children.length === 0 || children[0] instanceof User){
//                 return null;
//             }
//             for(var j=0; j<children.length; j++){
//                 if((children[j] as Group).getGroupName() === arr[i]){
//                     group = (children[j] as Group);
//                     break;
//                 }
//             }
//             // return false;
//         }
//         if(!!group){
//             return group;
//         }
//         return null;
//     }
//
//     public deleteTree(){
//         this.root = null;
//     }
//
//     public searchGroup(groupName:string, currentGroup?:Group, groups?:string[]){
//         var foundGroupsArr = groups || [];
//         if(this.root === null){
//             return foundGroupsArr;
//         }
//         var group = currentGroup;
//         if(group === undefined){
//             group = this.root;
//         }
//         if(group.getGroupName() === groupName){
//             foundGroupsArr.push(this.showGroupPath(group))
//         }
//         if((!group.hasChildren()) || (group.getChildren()[0] instanceof User)){
//             return foundGroupsArr;
//         }
//         var children = group.getChildren();
//         for(var i=0 ; i<children.length; i++){
//             this.searchGroup(groupName, children[i] as Group,foundGroupsArr);
//         }
//         return foundGroupsArr;
//     }
//
//     public addInitialGroup(groupName:string){
//         if(this._rootIsNull()){
//             this.root = new Group(groupName,[],null);
//             return true;
//         }
//         return false;
//     }
// }
//
//
// // module.exports.nAryTree = nAryTree;