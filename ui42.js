(()=>{'use strict';
const $=id=>document.getElementById(id);const toggle=$('settingsToggle'),panel=$('settingsPanel');
function close(){panel.hidden=true;toggle.setAttribute('aria-expanded','false')}
toggle.addEventListener('click',e=>{e.stopPropagation();const next=!panel.hidden;panel.hidden=next;toggle.setAttribute('aria-expanded',String(!next))});
document.addEventListener('pointerdown',e=>{if(!panel.contains(e.target)&&!toggle.contains(e.target))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
panel.querySelectorAll('button').forEach(b=>b.addEventListener('click',close));
function choose(kind,{scroll=false}={}){const p=kind==='period';if($('periodSection').hidden===p)$('periodSection').hidden=!p;if($('dailySection').hidden!==p)$('dailySection').hidden=p;
 $('choose-period').classList.toggle('selected',p);$('choose-daily').classList.toggle('selected',!p);
 $('choose-period').setAttribute('aria-pressed',String(p));$('choose-daily').setAttribute('aria-pressed',String(!p));
 if(scroll)(p?$('periodSection'):$('dailySection')).scrollIntoView({behavior:'smooth',block:'start'});
}
$('choose-period').addEventListener('click',()=>choose('period'));
$('choose-daily').addEventListener('click',()=>choose('daily'));
// Existing navigation opens the Registrar tab and scrolls to its section.
// Ensure the correct editor is visible even when opened from an existing record.
document.addEventListener('click',e=>{const quick=e.target.closest('[data-quick],#registerSelected');if(quick){choose(quick.dataset.quick==='period'?'period':'daily');return;}
 if(e.target.closest('#periodHistory'))choose('period');if(e.target.closest('#dailyHistory'))choose('daily');},true);
// Existing edit routines scroll to their corresponding form: reveal before scrolling.
new MutationObserver(()=>{if(!$('periodCancel').hidden)choose('period');else if(!$('dailyCancel').hidden)choose('daily')}).observe($('view-register'),{attributes:true,subtree:true,attributeFilter:['hidden']});
window.miCicloChooseRegister=choose;choose('period');
})();