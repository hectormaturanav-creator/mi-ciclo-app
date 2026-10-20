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

(function(){
  const old=window.renderVisual458;
  window.renderVisual458=function(data){
    old(data);
    const points=(data.daily||[]).filter(r=>r.date&&Number.isInteger(r.pain)&&r.pain>=0&&r.pain<=10).sort((a,b)=>a.date.localeCompare(b.date)).slice(-10);
    const box=document.getElementById('wellnessPainChart');
    if(!box||points.length<2)return;
    const w=335,h=172,p={l:25,r:12,t:14,b:33};
    const x=i=>p.l+(w-p.l-p.r)*(i/(points.length-1));
    const y=v=>h-p.b-(h-p.t-p.b)*v/10;
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('role','img');svg.setAttribute('aria-label','Evolución de dolor diario de cero a diez con fechas reales');svg.classList.add('v459-plot');
    function el(tag,attrs,txt){const z=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs||{}))z.setAttribute(k,v);if(txt!==undefined)z.textContent=txt;svg.append(z);return z}
    for(const v of [0,5,10]){const Y=y(v);el('line',{x1:p.l,x2:w-p.r,y1:Y,y2:Y,stroke:'#eadde8','stroke-dasharray':'3 4'});el('text',{x:3,y:Y+4},String(v))}
    const path=points.map((r,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(r.pain).toFixed(1)).join(' ');
    el('path',{d:path,fill:'none',stroke:'#a55c8d','stroke-width':3,'stroke-linejoin':'round','stroke-linecap':'round'});
    for(let i=0;i<points.length;i++){const pt=points[i];el('circle',{cx:x(i),cy:y(pt.pain),r:4,fill:'#b86b9a',stroke:'#fff','stroke-width':2});if(i===0||i===points.length-1||points.length<=5)el('text',{x:x(i),y:h-10,'text-anchor':'middle'},pt.date.slice(5).replace('-','/'))}
    box.replaceChildren(svg);
  };
})();
