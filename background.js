function createNewTab(url) {
	console.log(url)
	chrome.tabs.create({
		url: url
	})
}

function handleMessage(request, sender, sendResponse) {
  createNewTab(request.url)
}

chrome.runtime.onMessage.addListener(handleMessage)