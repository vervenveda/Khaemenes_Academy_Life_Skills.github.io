#!/usr/bin/env node
import fs from "node:fs";
const index=fs.readFileSync("index.html","utf8");
const header=fs.readFileSync("assets/life-skills-minimal-header-mount-v1.js","utf8");
const tools=fs.readFileSync("assets/life-skills-landing-class-tools-v1.js","utf8");
const count=(s,re)=>(s.match(re)||[]).length;
const problems=[];
const earlyStagePages=["courses/preschool/index.html","courses/kindergarten/index.html","courses/culinary-independence/elementary/grade-1/index.html","courses/culinary-independence/elementary/grade-2/index.html","courses/culinary-independence/elementary/grade-3/index.html"];
const exact=[
 ["333 ticker loader",count(index,/vnv-333-ticker\.js/g),1],
 ["auto ticker loader",count(index,/vnv-ticker-autopopulate\.js/g),1],
 ["auto ticker invocation",count(index,/autoPopulate/g),1],
 ["official header loader",count(index,/vnv-header-autopopulate\.js/g),1],
 ["header mount helper",count(index,/life-skills-minimal-header-mount-v1\.js/g),1],
 ["lower-left class tools",count(index,/vnv-class-tools-toolbar\.js/g),1],
 ["lower-right ecosystem toolbar",count(index,/vnv-ecosystem-toolbar\.js/g),1],
 ["canonical language engine",count(index,/vnv-language\.js/g),1],
 ["Linguistics translator loader",count(index,/khaemenes-translator-loader\.js/g),1],
 ["phrase bank",count(index,/khaemenes-campus-phrases\.js/g),1],
 ["interlingual core",count(index,/khaemenes-interlingual-core\.js/g),1],
 ["site footer",count(index,/<footer class="life-footer"/g),1],
 ["feature cards",count(index,/class="life-feature"/g),4]
];
for(const [name,got,want] of exact)if(got!==want)problems.push(name+": expected "+want+", found "+got);
if(count(header,/VNV_HEADER\.mount/g)!==1)problems.push("header helper must mount exactly once");
if(!/actions:\[\]/.test(header))problems.push("official header must be hamburger-only");
if(/MutationObserver/.test(index+header+tools))problems.push("landing shell must not use a MutationObserver regulator");
if(/life-skills-global-standard-v1\.js/.test(index))problems.push("retired global regulator must not be loaded");
for(const label of ["Learner Profile","Parent Profile","Enrollment"])if(!index.includes(">"+label+"<"))problems.push("missing access button: "+label);
for(const token of [
 ".life-hero .eyebrow{margin:0 0 18px;color:var(--cream);font:400 33px",
 ".life-hero h1{margin:0;color:var(--cream);font:400 77px",
 ".life-hero .descriptor{max-width:900px;margin:26px auto 0;color:var(--cream);font:400 24px",
 "grid-template-columns:repeat(2,minmax(0,1fr))",
 "border-radius:7px",
 "background:linear-gradient(115deg,#284b70"
])if(!fs.readFileSync("assets/life-skills-minimal-landing-v1.css","utf8").includes(token))problems.push("landing geometry token missing: "+token);
if(!/label:"Translate"/.test(tools)||!tools.includes("vnv-language-switch"))problems.push("canonical translator must be exposed and docked inside lower-left tools");
if(!index.includes('id="life-skills-canonical-dual-ticker-stack"'))problems.push("canonical static dual-ticker stack missing");
for(const page of earlyStagePages){
 const html=fs.readFileSync(page,"utf8");
 for(const [name,regex] of [
  ["single AutoPopulate ticker",/vnv-ticker-autopopulate\\.js/g],
  ["canonical header",/vnv-header-autopopulate\\.js/g],
  ["lower-left class tools",/vnv-class-tools-toolbar\\.js/g],
  ["lower-right 3x3 dock",/vnv-ecosystem-toolbar\\.js/g],
  ["translator",/vnv-language\\.js/g]
 ]){const n=count(html,regex);if(n!==1)problems.push(page+": "+name+" expected 1, found "+n)}
 for(const legacy of [/life-skills-global-standard-v1\\.js/,/khaemenes-global-header\\.js/,/vnv-ecosystem-menu\\.js/,/<header data-khae-header/ ,/vnv-333-ticker\\.js/]){
  if(legacy.test(html))problems.push(page+": legacy component still present "+legacy.source);
 }
 if(!html.includes('actions:[]'))problems.push(page+": header is not hamburger-only");
 for(const t of ['class="life-stage-hero"','life-stage-eyebrow','font:400 33px','77px','font:400 24px','background:#252b2b','grid-template-columns:repeat(2,minmax(0,1fr))']){
  if(!html.includes(t))problems.push(page+": presentation contract missing "+t);
 }
}
if(problems.length){console.error(JSON.stringify({status:"FAIL",problems},null,2));process.exit(1)}
console.log(JSON.stringify({status:"PASS",scope:"Life Skills landing",contract:"one canonical component each; hamburger-only header; canonical translator in lower-left tools; 33/77/24 colorful home and early-stage landing hierarchy"},null,2));
