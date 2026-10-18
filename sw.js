// Service Worker de Libro de Catálogo (WikiTaxa)
// Estrategia: network-first, con caché como respaldo solo si no hay conexión.
// Así los cambios nuevos se ven de inmediato en cuanto hay internet.
// Las cachés se comparten entre todas las apps del dominio, por eso solo se borran las propias (prefijo "libro-catalogo-").
// Para publicar una versión nueva: subir el index.html nuevo y subir este archivo cambiando el número de CACHE_NAME.
var CACHE_NAME = "libro-catalogo-v1";
var ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", function(evt){
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){ return cache.addAll(ARCHIVOS); })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(evt){
  evt.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k.indexOf("libro-catalogo-") === 0 && k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(evt){
  if(evt.request.method !== "GET") return;
  if(evt.request.cache === "no-store") return;
  evt.respondWith(
    fetch(evt.request, {cache: "no-cache"}).then(function(resp){
      if(resp && resp.status === 200){
        var respClone = resp.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(evt.request, respClone); });
      }
      return resp;
    }).catch(function(){
      return caches.match(evt.request).then(function(cached){
        if(cached) return cached;
        // solo las navegaciones caen a index.html; un script o estilo que falta no debe recibir una página HTML
        if(evt.request.mode === "navigate") return caches.match("./index.html");
        return new Response("", {status: 504, statusText: "Sin conexión y sin copia guardada"});
      });
    })
  );
});
