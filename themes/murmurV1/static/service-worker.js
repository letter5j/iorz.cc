"use strict";
// Listen to fetch events
self.addEventListener('fetch', function (event) {
    // Check if the image is a jpeg
    if (/\.jpg|\.png$/.test(event.request.url)) {
        // Inspect the accept header for WebP support
        var supportsWebp = false;
        if (event.request.headers.has('accept')) {
            supportsWebp = event.request.headers
                .get('accept')
                .includes('webp');
        }
        // If we support WebP
        if (supportsWebp) {
            
            // Clone the request
            var req = event.request.clone();
            // Build the return URL
            // Add the CDN
            var returnUrl = "https://cf.jare.io/?u=" + req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
            console.log(returnUrl)
            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors'
                })
            );
        } else {
            // Clone the request
            var req = event.request.clone();
            // Build the return URL
            // Add the CDN
            var returnUrl = "https://cf.jare.io/?u=" + req.url;
            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors'
                })
            );
        }
        
    }

});