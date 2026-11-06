// নেটওয়ার্ক-ফার্স্ট: সবসময় সর্বশেষ ভার্সন আনে, ইন্টারনেট না থাকলে শুধু পেজটা ক্যাশ থেকে দেখায়।
// Firebase SDK ফাইল ক্যাশ হয় (অফলাইনে চালু হওয়ার জন্য); ডেটা কখনো ক্যাশ হয় না।
const C='scs-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  const fb=u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/');
  if(r.method!=='GET'||(u.origin!==location.origin&&!fb))return;
  e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))
});
