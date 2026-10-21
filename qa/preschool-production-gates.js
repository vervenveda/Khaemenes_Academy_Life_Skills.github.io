/* Runs the actual functions extracted from production HTML on a local checkout.
 * Usage: node qa/preschool-production-gates.js
 * No dependencies; intentionally does not touch learner storage. */
"use strict";
const fs=require("fs"),assert=require("assert"),root=require("path").join(__dirname,"..");
let checks=0;
function test(label,actual,expected){assert.strictEqual(actual,expected,label);checks++}
function load(slug,week){
 const src=fs.readFileSync(require("path").join(root,"courses",slug,"preschool","week-0"+week,"index.html"),"utf8");
 const culinary=slug==="culinary-independence",name=culinary?"previousWeekReady":"previousReady";
 const start=src.indexOf("function "+name+"("),end=src.indexOf(culinary?'$("open").onclick':';$("open").onclick',start);
 assert(start>=0&&end>start,"production validator must be found");
 const definition=src.slice(start,end).replace(/;$/,"");
 const declaration=culinary?src.slice(src.lastIndexOf("const prerequisiteOne=",start),start):"";
 if(culinary)assert(declaration.startsWith("const prerequisiteOne="),"Culinary question declarations");
 const mock={data:new Map(),getItem(key){return this.data.get(key)||null}};
 const factory=new Function("localStorage",`${declaration};${definition};return {fn:${name},known:typeof prerequisiteOne!=="undefined"?prerequisiteOne:null,other:typeof prerequisiteTwo!=="undefined"?prerequisiteTwo:null}`);
 const result=factory(mock);
 if(!culinary){let a=definition.match(/const known=(\[[\s\S]*?\]);const v=/);assert(a,"Home actual bank");result.known=JSON.parse(a[1])}
 return {mock,...result};
}
function home(week){
 const {mock,fn,known}=load("home-management",week),key=week===2?"khae.life.preschool.home.week01.v1.":"khae.life.home.pk.w2.v1.",learner="test-child";
 const items=known.slice(0,5).map(q=>({prompt:q[0],correct:q[1][q[2]],selected:q[1][q[2]]}));
 const base={done:[true,true,true,true,true],review:true,adult:"Caregiver",attempts:[{score:100,items}]};
 const run=v=>{mock.data.set(key+learner,JSON.stringify(v));return fn(learner)};
 test("Home "+week+" valid",run(base),true);
 test("Home "+week+" under mastery",run({...base,attempts:[{score:60,items:items.map((x,i)=>i<3?x:{...x,selected:known[i][1][1]})}]}),false);
 test("Home "+week+" no review",run({...base,review:false}),false);
 test("Home "+week+" wrong score",run({...base,attempts:[{score:80,items}]}),false);
 test("Home "+week+" incomplete days",run({...base,done:[true,true,true,false,true]}),false);
 test("Home "+week+" malformed record",(()=>{mock.data.set(key+learner,"{broken");return fn(learner)})(),false);
}
home(2);home(3);
function culinary(week){
 const {mock,fn,known,other}=load("culinary-independence",week),learner="test-child";
 const oneItems=known.slice(0,5).map(q=>({prompt:q[0],choices:q[1],correct:q[2],selected:q[2]}));
 const one={format:"khaemenes-pk-culinary-week01-v2",caregiverApproved:true,days:{1:true,2:true,3:true,4:true,5:true},attempts:[{format:"quiz-v2",score:100,items:oneItems}]};
 const oneKey="khaemenes.life.culinary.pk.week01.v2."+learner;
 const run=(v,n=1)=>{mock.data.set(n===1?oneKey:"khae.life.preschool.culinary.week2.v1."+learner,JSON.stringify(v));return fn(n,learner)};
 test("Culinary "+week+" valid Week 01",run(one),true);
 test("Culinary "+week+" no adult approval",run({...one,caregiverApproved:false}),false);
 test("Culinary "+week+" forged Week 01 score",run({...one,attempts:[{...one.attempts[0],score:80}]}),false);
 test("Culinary "+week+" incomplete days",run({...one,days:{...one.days,5:false}}),false);
 if(week===3){assert(other&&other.length>=5,"Week 02 reference bank");
 const items=other.slice(0,5).map(q=>({prompt:q[0],answer:q[1][q[2]],correct:q[1][q[2]],selected:q[1][q[2]]}));
 const base={review:true,adult:"Caregiver",days:[true,true,true,true,true],attempts:[{score:100,items}]};
 test("Culinary Week 03 valid Week 02",run(base,2),true);
 test("Culinary Week 03 missing review",run({...base,review:false},2),false);
 test("Culinary Week 03 mismatched score",run({...base,attempts:[{score:80,items}]},2),false);
 }
}
culinary(2);culinary(3);
console.log("PASS "+checks+" live-source Culinary and Home Management prerequisite checks");
