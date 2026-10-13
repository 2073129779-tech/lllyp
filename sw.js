var C='ot-v2',F=['./','./index.html'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return k===C?null:caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(p){
    var cp=p.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return p}).catch(function(){return caches.match('./index.html')})}));
});
