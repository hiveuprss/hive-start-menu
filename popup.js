function handleClick(e) {
	var sending = chrome.runtime.sendMessage({
	    url: e.target.href
  	})
}

var anchors = document.querySelectorAll('a')
anchors.forEach(function(anchor) {
	addEventListener('click', handleClick)
})