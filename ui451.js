(()=>{'use strict';
const $=id=>document.getElementById(id);
const pain=$('dailyPain'), slider=$('painSlider'), output=$('painValue');
if(!pain||!slider||!output)return;
function refresh(){const raw=pain.value;const val=raw===''?null:Number(raw);slider.value=val===null?'0':String(val);output.textContent=val===null?'Sin registrar':val+' / 10';
for(const [id,attr] of [['dailyFlow','data-flow-choice'],['dailyMood','data-mood-choice'],['dailyEnergy','data-energy-choice']]){
const input=$(id);if(!input)continue;
document.querySelectorAll('['+attr+']').forEach(button=>{const active=button.getAttribute(attr)===input.value;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});
}}
slider.addEventListener('input',()=>{pain.value=slider.value;refresh();});
$('painClear')?.addEventListener('click',()=>{pain.value='';refresh();});
for(const [id,attr] of [['dailyFlow','data-flow-choice'],['dailyMood','data-mood-choice'],['dailyEnergy','data-energy-choice']]){
document.querySelectorAll('['+attr+']').forEach(button=>button.addEventListener('click',()=>{const input=$(id);if(!input)return;input.value=button.getAttribute(attr);refresh();}));}
$('dailyForm')?.addEventListener('reset',()=>queueMicrotask(refresh));
$('dailyCancel')?.addEventListener('click',()=>queueMicrotask(refresh));
// React to edits loaded through the existing history list without changing persistence.
document.addEventListener('click',e=>{if(e.target.closest('.listrow')||e.target.closest('[data-tab]'))setTimeout(refresh,0);},true);
refresh();
})();