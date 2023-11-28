// entry file for ags

import App from 'resource:///com/github/Aylur/ags/app.js';
import Bar from './js/bar/bar.js'

let config = {
    style: App.configDir + '/style.css',
    windows: [
        Bar(0)
    ],
};


export default config;
