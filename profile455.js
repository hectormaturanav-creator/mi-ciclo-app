(()=>{'use strict';
const $=id=>document.getElementById(id);
const button=$('profilePhotoButton'),file=$('profilePhotoInput'),modal=$('photoModal');
if(!button||!file||!modal)return;
const originalIcon=button.innerHTML;
const feedback=$('photoFeedback');
let busy=false;
function message(text){feedback.textContent=text;feedback.hidden=!text;}
function close(){if(busy)return;modal.hidden=true;button.focus();}
button.addEventListener('click',()=>{modal.hidden=false;message('');$('photoChoose').focus();});
$('photoClose').addEventListener('click',close);
modal.addEventListener('click',e=>{if(e.target===modal)close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
$('photoChoose').addEventListener('click',()=>{if(!busy){file.value='';file.click();}});
$('photoRemove').addEventListener('click',()=>{if(!busy){message('Eliminando foto...');document.dispatchEvent(new CustomEvent('mc-photo-change',{detail:{photo:''}}));}});
function decodeImage(url){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('unsupported'));im.src=url;});}
async function shrink(image){const size=180,canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('canvas');const w=image.naturalWidth||image.width,h=image.naturalHeight||image.height;
if(!w||!h)throw new Error('invalid');const side=Math.min(w,h);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,size,size);ctx.drawImage(image,(w-side)/2,(h-side)/2,side,side,0,0,size,size);
let photo=canvas.toDataURL('image/jpeg',0.72);
if(!/^data:image\/jpeg;base64,/.test(photo))throw new Error('encoding');
if(photo.length>=145000){photo=canvas.toDataURL('image/jpeg',0.45);}
if(photo.length>=150000)throw new Error('size');return photo;}
file.addEventListener('change',async()=>{
const chosen=file.files&&file.files[0];if(!chosen||busy)return;
if(chosen.size>25*1024*1024){message('La imagen supera 25 MB. Elige una foto más pequeña.');return;}
busy=true;$('photoChoose').disabled=true;message('Procesando fotografía...');
let url;
try{
 url=URL.createObjectURL(chosen);
 // Safari can decode iPhone HEIC/HEIF on supported versions. Attempt decoding
 // instead of rejecting based on the file's MIME type.
 let image=await decodeImage(url);
 const photo=await shrink(image);
 message('Guardando fotografía cifrada...');
 document.dispatchEvent(new CustomEvent('mc-photo-change',{detail:{photo}}));
}catch(err){message('No se pudo leer esta foto. Si es HEIC y tu navegador no la admite, guárdala como JPG en Fotos/Archivos y vuelve a seleccionarla.');}
finally{if(url)URL.revokeObjectURL(url);file.value='';busy=false;$('photoChoose').disabled=false;}
});
document.addEventListener('mc-photo-render',e=>{const photo=e.detail?.photo;button.replaceChildren();if(photo){const im=document.createElement('img');im.src=photo;im.alt='Fotografía de perfil';button.append(im);}else{const template=document.createElement('template');template.innerHTML=originalIcon;button.append(template.content.cloneNode(true));}});
document.addEventListener('mc-photo-result',e=>{if(e.detail?.ok){message('Fotografía guardada correctamente.');modal.hidden=true;}else{message(e.detail?.message||'No se pudo guardar la fotografía.');}});
})();