#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT=path.resolve(path.dirname(new URL(import.meta.url).pathname),"..");
const BASE=(process.env.BASE_URL||"http://127.0.0.1:4173/").replace(/\/+$/,"")+"/";
const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,"docs","life-skills-route-manifest.json"),"utf8"));
const report={schema:"khaemenes-early-learning-browser-acceptance-v1",generatedAt:new Date().toISOString(),base:BASE,checks:[],manualStillRequired:[
 "Actual screen-reader speech in NVDA/JAWS/VoiceOver/TalkBack",
 "Human visual inspection of printed/PDF evidence",
 "Target-device install/offline behavior beyond standalone local HTML"
]};
let failures=0;
function record(scope,label,ok,detail=""){
 report.checks.push({scope,label,ok,detail});
 if(!ok){failures++;console.error("FAIL",scope,label,detail)} else console.log("PASS",scope,label);
}
function extractBank(file){
 const src=fs.readFileSync(file,"utf8");
 const match=src.match(/const\s+bank\s*=\s*(\[[\s\S]*?\])\s*,\s*(?:priorBank|priorPrefix|prefix)=/);
 if(!match)throw new Error("Unable to extract bank from "+file);
 return new Function("return ("+match[1]+")")();
}
function recordFor(bank,correctCount){
 const selected=bank.slice(0,5).map((q,i)=>({
   prompt:q[0],correct:q[1][0],selected:q[1][i<correctCount?0:1]
 }));
 return {done:Array(5).fill(true),notes:Array(5).fill("browser acceptance note"),dates:Array(5).fill("2026-10-22"),reflection:"browser acceptance",adult:"Test caregiver",review:true,attempts:[{score:correctCount*20,items:selected}]};
}
async function visibleControlNames(page){
 return await page.evaluate(()=>[...document.querySelectorAll("button,input,select,textarea")].filter(el=>{
   const s=getComputedStyle(el);return s.display!=="none"&&s.visibility!=="hidden"&&el.type!=="hidden";
 }).map(el=>{
   const labels=el.labels?[...el.labels].map(x=>x.textContent.trim()).join(" "):"";
   return {tag:el.tagName,id:el.id,type:el.type||"",name:(el.getAttribute("aria-label")||labels||el.getAttribute("title")||el.placeholder||el.textContent||"").trim()};
 }));
}
async function baseline(page,relative,height){
 const scope=relative+" @255x"+height;
 const errors=[];
 const onError=e=>errors.push(String(e));
 const onConsole=m=>{if(m.type()==="error")errors.push(m.text())};
 page.on("pageerror",onError);page.on("console",onConsole);
 await page.setViewportSize({width:255,height});
 await page.goto(BASE+relative,{waitUntil:"domcontentloaded"});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 record(scope,"no horizontal overflow",overflow<=1,"overflow="+overflow);
 const statuses=await page.locator('[role="status"],[aria-live]').count();
 record(scope,"status/live region present",statuses>0,"count="+statuses);
 const controls=await visibleControlNames(page);
 const unnamed=controls.filter(c=>!c.name && !["file","checkbox","radio"].includes(c.type));
 record(scope,"visible controls have discernible names",unnamed.length===0,JSON.stringify(unnamed.slice(0,5)));
 await page.locator("body").click({position:{x:2,y:2}});
 const focused=[];
 for(let i=0;i<12;i++){await page.keyboard.press("Tab");focused.push(await page.evaluate(()=>document.activeElement?.id||document.activeElement?.tagName||""))}
 record(scope,"keyboard focus advances",new Set(focused.filter(Boolean)).size>=4,focused.join(" > "));
 record(scope,"no page/console errors",errors.length===0,errors.slice(0,4).join(" | "));
 page.off("pageerror",onError);page.off("console",onConsole);
}
async function chooseCorrect(page,answerMap,prefix){
 await page.evaluate(({answerMap,prefix})=>{
   const sets=[...document.querySelectorAll("fieldset")].filter(f=>f.querySelector('input[type="radio"]'));
   sets.slice(0,5).forEach((f,i)=>{
     const prompt=f.querySelector("legend")?.textContent?.replace(/^\d+\.\s*/,"").trim();
     const answer=answerMap[prompt];
     const input=[...f.querySelectorAll('input[type="radio"]')].find(x=>x.value===answer);
     if(!input)throw new Error("Correct answer control not found for "+prompt);
     input.click();
   });
 },{answerMap,prefix});
}
async function kindergartenJourney(browser){
 const ctx=await browser.newContext({viewport:{width:390,height:812},acceptDownloads:true});
 const page=await ctx.newPage();
 const rel="courses/kindergarten/home-management/week-01/";
 const file=path.join(ROOT,rel,"index.html");
 const bank=extractBank(file),answers=Object.fromEntries(bank.map(q=>[q[0],q[1][0]]));
 await page.goto(BASE+rel);
 await page.fill("#learner","browser-k-a");await page.click("#open");
 record("Kindergarten journey","learner opens",!(await page.locator("#work").isHidden()));
 await chooseCorrect(page,answers,"quiz");
 await page.click("#check");
 record("Kindergarten journey","100% quiz scores correctly",(await page.locator("#result").textContent()).includes("100%"));
 record("Kindergarten journey","quiz alone does not complete evidence",!(await page.locator("#progress").textContent()).includes("Local evidence complete"));
 for(let i=1;i<=5;i++){await page.check("#done"+i);await page.fill("#note"+i,"Browser acceptance note "+i)}
 await page.fill("#adult","Test caregiver");await page.check("#review");await page.click("#save");
 record("Kindergarten journey","caregiver + five lessons + mastery completes local evidence",(await page.locator("#progress").textContent()).includes("Local evidence complete"));
 await page.reload();await page.fill("#learner","browser-k-a");await page.click("#open");
 record("Kindergarten journey","reload preserves learner record",(await page.locator("#progress").textContent()).includes("Local evidence complete"));

 const downloadPromise=page.waitForEvent("download");await page.click("#export");const download=await downloadPromise;
 const exported=path.join(os.tmpdir(),"khaemenes-kindergarten-browser-export.json");await download.saveAs(exported);
 const parsed=JSON.parse(fs.readFileSync(exported,"utf8"));
 record("Kindergarten journey","JSON export carries learner identity",parsed.learnerCode==="browser-k-a");
 const before=await page.evaluate(()=>localStorage.getItem("khae.life.home-management.kindergarten.week01.v1.browser-k-a"));
 await page.setInputFiles("#restore-file",exported);await page.click("#restore-go");
 const preview=await page.locator("#restore-result").textContent();
 const afterPreview=await page.evaluate(()=>localStorage.getItem("khae.life.home-management.kindergarten.week01.v1.browser-k-a"));
 record("Kindergarten journey","import first click is preview only",preview.includes("PREVIEW ONLY")&&before===afterPreview);
 page.on("dialog",d=>d.accept());
 await Promise.all([page.waitForLoadState("domcontentloaded"),page.click("#restore-go")]);
 await page.fill("#learner","browser-k-a");await page.click("#open");
 record("Kindergarten journey","import resets quiz attempts",(await page.locator("#progress").textContent()).includes("Best knowledge score 0%"));

 const week1Key="khae.life.home-management.kindergarten.week01.v1.browser-gate";
 await page.evaluate(({week1Key,rec})=>localStorage.setItem(week1Key,JSON.stringify(rec)),{week1Key,rec:recordFor(bank,3)});
 await page.goto(BASE+"courses/kindergarten/home-management/week-02/");
 await page.fill("#learner","browser-gate");await page.click("#open");
 record("Kindergarten gate","60% predecessor is rejected",(await page.locator("#work").isHidden())===true);
 await page.evaluate(({week1Key,rec})=>localStorage.setItem(week1Key,JSON.stringify(rec)),{week1Key,rec:recordFor(bank,4)});
 await page.fill("#learner","browser-gate");await page.click("#open");
 record("Kindergarten gate","80% predecessor unlocks Week 2",(await page.locator("#work").isHidden())===false);

 const corruptKey="khae.life.home-management.kindergarten.week01.v1.browser-corrupt";
 await page.goto(BASE+rel);
 await page.evaluate(k=>localStorage.setItem(k,"{broken"),corruptKey);
 await page.fill("#learner","browser-corrupt");await page.click("#open");
 const msg=(await page.locator("#message").textContent()).toLowerCase();
 const raw=await page.evaluate(k=>localStorage.getItem(k),corruptKey);
 record("Kindergarten recovery","corrupted storage is rejected without overwrite",msg.includes("damaged")&&raw==="{broken");

 await page.goto(BASE+rel);await page.fill("#learner","browser-switch-a");await page.click("#open");await page.check("#done1");
 const akey="khae.life.home-management.kindergarten.week01.v1.browser-switch-a";
 const savedA=await page.evaluate(k=>localStorage.getItem(k),akey);
 await page.fill("#learner","browser-switch-b");await page.click("#open");
 record("Kindergarten journey","learner switching preserves first namespace",savedA!==null&&(await page.evaluate(k=>localStorage.getItem(k),akey))===savedA);

 await page.goto(BASE+rel);
 await page.click("#home-risk");record("Kindergarten game","wrong safe-choice feedback announced",(await page.locator("#home-game-result").textContent()).toLowerCase().includes("try again"));
 await page.click("#home-safe");record("Kindergarten game","correct safe-choice feedback announced",(await page.locator("#home-game-result").textContent()).toLowerCase().includes("correct"));

 const pdf=await page.pdf({format:"Letter",printBackground:true});
 record("Kindergarten print","Chromium can generate printable PDF",pdf.length>5000,"bytes="+pdf.length);
 await ctx.close();
}
async function preschoolJourney(browser){
 const ctx=await browser.newContext({viewport:{width:390,height:812},acceptDownloads:true});
 const page=await ctx.newPage();
 const rel1="courses/transportation-navigation/preschool/week-01/";
 const rel2="courses/transportation-navigation/preschool/week-02/";
 const bank=extractBank(path.join(ROOT,rel1,"index.html"));
 const key="khae.life.transportation-navigation.preschool.week01.v1.browser-p-gate";
 await page.goto(BASE+rel1);await page.evaluate(({key,rec})=>localStorage.setItem(key,JSON.stringify(rec)),{key,rec:recordFor(bank,3)});
 await page.goto(BASE+rel2);await page.fill("#code","browser-p-gate");await page.click("#open");
 record("Preschool gate","60% predecessor is rejected",(await page.locator("#work").isHidden())===true);
 await page.goto(BASE+rel1);await page.evaluate(({key,rec})=>localStorage.setItem(key,JSON.stringify(rec)),{key,rec:recordFor(bank,4)});
 await page.goto(BASE+rel2);await page.fill("#code","browser-p-gate");await page.click("#open");
 record("Preschool gate","80% predecessor unlocks Week 2",(await page.locator("#work").isHidden())===false);

 await page.goto(BASE+rel1);await page.fill("#code","browser-p-a");await page.click("#open");
 const play=page.locator("[data-play]").first();
 if(await play.count()){await play.click();record("Preschool dialog","learning dialog opens",!(await page.locator("#dialog").isHidden()));await page.click("#close");record("Preschool dialog","learning dialog closes",(await page.locator("#dialog").isHidden())===true)}
 const pdf=await page.pdf({format:"Letter",printBackground:true});record("Preschool print","Chromium can generate printable PDF",pdf.length>5000,"bytes="+pdf.length);
 await ctx.close();
}
async function standaloneOffline(browser,relative,label){
 const ctx=await browser.newContext({viewport:{width:255,height:568}});
 const page=await ctx.newPage();
 const requests=[];page.on("request",r=>requests.push(r.url()));
 const url="file://"+path.join(ROOT,relative,"index.html");
 try{
   await page.goto(url,{waitUntil:"domcontentloaded"});
   const heading=(await page.locator("h1").first().textContent())||"";
   record(label,"standalone local HTML opens without network",heading.includes("Khaemenes")&&requests.every(u=>u.startsWith("file:")),requests.filter(u=>!u.startsWith("file:")).join(", "));
 }catch(e){record(label,"standalone local HTML opens without network",false,String(e))}
 await ctx.close();
}

const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage();
 const pages=[];
 for(const item of manifest.pathways){
   for(const week of item.preschool.weeks)pages.push(item.preschool.route+week+"/");
   if(item.kindergarten.status==="dedicated")for(const week of item.kindergarten.weeks)pages.push(item.kindergarten.route+week+"/");
 }
 for(const relative of pages)for(const height of [568,812])await baseline(page,relative,height);
 await page.close();
 await kindergartenJourney(browser);
 await preschoolJourney(browser);
 await standaloneOffline(browser,"courses/kindergarten/home-management/week-01/","Kindergarten offline");
 await standaloneOffline(browser,"courses/transportation-navigation/preschool/week-01/","Preschool offline");
}finally{await browser.close()}
report.summary={checks:report.checks.length,passed:report.checks.filter(x=>x.ok).length,failed:failures};
fs.writeFileSync(path.join(ROOT,"early-learning-browser-acceptance.json"),JSON.stringify(report,null,2)+"\n");
if(failures)process.exit(1);
console.log("PASS "+report.summary.passed+" automated early-learning browser checks");
