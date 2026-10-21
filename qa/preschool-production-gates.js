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
 const initial=culinary?(src.match(/const prerequisiteOne=(\[[\s\S]*?\]);/)||[])[1]:null;
 const second=culinary?(src.match(/const prerequisiteTwo=(\[[\s\S]*?\]);/)||[])[1]:null;
 if(culinary) assert(initial,"Culinary Week 01 prerequisite data must exist");
 const mock={data:new Map(),getItem(key){return this.data.get(key)||null}};
 const factory=new Function("localStorage",`${initial?"const prerequisiteOne="+initial+";":""}${second?"const prerequisiteTwo="+second+";":""}${definition};return {fn:${name},known:typeof prerequisiteOne!=="undefined"?prerequisiteOne:null}`);
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
console.log("PASS "+checks+" live-source Home Management prerequisite checks");
