/* Mi Ciclo 4.4 — explicación local de estimaciones; no lee ni guarda datos cifrados. */
'use strict';
(()=>{
 const last=document.getElementById('last');
 const next=document.getElementById('next');
 const average=document.getElementById('average');
 const summary=document.getElementById('todaySummary');
 const quality=document.getElementById('estimateQuality');
 if(!last||!next||!average||!summary||!quality)return;
 function dateFromDisplay(str){
  if(!str||str.trim()==='—')return null;
  const months={ene:0,feb:1,mar:2,abr:3,may:4,jun:5,jul:6,ago:7,sep:8,oct:9,nov:10,dic:11};
  const match=str.toLowerCase().match(/(\d{1,2})\s+([a-záéíóú]+)\.?\s+(\d{4})/);
  if(!match)return null;
  const key=match[2].slice(0,3);if(!(key in months))return null;
  return new Date(+match[3],months[key],+match[1],12);
 }
 function update(){
  if(last.textContent.trim()==='—'){
   summary.textContent='Todavía no hay períodos registrados. Cuando agregues uno, aquí aparecerá el seguimiento.';
   quality.textContent='Con varios inicios registrados, las estimaciones pueden ajustarse a tus intervalos observados.';
   return;
  }
  const predicted=dateFromDisplay(next.textContent);
  if(!predicted){summary.textContent='Revisa tu calendario para consultar los registros.';quality.textContent='Las estimaciones son orientativas.';return;}
  const now=new Date();now.setHours(12,0,0,0);
  const days=Math.round((Date.UTC(predicted.getFullYear(),predicted.getMonth(),predicted.getDate())-Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);
  if(days>0)summary.textContent=`Faltan aproximadamente ${days} ${days===1?'día':'días'} para el próximo período estimado.`;
  else if(days===0)summary.textContent='La fecha estimada de inicio es hoy.';
  else summary.textContent=`La fecha estimada pasó hace ${Math.abs(days)} ${Math.abs(days)===1?'día':'días'}. Puedes registrar el período real cuando comience.`;
  quality.textContent=average.textContent.trim()==='—'?'Estimación inicial provisional basada en 28 días; aún faltan inicios registrados para calcular un promedio propio.':'Estimación basada en los intervalos registrados; el inicio real puede variar. No utilizar para anticoncepción.';
 }
 const observer=new MutationObserver(update);
 for(const el of [last,next,average])observer.observe(el,{childList:true,characterData:true,subtree:true});
 update();
})();
