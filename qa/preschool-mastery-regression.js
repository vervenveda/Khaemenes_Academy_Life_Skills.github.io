/* Khaemenes Academy — dependency-free Preschool mastery regression fixtures.
   Run: node qa/preschool-mastery-regression.js
   This checks modelled record shapes, NOT interactive browser behavior. */
"use strict";
const assert=(condition,label)=>{if(!condition)throw Error("FAIL: "+label);};
const bank=[
 ["Which choice helps?",["Ask an adult","Touch hot tools","Share a password"],0],
 ["Why take turns?",["So everyone participates","To win everything","To exclude others"],0],
 ["What belongs in a picture plan?",["Safe steps","Private data","A sharp tool"],0],
 ["How do we show respect?",["Listen","Tease","Interrupt"],0],
 ["What if a task seems unsafe?",["Stop and ask for help","Keep going","Hide it"],0],
 ["What helps after practice?",["Reflect","Rush","Forget safety"],0]
];
const completed=Array(5).fill(true);
function makeAttempt(correctCount=4){
 const items=bank.slice(0,5).map(([prompt,choices,index],i)=>({
   prompt,correct:choices[index],selected:choices[i<correctCount?index:1]
 }));
 return {score:20*correctCount,items};
}
function validAttempt(a,expected){
 if(!a||!Array.isArray(a.items)||a.items.length!==5||new Set(a.items.map(t=>t&&t.prompt)).size!==5)return false;
 if(!a.items.every(t=>t&&typeof t.prompt==="string"&&
   expected.some(q=>q[0]===t.prompt&&q[1][q[2]]===t.correct&&q[1].includes(t.selected))))return false;
 const score=20*a.items.filter(t=>t.selected===t.correct).length;
 return score>=80&&a.score===score;
}
function validHomeRecord(v,expected){
 return !!v&&Array.isArray(v.done)&&v.done.length===5&&v.done.every(x=>x===true)&&
  (v.review===true||v.approved===true)&&typeof v.adult==="string"&&v.adult.trim().length>0&&
  Array.isArray(v.attempts)&&v.attempts.some(a=>validAttempt(a,expected));
}
let checks=0;
function check(label,value,expected){checks++;assert(value===expected,label)}
const base={done:completed,review:true,adult:"Caregiver",attempts:[makeAttempt()]};
check("valid 80 percent",validHomeRecord(base,bank),true);
check("valid 100 percent",validHomeRecord({...base,attempts:[makeAttempt(5)]},bank),true);
check("79 percent or lower",validHomeRecord({...base,attempts:[makeAttempt(3)]},bank),false);
check("missing practice day",validHomeRecord({...base,done:[true,true,false,true,true]},bank),false);
check("missing caregiver name",validHomeRecord({...base,adult:""},bank),false);
check("missing review",validHomeRecord({...base,review:false},bank),false);
check("duplicate prompts",validHomeRecord({...base,attempts:[{score:100,items:Array(5).fill(makeAttempt().items[0])}]},bank),false);
check("forged score",validHomeRecord({...base,attempts:[{...makeAttempt(3),score:100}]},bank),false);
check("unknown question",validHomeRecord({...base,attempts:[{score:100,items:makeAttempt(5).items.map((t,i)=>i? t:{...t,prompt:"Unknown"})}]},bank),false);
check("changed correct answer",validHomeRecord({...base,attempts:[{score:100,items:makeAttempt(5).items.map((t,i)=>i? t:{...t,correct:"Invalid"})}]},bank),false);
check("invalid selection",validHomeRecord({...base,attempts:[{score:80,items:makeAttempt().items.map((t,i)=>i? t:{...t,selected:"Not an option"})}]},bank),false);
check("malformed record",validHomeRecord(null,bank),false);
const oldBank=bank;
const newBank=bank.map((q,i)=>[i?"Revised: "+q[0]:"Brand new question",q[1],q[2]]);
check("old valid attempts recognized when bank compatible",validHomeRecord(base,oldBank)||validHomeRecord(base,newBank),true);
check("new valid attempts recognized when bank compatible",validHomeRecord({...base,attempts:[{score:100,items:newBank.slice(0,5).map(q=>({prompt:q[0],correct:q[1][0],selected:q[1][0]}))}]},oldBank)||validHomeRecord({...base,attempts:[{score:100,items:newBank.slice(0,5).map(q=>({prompt:q[0],correct:q[1][0],selected:q[1][0]}))}]},newBank),true);
if(typeof console!=="undefined")console.log("PASS "+checks+" Preschool mastery regression fixtures (modelled schemas only)");
