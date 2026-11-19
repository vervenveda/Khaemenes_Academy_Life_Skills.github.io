import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const fail=[];
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ok=(v,m)=>{if(!v)fail.push(m)};

const html=read("index.html");
const scripts=[...html.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
const count=re=>scripts.filter(s=>re.test(s)).length;

ok((html.match(/<section\b/gi)||[]).length===3,"Life Skills landing must contain exactly 3 sections");
ok((html.match(/<footer\b/gi)||[]).length===1,"Life Skills landing must contain exactly 1 footer");
ok((html.match(/<header\b/gi)||[]).length===0,"local header markup is forbidden");
ok((html.match(/<aside\b/gi)||[]).length===0,"aside markup is forbidden");
ok((html.match(/<form\b/gi)||[]).length===0,"form markup is forbidden");
ok((html.match(/<dialog\b/gi)||[]).length===0,"dialog markup is forbidden");

ok(count(/vnv-333-ticker\.js/ )===1,"expected one canonical 333 ticker");
ok(count(/vnv-ticker-autopopulate\.js/ )===1,"expected one canonical AutoPopulate ticker");
ok(count(/vnv-header-autopopulate\.js/ )===1,"expected one official VNV header asset");
ok(count(/life-skills-minimal-header-mount-v1\.js/ )===1,"expected one Life Skills minimal header mount");
ok(count(/vnv-class-tools-toolbar\.js/ )===1,"expected one lower-left class tools toolbar");
ok(count(/vnv-ecosystem-toolbar\.js/ )===1,"expected one lower-right ecosystem toolbar");
ok(count(/vnv-language\.js/ )===1,"expected one translator engine");
ok(count(/life-skills-global-standard-v1\.js/ )===0,"legacy Life Skills global standard injector is forbidden");

ok(!/id=["']catalog["']|id=["']search["']|id=["']stage["']|data-select=|const outcomes=|Development and synchronization protocol/i.test(html),
  "root landing must not embed the 16-pathway catalog/search/filter engine");

for(const label of ["Learner Profile","Explore Pathways","Parent Profile"]){
  ok(html.includes(`>${label}</a>`),`missing ${label} primary access button`);
}
ok((html.match(/class=["']life-feature["']/g)||[]).length===4,"expected four Life Skills feature cards");
ok(/class=["']eyebrow["'][^>]*>Khaemenes Academy</i.test(html),"eyebrow must read Khaemenes Academy");
ok(/<h1[^>]*>Life Skills &amp; Practical Independence<\/h1>/i.test(html),
   "primary title must be Life Skills & Practical Independence");

const css=read("assets/life-skills-minimal-landing-v1.css");
ok(/\.life-hero \.eyebrow\{[^}]*font:400 33px/i.test(css),"eyebrow must be 33px");
ok(/\.life-hero h1\{[^}]*font:400 66px/i.test(css),"program title must be 66px");
ok(/\.life-hero \.descriptor\{[^}]*font:400 24px/i.test(css),"descriptor must be 24px");
ok(!/font(?:-size)?\s*:\s*(?:[0-9]|1[0-5])px/i.test(css),"learner-facing text below 16px is forbidden");

const tools=read("assets/life-skills-landing-class-tools-v1.js");
for(const label of ["Student","Programs","Search","Translate","Parent","Enroll"]){
  ok(tools.includes(`label:"${label}"`),`lower-left toolbar missing ${label}`);
}
ok(tools.includes('href:"./courses/"'),"Programs tool must route to the canonical Life Skills courses catalog");
ok(tools.includes("data-vct-translator-panel"),"translator must open inside the lower-left toolbar");

if(fail.length){
  console.error("\nLife Skills minimal landing validation failed:");
  fail.forEach(x=>console.error(" - "+x));
  process.exit(1);
}
console.log("LIFE_SKILLS_MINIMAL_LANDING=PASS · 16-pathway program gateway, canonical tickers/header, compact corner tools, 33/66/24 hero typography, no embedded catalog/global injector.");
