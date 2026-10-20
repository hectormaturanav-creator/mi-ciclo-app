/* Mi Ciclo 4.3.1: synchronize insight with already-rendered interval chart. */
'use strict';(()=>{
 const graph=document.getElementById('cycleChart');
 const insight=document.getElementById('cycleInsight');
 if(!graph||!insight)return;
 function refresh(){
  const label=graph.getAttribute('aria-label')||'';
  const nums=[...label.matchAll(/:\s*(\d+)\s*días/g)].map(m=>Number(m[1]));
  if(nums.length===0){insight.textContent='Se necesitan al menos dos inicios de período para calcular un intervalo entre ciclos.';return;}
  if(nums.length===1){insight.textContent=`Intervalo observado: ${nums[0]} días. Registra un tercer período para comparar intervalos.`;return;}
  const sum=nums.reduce((a,b)=>a+b,0),min=Math.min(...nums),max=Math.max(...nums);
  insight.textContent=`Promedio entre inicios: ${(sum/nums.length).toLocaleString('es-CL',{maximumFractionDigits:1})} días · Mínimo: ${min} · Máximo: ${max} · Diferencia: ${max-min} días. Datos descriptivos, no un diagnóstico.`;
 }
 const observer=new MutationObserver(refresh);
 observer.observe(graph,{attributes:true,attributeFilter:['aria-label']});
 refresh();
})();
