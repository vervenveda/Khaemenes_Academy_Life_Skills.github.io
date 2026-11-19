(()=>{"use strict";
if(window.__KHAE_LIFE_SKILLS_MINIMAL_HEADER_V1__)return;
window.__KHAE_LIFE_SKILLS_MINIMAL_HEADER_V1__=true;
function mount(){
 if(document.getElementById("vnvHeaderAutoPopulate"))return;
 if(!window.VNV_HEADER?.mount)return;
 window.VNV_HEADER.mount({
   replaceLegacy:false,
   title:"Khaemenes Academy",
   subtitle:"Life Skills & Practical Independence",
   icon:"LS",
   home:"https://vervenveda.com/Khaemenes_Academy.github.io/",
   actions:[]
 });
}
function start(){
 if(window.VNV_HEADER?.mount){mount();return}
 const s=[...document.scripts].find(x=>/vnv-header-autopopulate\.js(?:$|[?#])/.test(x.src||""));
 s?.addEventListener("load",mount,{once:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
})();