"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["C:/Users/Bombassd/cnc-eco/build/index.html","61042e7550609c128f4e25cd0203ce08"],["C:/Users/Bombassd/cnc-eco/build/static/css/main.e4f5b9f5.css","7efa928e9bdbcc5e64a2f62c943a15c8"],["C:/Users/Bombassd/cnc-eco/build/static/js/main.8be8337f.js","cb24f0b3d126e51e68a9b4b1ec88b383"],["C:/Users/Bombassd/cnc-eco/build/static/media/FOR_Crystal Booster.25199d02.png","25199d02d746f9a79e5ba2a7f7f13877"],["C:/Users/Bombassd/cnc-eco/build/static/media/FOR_Fortress_BASE_Construction Yard.ee1ad60b.png","ee1ad60bebae38d9b350a232aed52459"],["C:/Users/Bombassd/cnc-eco/build/static/media/FOR_Fortress_BASE_MgNestHeavy.cb3203e4.png","cb3203e46e2e0d4f5d9b9a4aa65df3f1"],["C:/Users/Bombassd/cnc-eco/build/static/media/FOR_Fortress_BASE_Tower.f18d1cea.png","f18d1ceaea0dc634aee5a472854f9ec5"],["C:/Users/Bombassd/cnc-eco/build/static/media/FOR_Fortress_BASE_Turret_VS_Inf_ranged.47349a2c.png","47349a2c04d0c9a017baa06a71180e9e"],["C:/Users/Bombassd/cnc-eco/build/static/media/c.11218216.png","1121821652fc534e2bd57a8431f8f19f"],["C:/Users/Bombassd/cnc-eco/build/static/media/crystal01.11218216.png","1121821652fc534e2bd57a8431f8f19f"],["C:/Users/Bombassd/cnc-eco/build/static/media/h.db6375d0.png","db6375d0d53af7b094dbdbc64cf58ad3"],["C:/Users/Bombassd/cnc-eco/build/static/media/h.ed519350.png","ed51935050f4b3a06566be45b9df13b3"],["C:/Users/Bombassd/cnc-eco/build/static/media/i.156b7b2d.png","156b7b2d54305bdbbab12151949dd196"],["C:/Users/Bombassd/cnc-eco/build/static/media/n.bbe90f89.png","bbe90f89ae7f3d0ac3c52b88487f5d79"],["C:/Users/Bombassd/cnc-eco/build/static/media/n.ee38dc97.png","ee38dc979751336f9b4f336e57f532a2"],["C:/Users/Bombassd/cnc-eco/build/static/media/t.b43fc7a8.png","b43fc7a827f0afaab0a41b7b5bb96393"],["C:/Users/Bombassd/cnc-eco/build/static/media/tiberium.b43fc7a8.png","b43fc7a827f0afaab0a41b7b5bb96393"],["C:/Users/Bombassd/cnc-eco/build/static/media/x.d8b43c52.png","d8b43c5275ce7ced93a042123b4e2530"],["C:/Users/Bombassd/cnc-eco/build/static/media/z.0a1b661b.png","0a1b661b8bea9ee5685f144f0ba462ca"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),n=createCacheKey(s,hashParamName,t,/\.\w{8}\./);return[s.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var s=new Request(t,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);a=urlsToCacheKeys.has(t);a||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("/cnc-eco/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});