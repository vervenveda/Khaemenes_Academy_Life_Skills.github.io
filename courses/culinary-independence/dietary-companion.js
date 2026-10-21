/* Culinary dietary learning companion — independent of assessment state. */
(()=>{'use strict';if(document.getElementById('culinary-dietary-companion'))return;
const KEY='khae_culinary_dietary_v1';
const rules=[
['vegetarian','Vegetarian','Avoid meat, poultry and fish; check broths, gelatin and rennet.'],
['vegan','Vegan','Avoid all animal-derived ingredients, including dairy, eggs and honey.'],
['pescatarian','Pescatarian','Avoid meat and poultry; fish may be included, subject to other restrictions.'],
['no-pork','No pork','Avoid pork, bacon, ham, lard, pork gelatin and pork-based broths.'],
['no-beef','No beef','Avoid beef, beef broth, tallow and beef gelatin.'],
['no-poultry','No poultry','Avoid chicken, turkey, duck and poultry broths.'],
['no-dairy','No dairy','Avoid milk, cheese, yogurt, butter, whey and casein.'],
['no-eggs','No eggs','Avoid eggs, mayonnaise and egg-containing baked goods.'],
['no-fish','No fish','Avoid fish and fish-derived ingredients and sauces.'],
['no-shellfish','No shellfish','Avoid crustaceans and mollusks; check sauces and cross-contact.'],
['no-peanuts','No peanuts','Avoid peanuts and peanut ingredients; check shared equipment.'],
['no-tree-nuts','No tree nuts','Avoid tree nuts and nut ingredients; check shared equipment.'],
['no-soy','No soy','Avoid soy and soy-derived ingredients where relevant.'],
['no-wheat','No wheat','Avoid wheat ingredients; gluten restrictions may require excluding barley and rye too.'],
['gluten-free','Gluten-free','Avoid wheat, barley, rye and non-certified oats; cross-contact matters.'],
['no-sesame','No sesame','Avoid sesame seeds, tahini and sesame oil.'],
['no-honey','No honey','Avoid honey and honey-containing sauces or baked goods.'],
['no-alcohol','No alcohol in recipes','Avoid alcoholic beverages and alcohol-containing cooking ingredients.'],
['halal-aware','Halal-aware','Check certification, slaughter, gelatin and alcohol; do not assume compliance.'],
['kosher-aware','Kosher-aware','Check certification, meat/dairy separation and equipment; do not assume compliance.'],
['low-sodium','Lower-sodium preference','Compare sodium labels; do not imply a medically suitable limit.'],
['plant-forward','Plant-forward','Emphasize plant foods without necessarily excluding animal products.']
];
const conflicts=[['vegan','pescatarian'],['vegetarian','pescatarian'],['pescatarian','no-fish']];
const safe=()=>{try{let a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a.filter(x=>rules.some(r=>r[0]===x)):[]}catch{return[]}};
let selected=new Set(safe());const host=document.createElement('section');host.id='culinary-dietary-companion';host.setAttribute('aria-label','Dietary learning preferences');host.style.cssText='max-width:960px;margin:15px auto;padding:14px;border:2px solid #a88a5b;border-radius:7px;background:#fff8e9;color:#173944;font:400 16px/1.5 Arial,sans-serif';host.innerHTML='<details><summary style="cursor:pointer;font-size:1.12em">🥗 Dietary choices · Customize examples and recipes</summary><p>Choose any applicable preferences. This companion provides substitutions and cautions; it does not alter quiz answers, grade records, or verify ingredient safety.</p><div id="culinary-diet-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:5px"></div><p id="culinary-diet-conflict" role="status"></p><button type="button" id="culinary-diet-clear" style="padding:8px;border-radius:7px">Clear dietary choices</button><p><small>Saved only in this browser. No health information is sent to a server. Check every label, ingredient source, preparation surface and applicable dietary authority. For allergies or medical diets, consult qualified guidance.</small></p></details><div id="culinary-diet-summary" aria-live="polite"></div><div id="culinary-diet-guidance"></div>';
const root=document.querySelector('main')||document.body;root.insertBefore(host,root.firstChild);
const options=host.querySelector('#culinary-diet-options'),summary=host.querySelector('#culinary-diet-summary'),guidance=host.querySelector('#culinary-diet-guidance'),warn=host.querySelector('#culinary-diet-conflict');
rules.forEach(([id,label])=>{let el=document.createElement('label');el.style.cssText='display:flex;gap:8px;align-items:start;margin:2px';let cb=document.createElement('input');cb.type='checkbox';cb.value=id;cb.checked=selected.has(id);cb.addEventListener('change',()=>{if(cb.checked)selected.add(id);else selected.delete(id);update()});el.append(cb,document.createTextNode(label));options.append(el)});
function update(){const arr=[...selected];try{localStorage.setItem(KEY,JSON.stringify(arr))}catch{};summary.textContent=arr.length?'Active dietary learning choices: '+arr.map(id=>rules.find(r=>r[0]===id)[1]).join(' · '):'No dietary exclusions selected; all examples remain educational.';
guidance.replaceChildren();if(arr.length){let h=document.createElement('h3');h.textContent='Ingredient checks and learning substitutions';guidance.append(h);let ul=document.createElement('ul');arr.forEach(id=>{let rule=rules.find(r=>r[0]===id),li=document.createElement('li');li.textContent=rule[1]+': '+rule[2];ul.append(li)});guidance.append(ul);let p=document.createElement('p');p.textContent='Adapt lesson meal-planning examples to these choices. When an example cannot be safely adapted, choose a paper-based alternative and document the reason. The original curriculum remains visible for academic study.';guidance.append(p)}
let clashes=conflicts.filter(([a,b])=>selected.has(a)&&selected.has(b));warn.textContent=clashes.length?'Review potentially conflicting choices: '+clashes.map(x=>x.join(' and ')).join('; ')+'. Choose the stricter applicable exclusion and verify ingredients.':''}

// Optional ingredient screening is a learning aid, not an allergen certification.
const ingredientMap={
'vegan':['milk','cheese','butter','whey','casein','egg','honey','beef','pork','chicken','turkey','fish','shrimp','gelatin'],
'vegetarian':['beef','pork','chicken','turkey','fish','shrimp','gelatin'],
'pescatarian':['beef','pork','chicken','turkey','gelatin'],
'no-pork':['pork','bacon','ham','lard','pork gelatin','prosciutto','pepperoni'],
'no-beef':['beef','tallow','beef broth'],
'no-poultry':['chicken','turkey','duck','poultry broth'],
'no-dairy':['milk','cheese','butter','whey','casein','cream','yogurt','ghee'],
'no-eggs':['egg','mayonnaise','meringue'],
'no-fish':['fish','anchovy','tuna','salmon','fish sauce'],
'no-shellfish':['shrimp','prawn','crab','lobster','oyster','mussel','clam'],
'no-peanuts':['peanut','groundnut'],
'no-tree-nuts':['almond','cashew','walnut','pecan','pistachio','hazelnut','macadamia'],
'no-soy':['soy','tofu','tempeh','edamame'],
'no-wheat':['wheat','semolina','bulgur','couscous','spelt'],
'gluten-free':['wheat','barley','rye','malt','semolina','bulgur','spelt'],
'no-sesame':['sesame','tahini'],
'no-honey':['honey'],
'no-alcohol':['wine','beer','rum','brandy','vodka','liqueur']
};
const screening=document.createElement('div');screening.innerHTML='<label for="culinary-diet-ingredients">Check an example ingredient list (comma-separated; optional)</label><textarea id="culinary-diet-ingredients" rows="2" style="display:block;width:100%;max-width:680px;font:inherit;border:1px solid #9d8764;border-radius:7px;padding:8px" placeholder="Example: pasta, cheese, tomato, olive oil"></textarea><button type="button" id="culinary-diet-check" style="padding:8px;border-radius:7px">Screen example ingredients</button><p id="culinary-diet-results" role="status"></p>';
host.querySelector('details').append(screening);
host.querySelector('#culinary-diet-check').addEventListener('click',()=>{
 const raw=host.querySelector('#culinary-diet-ingredients').value.toLowerCase();
 const terms=raw.split(/[,;\\n]/).map(x=>x.trim()).filter(Boolean);
 const hits=[];
 for(const id of selected)for(const word of ingredientMap[id]||[]){
 if(terms.some(t=>new RegExp('(^|[^a-z])'+word.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g,'\\\\host.querySelector('#culinary-diet-clear').addEventListener')+'([^a-z]|$)','i').test(t)))hits.push(word+' ('+rules.find(r=>r[0]===id)[1]+')')
 }
 const result=host.querySelector('#culinary-diet-results');
 result.textContent=!terms.length?'Enter an ingredient list to screen.':hits.length?'Potential conflicts to investigate: '+[...new Set(hits)].join('; ')+'. Check full labels and cross-contact.':'No listed keyword conflicts detected. This does NOT verify suitability or absence of allergens; review all ingredients, derivatives and cross-contact.';
});

host.querySelector('#culinary-diet-clear').addEventListener('click',()=>{selected.clear();options.querySelectorAll('input').forEach(c=>c.checked=false);update()});update();
})();