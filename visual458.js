"use strict";
/* Visualization only; read from decrypted in-memory session, no writes/network. */
window.renderVisual458=function(data){
 const records=[...(data.records||[])].filter(r=>r.start&&r.end).sort((a,b)=>a.start.localeCompare(b.start));
 const intervals=[];
 const utc=s=>Date.parse(s+'T12:00:00Z');
 const delta=(a,b)=>Math.round((utc(a)-utc(b))/86400000);
 for(let i=1;i<records.length;i++){let n=delta(records[i].start,records[i-1].start);if(n>=15&&n<=60)intervals.push(n)}
 const durations=records.map(r=>delta(r.end,r.start)+1).filter(n=>n>=1&&n<=31);
 const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
 const cyc=mean(intervals),period=mean(durations),variation=intervals.length>=2?Math.max(...intervals)-Math.min(...intervals):null;
 for(const [key,val,scale] of [['cycle',cyc,60],['variation',variation,45],['period',period,15]]){
  const number=document.getElementById('v458-'+key),el=document.querySelector('.v458-donut[data-measure="'+key+'"]');
  if(!number||!el)continue;
  number.textContent=val===null?'—':(Math.round(val*10)/10).toLocaleString('es-CL',{maximumFractionDigits:1});
  el.style.setProperty('--arc',val===null?'0%':Math.min(90,Math.max(8,100*val/scale))+'%');
  el.title=val===null?'Datos insuficientes':number.textContent+' días';
 }
 const root=document.getElementById('v458FlowMatrix');if(!root)return;root.replaceChildren();
 const daily=new Map((data.daily||[]).filter(r=>r.date).map(r=>[r.date,r]));
 const all=records.slice(-6).reverse();
 if(!all.length){let p=document.createElement('p');p.className='v458-matrix-empty';p.textContent='Registra un período para visualizar sus días.';root.append(p);return}
 const maxDays=Math.min(10,Math.max(7,...all.map(r=>delta(r.end,r.start)+1)));
 const mk=(type,klass,value)=>{let e=document.createElement(type);e.className=klass;if(value!==undefined)e.textContent=value;return e};
 const header=mk('div','v458-matrix-row');header.style.setProperty('--days',maxDays);header.append(mk('span','v458-row-label',''));
 for(let i=0;i<maxDays;i++)header.append(mk('span','v458-day-header',String(i+1)));
 root.append(header);
 for(const record of all){const row=mk('div','v458-matrix-row');row.style.setProperty('--days',maxDays);let label=mk('span','v458-row-label',new Date(utc(record.start)).toLocaleDateString('es-CL',{day:'numeric',month:'short',timeZone:'UTC'}));row.append(label);
  const start=utc(record.start),count=delta(record.end,record.start)+1;
  for(let i=0;i<maxDays;i++){let cell=mk('span','v458-day-cell');if(i<count){let d=new Date(start+i*86400000).toISOString().slice(0,10);let v=daily.get(d)?.flow;if(['Ninguno','Manchado','Leve','Moderado','Abundante'].includes(v)){cell.dataset.flow=v;cell.title=d+': '+v}else cell.title=d+': sin registro diario'}else{cell.style.opacity='.28';cell.title='Fuera del período'}row.append(cell)}root.append(row)
 }
};
