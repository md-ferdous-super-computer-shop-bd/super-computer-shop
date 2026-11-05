// নেটওয়ার্ক-ফার্স্ট: সবসময় সর্বশেষ ভার্সন আনে, ইন্টারনেট না থাকলে শুধু পেজটা ক্যাশ থেকে দেখায়।
// Firebase/Firestore (অন্য ডোমেইন) কখনো ক্যাশ হয় না।
const C='scs-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))
});
