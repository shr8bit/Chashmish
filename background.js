chrome.alarms.onAlarm.addListener(function() {
	chrome.notifications.create('reminder', {
		type: 'basic',
		iconUrl: 'icon.png',
		title: 'Gentle reminder',
		message: 'Blink your eyes!'
	}, function() {});
	setTimeout(function() { chrome.notifications.clear('reminder', function(){}); }, 2000);
});
