#!/usr/bin/env node
// Read-only Life Skills chrome inventory. Never rewrites HTML or learner records.
import fs from "node:fs";
import path from "node:path";
const root=process.cwd(), strict=process.argv.includes("--strict");
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{if([".git","node_modules"].includes(e.name))return [];const p=path.join(dir,e.name);return e.isDirectory()?walk(p):(/\.html?$/i.test(p)?[p]:[])});}
const files=walk(root).sort(), issues=[], counts={pages:files.length,retiredRegulator:0,legacyHeader:0,legacyMenu:0,canonicalHeader:0,autoTicker:0,legacy333Ticker:0,classTools:0,ecosystemDock:0,translator:0,duplicateLoaders:0,earlyPages:0};
function n(s,pattern){return (s.match(pattern)||[]).length}
function early(file){return /(?:\/preschool\/|\/kindergarten\/|\/elementary\/grade-[123]\/)/i.test("/"+file)}
for(const abs of files){
 const file=path.relative(root,abs).split(path.sep).join("/"),s=fs.readFileSync(abs,"utf8"),low=early(file);
 if(low)counts.earlyPages++;
 const retired=n(s,/life-skills-global-standard-v1\.js/gi);
 const legacyHeader=n(s,/khaemenes-global-header\.js|<header\s+data-khae-header/gi);
 const legacyMenu=n(s,/vnv-ecosystem-menu\.js/gi);
 const header=n(s,/vnv-header-autopopulate\.js/gi), ticker=n(s,/vnv-ticker-autopopulate\.js/gi);
 const ticker333=n(s,/vnv-333-ticker\.js/gi),left=n(s,/vnv-class-tools-toolbar\.js/gi);
 const right=n(s,/vnv-ecosystem-toolbar\.js/gi),translate=n(s,/vnv-language\.js/gi);
 counts.retiredRegulator+=retired>0?1:0;
 counts.legacyHeader+=legacyHeader>0?1:0;
 counts.legacyMenu+=legacyMenu>0?1:0;
 counts.canonicalHeader+=header>0?1:0;
 counts.autoTicker+=ticker>0?1:0;
 counts.legacy333Ticker+=ticker333>0?1:0;
 counts.classTools+=left>0?1:0;
 counts.ecosystemDock+=right>0?1:0;
 counts.translator+=translate>0?1:0;
 const faults=[];
 if(retired)faults.push("retired page regulator");
 if(legacyHeader)faults.push("legacy global header");
 if(legacyMenu)faults.push("legacy ecosystem menu");
 if(low && ticker333)faults.push("extra 333 ticker on Pre-K–Grade 3");
 if(low && ticker!==1)faults.push("early-stage AutoPopulate ticker count "+ticker);
 for(const [name,value] of [["official header",header],["lower-left tools",left],["lower-right 3x3 dock",right],["language",translate]]){
  if(!value)faults.push("missing "+name);
  if(value>1)faults.push("duplicate "+name+" loader");
 }
 if(ticker>1)faults.push("duplicate AutoPopulate loader");
 if(header>1||ticker>1||left>1||right>1||translate>1)counts.duplicateLoaders++;
 if(faults.length)issues.push({file,issues:faults});
}
const report={mode:"READ_ONLY",status:issues.length?"FINDINGS":"PASS",counts,affectedPages:issues.length,findings:issues};
console.log(JSON.stringify(report,null,2));
if(strict&&issues.length)process.exitCode=1;
