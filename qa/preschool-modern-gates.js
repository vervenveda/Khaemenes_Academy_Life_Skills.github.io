/* Khaemenes Academy Preschool — tests actual Week 02/03 priorReady functions.
 * Run from repository root: node qa/preschool-modern-gates.js
 * No third-party libraries, test records are synthetic and never persisted. */
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const courses=["transportation-navigation","digital-literacy-citizenship","civic-community-living","career-work-readiness","entrepreneurship-small-business","relationships-communication","caregiving-family-responsibilities","legal-consumer-literacy"];
let checks=0;
const check=(name,got,expected)=>{assert.strictEqual(got,expected,name);checks++};
for(const course of courses)for(const week of [2,3]){
 const page=fs.readFileSync(path.join(__dirname,"..","courses",course,"preschool","week-0"+week,"index.html"),"utf8");
 const start=page.indexOf("const priorPrefix="),fnStart=page.indexOf("function priorReady(",start),fnEnd=page.indexOf("\nfunction openLearner",fnStart);
 assert(start>=0&&fnStart>start&&fnEnd>fnStart,"Unable to extract "+course+" week "+week);
 const source=page.slice(start,fnStart)+page.slice(fnStart,fnEnd);
 const records=new Map(),storage={getItem:key=>records.get(key)||null};
 const gate=new Function("localStorage",source+";return {priorReady,priorPrefix,maps:[typeof certifiedPriorAnswers!=='undefined'?certifiedPriorAnswers:null,typeof updatedPriorAnswers!=='undefined'?updatedPriorAnswers:null,priorAnswers].filter(Boolean)}")(storage);
 const bank=gate.maps[0],prompts=Object.keys(bank).slice(0,5);
 assert.strictEqual(prompts.length,5,"Insufficient predecessor questions");
 const key=gate.priorPrefix+"sample-learner";
 const items=prompts.map(prompt=>({prompt,correct:bank[prompt],selected:bank[prompt]}));
 const record=(count)=>({done:Array(5).fill(true),review:true,adult:"Sample caregiver",attempts:[{score:count*20,items:items.map((t,i)=>i<count?t:{...t,selected:"Incorrect practice response"})}]});
 const run=obj=>{records.set(key,JSON.stringify(obj));return gate.priorReady("sample-learner")};
 check(course+" W"+week+" 100",run(record(5)),true);
 check(course+" W"+week+" 80",run(record(4)),true);
 check(course+" W"+week+" 60",run(record(3)),false);
 check(course+" W"+week+" absent review",run({...record(5),review:false}),false);
 check(course+" W"+week+" missing adult",run({...record(5),adult:""}),false);
 check(course+" W"+week+" incomplete practice",run({...record(5),done:[true,true,false,true,true]}),false);
 const forged=record(3);forged.attempts[0].score=100;
 check(course+" W"+week+" forged score",run(forged),false);
 const duplicate=record(5);duplicate.attempts[0].items[4]={...duplicate.attempts[0].items[0]};
 check(course+" W"+week+" duplicate prompt",run(duplicate),false);
 const unknown=record(5);unknown.attempts[0].items[0].prompt="Unknown injected question";
 check(course+" W"+week+" unknown question",run(unknown),false);
 const wrongCorrect=record(5);wrongCorrect.attempts[0].items[0].correct="Not a real answer";
 check(course+" W"+week+" altered key",run(wrongCorrect),false);
 check(course+" W"+week+" no record",gate.priorReady("never-studied"),false);
 records.set(key,"{broken json");
 check(course+" W"+week+" malformed JSON",gate.priorReady("sample-learner"),false);
}
console.log("PASS "+checks+" direct-source prerequisite checks for "+courses.length+" courses (Weeks 02–03)");
