exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 10000,
    multiCapabilities: [{
        browserName: 'chrome'
    }]
};
