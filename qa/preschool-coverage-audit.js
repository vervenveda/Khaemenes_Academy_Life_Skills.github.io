/* Khaemenes Academy Life Skills — Preschool regression coverage registry.
 * Verifies that every canonical Preschool pathway is owned by at least one
 * direct-source regression family. Dependency-free. */
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const root=path.join(__dirname,"..");
const manifest=JSON.parse(fs.readFileSync(path.join(root,"docs","life-skills-route-manifest.json"),"utf8"));
const canonical=new Set(manifest.pathways.map(item=>item.slug));
const modern=new Set([
 "transportation-navigation",
 "digital-literacy-citizenship",
 "civic-community-living",
 "career-work-readiness",
 "entrepreneurship-small-business",
 "relationships-communication",
 "caregiving-family-responsibilities",
 "legal-consumer-literacy"
]);
const legacyProduction=new Set(["home-management","culinary-independence"]);
const expandedProduction=new Set([
 "gardening-food-growing",
 "creativity-arts-making",
 "health-first-aid-wellbeing",
 "personal-finance",
 "sustainability-stewardship",
 "emergency-readiness-resilience"
]);
const represented=new Set([...modern,...legacyProduction,...expandedProduction]);
assert.strictEqual(canonical.size,16,"canonical manifest must contain 16 Preschool pathways");
assert.strictEqual(represented.size,16,"regression registry must contain 16 unique pathways");
const missing=[...canonical].filter(slug=>!represented.has(slug));
const unknown=[...represented].filter(slug=>!canonical.has(slug));
assert.deepStrictEqual(missing,[],"missing direct-source regression pathways");
assert.deepStrictEqual(unknown,[],"regression registry contains unknown pathways");
for(const slug of canonical){
 for(const week of [1,2,3]){
   assert(fs.existsSync(path.join(root,"courses",slug,"preschool","week-0"+week,"index.html")),slug+" missing Preschool Week 0"+week);
 }
}
console.log(JSON.stringify({
 status:"PASS",
 canonicalPathways:canonical.size,
 regressionRepresented:represented.size,
 families:{
   modern:[...modern],
   legacyProduction:[...legacyProduction],
   expandedProduction:[...expandedProduction]
 }
},null,2));
