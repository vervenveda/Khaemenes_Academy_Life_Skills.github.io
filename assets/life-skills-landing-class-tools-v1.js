(()=>{"use strict";
if(window.__KHAE_LIFE_SKILLS_LANDING_TOOLS_V1__)return;
window.__KHAE_LIFE_SKILLS_LANDING_TOOLS_V1__=true;

function ensureTranslatorPanel(root){
 let panel=root?.querySelector("[data-vct-translator-panel]");
 if(panel)return panel;
 panel=document.createElement("div");
 panel.className="vct-pop";
 panel.setAttribute("data-vct-translator-panel","");
 panel.hidden=true;
 panel.innerHTML='<h2>Translate</h2><p>Choose the interface language for this Life Skills page.</p><div data-vnv-language-mount></div>';
 root?.querySelector("#vnvClassToolsPanel")?.append(panel);
 return panel;
}
function moveCanonicalTranslator(panel){
 const mount=panel?.querySelector("[data-vnv-language-mount]");
 const switcher=document.getElementById("vnv-language-switch");
 if(mount&&switcher&&switcher.parentElement!==mount)mount.append(switcher);
 document.getElementById("vnv-language-rail")?.remove();
}
function openTranslator({root}){
 root.querySelectorAll(".vct-pop").forEach(p=>p.hidden=true);
 const panel=ensureTranslatorPanel(root);
 if(!panel)return;
 moveCanonicalTranslator(panel);
 panel.hidden=false;
 window.VNVLanguage?.refresh?.();
}
window.KhaemenesClassToolsConfigV1=Object.freeze({
 id:"life-skills-landing",
 match:()=>/\/Khaemenes_Academy_Life_Skills\.github\.io\/(?:index\.html)?$/i.test(location.pathname) || location.hostname==="vervenveda.com"&&/\/Khaemenes_Academy_Life_Skills\.github\.io\/?$/i.test(location.pathname),
 toggleLabel:"Tools",
 ariaLabel:"Life Skills tools",
 tools:[
   {type:"link",label:"Student",sub:"Student profile",href:"https://vervenveda.com/Khaemenes_Academy.github.io/student/"},
   {type:"link",label:"Programs",sub:"Life Skills pathways",href:"./courses/"},
   {type:"link",label:"Search",sub:"Search ecosystem",href:"https://vervenveda.com/PLERASearch.github.io/"},
   {type:"action",label:"Translate",sub:"Change language",action:"translate"},
   {type:"link",label:"Parent",sub:"Family support",href:"https://vervenveda.com/Khaemenes_Academy.github.io/family/"},
   {type:"link",label:"Enroll",sub:"Enrollment",href:"https://vervenveda.com/Khaemenes_Academy.github.io/family/enroll/"}
 ],
 actions:{translate:openTranslator}
});
document.addEventListener("DOMContentLoaded",()=>{
 setTimeout(()=>{
  const root=document.getElementById("vnvClassToolsToolbar");
  if(!root)return;
  const panel=ensureTranslatorPanel(root);
  moveCanonicalTranslator(panel);
 },120);
},{once:true});
})();