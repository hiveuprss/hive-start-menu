
HIVE_APPS = {

// blogging
  ecency:        {id: 'ecency', name: 'Ecency', icon: '', url: 'https://ecency.com/', description: ''},
  'hive.blog':   {id: 'hive.blog', name: 'Hive.blog', icon: '', url: 'https://hive.blog/', description: ''},
  leofinance:    {id: 'leofinance', name: 'LeoFinance', icon: '', url: 'https://leofinance.io/', description: ''},
  peakd:         {id: 'peakd', name: 'PeakD', icon: '', url: 'https://peakd.com/', description: 'The intuitive way to experience everything HIVE'},
  
// gaming
  brosino:       {id: 'brosino', name: 'BROsino', icon: '', url: '', description: ''},
  dcity:         {id: 'dcity', name: 'dCity', icon: '', url: '', description: ''},
  exode:         {id: 'exode', name: 'EXODE', icon: '', url: '', description: ''},
  holybread:     {id: 'holybread', name: 'Holybread', icon: '', url: 'https://www.holybread.io/', description: ''},
  splinterlands: {id: 'splinterlands', name: 'Splinterlands', icon: '', url: '', description: ''},
  
// shopping
  hivelist:      {id: 'hivelist', name: 'HiveList', icon: '', url: 'https://hivelist.io/', description: 'HiveCommerce marketplace community'},
  hiveswag:      {id: 'hiveswag', name: 'HiveSwag', icon: '', url: 'https://hiveswag.io/', description: ''},
  myhiveswag:    {id: 'myhiveswag', name: 'My Hive Swag', icon: '', url: 'https://myhiveswag.store/', description: ''},
  
// art
  lensy:         {id: 'lensy', name: 'Lensy', icon: '', url: 'https://lensy.io/', description: ''},
  nftshowroom:   {id: 'nftshowroom', name: 'NFTShowroom', icon: '', url: 'https://nftshowroom.com/',  description: 'Collectible, scarce, tokenized art'},

// utilities  
  'hive-engine': {id: 'hive-engine', name: 'Hive Engine', icon: '', url: 'https://hive-engine.com/', description: ''},
  hiveblocks:    {id: 'hiveblocks', name: 'Hiveblocks', icon: '', url: 'https://hiveblocks.com/', description: 'Hive block explorer tool'},
  hivesearcher:  {id: 'hivesearcher', name: 'Hivesearcher', icon: '', url: 'https://hivesearcher.com/', description: 'Search engine for Hive content'},
  hivestats:     {id: 'hivestats', name: 'HiveStats', icon: '', url: 'https://hivestats.io', description: ''},
  hivetasks:     {id: 'hivetasks', name: 'HiveTasks', icon: '', url: 'https://hivetasks.com/', description: ''},

// null
  null:          {id: '', name: '', icon: '', url: '', description: ''},

}

FAVORITE_APPS = []

RECENT_APPS = []


