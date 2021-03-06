function setupAccelerometer() {
  // Default no Acceleration
  var arAlpha = 0;
  var arBeta = 0;
  var arGamma = 0;

  //initial max acceleration really low
  var arAlphamax = -10;
  var arBetamax = -10;
  var arGammamax = -10;

  var delay = 1000;
  var vMultiplier = 0.01;

  if (window.DeviceMotionEvent) {
    window.ondevicemotion = function(event) {
      rR = event.rotationRate;
      if (rR != null) {
        arAlpha = Math.round(rR.alpha);
        arBeta = Math.round(rR.beta);
        arGamma = Math.round(rR.gamma);
        if (arAlpha > arAlphamax) {
          arAlphamax = arAlpha;
        }
        if (arBeta > arBetamax) {
          arBetamax = arBeta;
        }
        if (arGamma > arGammamax) {
          arGammamax = arGamma;
        }
      }
    }

    function d2h(d) {
      return d.toString(16);
    }

    function h2d(h) {
      return parseInt(h, 16);
    }

    setInterval(function() {
      var maxsum = 35;
      var mysum = arAlphamax + arBetamax + arGammamax;
      var toreturn;
      if (mysum > maxsum) {
        toreturn = 1;
      } else {
        toreturn = mysum / maxsum;
      }

      toreturn = Math.max(0, toreturn);

      socket.emit('activity', {
        level: toreturn
      });

      arAlphamax = -10; 
      arBetamax = -10;
      arGammamax = -10;
    }, delay);
  }
}
