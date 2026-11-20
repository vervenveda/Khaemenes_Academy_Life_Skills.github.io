#!/usr/bin/env node
import fs from "node:fs";
const index=fs.readFileSync("index.html","utf8");
const header=fs.readFileSync("assets/life-skills-minimal-header-mount-v1.js","utf8");
const tools=fs.readFileSync("assets/life-skills-landing-class-tools-v1.js","utf8");
const count=(s,re)=>(s.match(re)||[]).length;
const problems=[];
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
 ".life-hero h1{margin:0;color:var(--cream);font:400 66px",
 ".life-hero .descriptor{max-width:900px;margin:26px auto 0;color:var(--cream);font:400 24px",
 "grid-template-columns:repeat(2,minmax(0,1fr))",
 "border-radius:7px",
 "background:var(--charcoal)"
])if(!fs.readFileSync("assets/life-skills-minimal-landing-v1.css","utf8").includes(token))problems.push("landing geometry token missing: "+token);
if(!/label:"Translate"/.test(tools)||!tools.includes("vnv-language-switch"))problems.push("canonical translator must be exposed and docked inside lower-left tools");
if(!index.includes('id="life-skills-canonical-dual-ticker-stack"'))problems.push("canonical static dual-ticker stack missing");
if(problems.length){console.error(JSON.stringify({status:"FAIL",problems},null,2));process.exit(1)}
console.log(JSON.stringify({status:"PASS",scope:"Life Skills landing",contract:"one canonical component each; hamburger-only header; canonical translator in lower-left tools; 33/66/24 charcoal landing hierarchy"},null,2));
