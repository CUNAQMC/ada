var pa11y = require('pa11y');
var htmlReporter = require('pa11y/reporter/html');
var fs = require('fs');
var url = 'www.nm.com';


// Create a test instance with some default options
var test = pa11y({
    
        // Log what's happening to the console
        log: {
           // debug: console.log.bind(console),
            error: console.error.bind(console),
           // info: console.log.bind(console)
        },
        ignore: ['notice','warning'],
        screenCapture: './screenshots/screenshot.png',
        standard: 'WCAG2AA', //allowedStandards: ['Section508', 'WCAG2A', 'WCAG2AA', 'WCAG2AAA']
    });
    
    // Test http://example.com/
    test.run(url, function(error, result) {
        
        if (error) {
            return console.error(error.message);
        }
        console.log(result);
        var htmlresult = htmlReporter.process(result, url);
        fs.writeFile('./Results/ScanResult.html', htmlresult, function (err) {
            if (err) return console.log(err);
        })
    });