function drawMenu() {

  // data
  var data = {categories: [ 
    {name: 'Favorites', apps: getFavorites()},
    {name: 'Recents',   apps: getRecents()},
    {name: 'Art',       apps: [HIVE_APPS['lensy'], HIVE_APPS['nftshowroom']]},
    {name: 'Blogging',  apps: [HIVE_APPS['peakd'], HIVE_APPS['hive.blog'], HIVE_APPS['leofinance'], HIVE_APPS['ecency']]},
    {name: 'Gaming',    apps: [HIVE_APPS['brosino'], HIVE_APPS['dcity'], HIVE_APPS['exode'], HIVE_APPS['holybread'], HIVE_APPS['splinterlands']]},
    {name: 'Shopping',  apps: [HIVE_APPS['hivelist'], HIVE_APPS['hiveswag'], HIVE_APPS['myhiveswag']]},
    {name: 'Utilities', apps: [HIVE_APPS['hiveblocks'], HIVE_APPS['hivestats'], HIVE_APPS['hive-engine'], HIVE_APPS['hivesearcher'], HIVE_APPS['hivetasks']]},
  ]};

  var source = document.querySelector('#menu-template').innerHTML;
  var template = Handlebars.compile(source);

  // data is passed to above template
  var output = template(data);
  document.querySelector('#menu').innerHTML = output;

  var source = document.querySelector('#submenu-template').innerHTML;
  var template = Handlebars.compile(source);

  // data is passed to above template
  var output = template(data);
  document.querySelector('#submenus').innerHTML = output;

  getFavorites().forEach( (app) => {
    Array.from(document.querySelectorAll(`a.nonfavorite#${app.id}`)).map((x) => { 
      x.innerHTML = '<i class="fa fa-star" style="float:right" aria-hidden="true"></i>'
      x.className = 'favorite'
    })
  })


  function showSubmenu(event) {
    Array.from(document.querySelectorAll('.submenu')).forEach(element => {
        element.style.display = 'none'
      })

      let category = event.target.id.split('-')[1]
      document.querySelector(`#submenu-${category}`).style.display = 'block'
  }

  // set up event handlers
  data.categories.forEach(cat => {
    document.querySelector(`#cat-${cat.name}`).onclick = showSubmenu
    document.querySelector(`#cat-${cat.name}`).onmouseover = showSubmenu
  })

  Array.from(document.querySelectorAll('a.nonfavorite')).forEach(star => {
    star.onclick = (e) => {
      addFavorite(e.target.id)
      e.target.className = favorite
    }
  })

  Array.from(document.querySelectorAll('a.favorite')).forEach(star => {
    star.onclick = (e) => {
      removeFavorite(e.target.id)
      e.target.className = 'nonfavorite'
    }
  })
}


function getFavorites() {
  var favorites = JSON.parse(window.localStorage.getItem('favorites'))
  console.log(favorites)
  if (favorites) {
    return favorites.map((id) => HIVE_APPS[id])
  }
  return []
}

function removeFavorite(id) {
  var favorites = JSON.parse(window.localStorage.getItem('favorites'))
  console.log(favorites)
  
  const index = favorites.indexOf(id);
  if (index > -1) {
    favorites.splice(index, 1);
  }

  window.localStorage.setItem('favorites', JSON.stringify(favorites))

  drawMenu()
}


MAX_FAVORITES_COUNT = 7
MAX_RECENTS_COUNT = 7


function addFavorite(id) {
  var favorites = JSON.parse(window.localStorage.getItem('favorites'))
  if (favorites && favorites.length == MAX_FAVORITES_COUNT) {
    return
  }
  
  if (favorites && id) {
    favorites.push(id)
    window.localStorage.setItem('favorites', JSON.stringify(favorites))
  } else if (id) {
    window.localStorage.setItem('favorites', JSON.stringify([id]))
  }


  drawMenu()
}


function getRecents() {
  var recents = JSON.parse(window.localStorage.getItem('recents'))
  console.log(recents)
  if (recents) {
    return recents.map((id) => HIVE_APPS[id])
  }
  return []
}


function updateRecents(id) {
  var recents = JSON.parse(window.localStorage.getItem('recents'))
  if (recents) {
    recents.unshift(id)
    recents.slice(0, MAX_RECENTS_COUNT) // only store MAX_RECENTS_COUNT most recent
    window.localStorage.setItem('recents', JSON.stringify(recents))
  } else {
    window.localStorage.setItem('recents', JSON.stringify([id]))
  }

  drawMenu()
}


function handleClickButton(e) {
  if (typeof e.target.value !== 'undefined' && e.target.value != "") {
   chrome.runtime.sendMessage({
       url: e.target.value
     })
  }
}

function handleClickAnchor(e) {
  if (typeof e.target.href !== 'undefined' && e.target.href != "") {
    updateRecents(e.target.id)
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





// enable popovers everywhere
$(function () {
  $('[data-toggle="popover"]').popover()
})
$('.popover-dismiss').popover({
  trigger: 'focus'
})



drawMenu()