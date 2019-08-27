'use strict';
var frequecyValue = 7;
var chashmish = {
  chashmishOn : function() {
    chrome.alarms.get("chashmish", function (alarm) {
      if (typeof alarm !== 'undefined') {
        chrome.alarms.clear("chashmish");
      }
      chrome.alarms.create("chashmish", {delayInMinutes: 0.1, periodInMinutes: Number(frequecyValue)});
    });
    chrome.storage.local.set({"blinkstatus": "on"}, function() {
    });
    window.close();
  },

  chashmishOff : function() {
    chrome.alarms.clear("chashmish");
    chrome.storage.local.set({"blinkstatus": "off"}, function() {
    });
    window.close();
  },

  blinkFreq: function() {
    frequecyValue = document.getElementById('inputtime').value;
    chrome.storage.local.set({"chashmishfreq": frequecyValue}, function() {
    });
    chashmish.chashmishOn();
  },

  setup: function() {
    document.getElementById('chashmishOn').addEventListener('click', chashmish.chashmishOn);
    document.getElementById('chashmishOff').addEventListener('click', chashmish.chashmishOff);
    document.getElementById('time').addEventListener('click', chashmish.blinkFreq);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(["chashmishfreq", "blinkstatus"], function (values) {
    if (typeof values.chashmishfreq !== 'undefined') {
      frequecyValue = values.chashmishfreq;
      document.getElementById('inputtime').value = frequecyValue;
    } else {
      document.getElementById('inputtime').value = frequecyValue;
    }
    if (typeof values.blinkstatus !== 'undefined') {
      if (values.blinkstatus === "on") {
        document.getElementById('chashmishOff').removeAttribute('disabled');
        document.getElementById('chashmishOn').setAttribute('disabled', 'disabled');
      } else {
        document.getElementById('chashmishOn').removeAttribute('disabled');
        document.getElementById('chashmishOff').setAttribute('disabled', 'disabled');
      }
    } else {
      document.getElementById('chashmishOn').removeAttribute('disabled');
      document.getElementById('chashmishOff').setAttribute('disabled', 'disabled');
    }
  });
  chashmish.setup();
});
