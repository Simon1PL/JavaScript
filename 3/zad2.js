const SetIntervalTime = [];
const SetTimeoutTime = [];
const N = 100;
let off1 = null;
let off2 = null;
let off3 = null;
function doTimeConsumingCallculationsWithSetInterval() {
    SetIntervalTime.push(parseInt(performance.now()));
    if (SetIntervalTime.length > N) {
        SetIntervalTime.shift();
    }
    calculatePrimes(1000, 1000000000);
}
function doTimeConsumingCallculationsWithSetTimeout() {
    SetTimeoutTime.push(parseInt(performance.now()));
    if (SetTimeoutTime.length > N) {
        SetTimeoutTime.shift();
    }
    calculatePrimes(1000, 1000000000);
    off2 = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, document.getElementById("licznik").value);
}

function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }

function drawChart() {
    let sumTimeout = 0;
    let sumInterval = 0;
    for (i in SetTimeoutTime) {
        if (i >= SetTimeoutTime.length-2) break;
        sumTimeout += SetTimeoutTime[parseInt(i)+1] - SetTimeoutTime[parseInt(i)];
    }
    console.log(sumTimeout);
    srednia = sumTimeout/SetTimeoutTime.length;
    for (i in SetIntervalTime) {
        if (i >= SetIntervalTime.length-2) break;
        sumInterval += SetIntervalTime[parseInt(i)+1] - SetIntervalTime[parseInt(i)];
    }
    console.log(sumInterval);
    srednia2 = sumInterval/SetIntervalTime.length;
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: false,
        theme: "light2",
        title: {
            text: "Daily Sales Data"
        },
        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true
        },
        data: [{        
            type: "column",  
            dataPoints: [      
                { y: srednia2, label: "Interval" },
                { y: srednia,  label: "Timeout" },
            ]
        }]
    });
    chart.render();
    off3 = window.requestAnimationFrame(drawChart);
}

function start() {
    debugger;
    off1 = window.setInterval(doTimeConsumingCallculationsWithSetInterval, document.getElementById("licznik").value);
    off2 = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, document.getElementById("licznik").value);
    off3 = window.requestAnimationFrame(drawChart);
}

function stop() {
    window.cancelAnimationFrame(off3);
    window.clearTimeout(off2);
    window.clearInterval(off1);
}