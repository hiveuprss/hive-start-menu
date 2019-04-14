function handleClickButton(e) {
  if (typeof e.target.value !== 'undefined' && e.target.value != "") {
  	chrome.runtime.sendMessage({
  	    url: e.target.value
    	})
  }
}

function handleClickAnchor(e) {
  if (typeof e.target.href !== 'undefined' && e.target.href != "") {
    chrome.runtime.sendMessage({
        url: e.target.href
      })
  }
}

var buttons = document.querySelectorAll('button.dapplink')
buttons.forEach(function(button) {
	addEventListener('click', handleClickButton)
})

var anchors = document.querySelectorAll('a')
anchors.forEach(function(button) {
  addEventListener('click', handleClickAnchor)
})