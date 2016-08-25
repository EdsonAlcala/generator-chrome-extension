'use strict';

module.exports = {
    manifestJSON: {
        "manifest_version": 2,
        "icons": {
            "16": "img/16x16.png",
            "48": "img/48x48.png",
            "128": "img/128x128.png"
        },
        "version": "1.0.0",
        "background": {
            "scripts": [
                "js/background.js"
            ],
            "persistent": true
        },
        "permissions": [
            "http://*/*",
            "https://*/*"
        ]
    }
};
