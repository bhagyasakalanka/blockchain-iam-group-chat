chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var index = chrome.extension.getURL('index.html');
  chrome.windows.create({
    url: index,
    width: 640,
    height: 800,
    focused: true
  });
});
