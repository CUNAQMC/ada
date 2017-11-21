var pa11y = require('pa11y');
var htmlReporter = require('pa11y/reporter/html');
var fs = require('fs');
var url = 'https://www.learnvest.com/';
var relativeURL= 'https://www.learnvest.com/mylv/login'



// Create a test instance with some default options
var test = pa11y({
    
        // Log what's happening to the console
        log: {
            debug: console.log.bind(console),
            error: console.error.bind(console),
            info: console.log.bind(console)
        },
        ignore: ['notice','warning'],
        timeout: 60000,
        screenCapture: './screenshots/screenshot.png',
        standard: 'WCAG2AA', //allowedStandards: ['Section508', 'WCAG2A', 'WCAG2AA', 'WCAG2AAA']
        actions: [
            'click element div.nav-burger',
            'click element a[title="LearnVest Login"]',
           //'click element a[title="Sign Up for LearnVest"]',
            'wait for element input[id="emailInput"] to be visible',
            'wait for url to be ' + relativeURL,
            'set field input[id="emailInput"] to test@learnvest.com'
           // 'wait for url to be https://www.learnvest.com/fsu/'
          /*  'click element #tab-1',
            'wait for element #tab-1-content to be visible',
            'set field #fullname to John Doe',
            'check field #terms-and-conditions',
            'uncheck field #subscribe-to-marketing',
            'wait for fragment to be #page-2',
            'wait for path to not be /login',
            'wait for url to be https://example.com/' */
        ] 
    });
   
    test.run(url, function(error, result) {  
        if (error) {
            return console.error(error.message);
        }
        console.log(result);
        var htmlresult = htmlReporter.process(result, relativeURL);
        fs.writeFile('./Results/ScanResult.html', htmlresult, function (err) {
            if (err) return console.log(err);
        })
    });


