
HIVE_APPS = {

// blogging
  peakd:         {name: 'PeakD', icon: '', url: 'https://peakd.com/', description: 'The intuitive way to experience everything HIVE'},
  'hive.blog':   {name: 'Hive.blog', icon: '', url: 'https://hive.blog/', description: ''},
  leofinance:    {name: 'LeoFinance', icon: '', url: 'https://leofinance.io/', description: ''},
  ecency:        {name: 'Ecency', icon: '', url: 'https://ecency.com/', description: ''},

// gaming
  brosino:       {name: 'BROsino', icon: '', url: '', description: ''},
  dcity:         {name: 'dCity', icon: '', url: '', description: ''},
  exode:         {name: 'EXODE', icon: '', url: '', description: ''},
  holybread:     {name: 'Holybread', icon: '', url: 'https://www.holybread.io/', description: ''},
  splinterlands: {name: 'Splinterlands', icon: '', url: '', description: ''},
  
// shopping
  hivelist:      {name: 'HiveList', icon: '', url: 'https://hivelist.io/', description: 'HiveCommerce marketplace community'},
  hiveswag:      {name: 'HiveSwag', icon: '', url: 'https://hiveswag.io/', description: ''},
  myhiveswag:    {name: 'My Hive Swag', icon: '', url: 'https://myhiveswag.store/', description: ''},
  
// art
  lensykey:      {name: 'Lensy', icon: '', url: '', description: ''},
  nftshowroom:   {name: 'NFTShowroom', icon: '', url: 'https://nftshowroom.com/',  description: 'Collectible, scarce, tokenized art'},

// utilities  
  hiveblocks:    {name: 'Hiveblocks', icon: '', url: 'https://hiveblocks.com/', description: 'Hive block explorer tool'},
  hivestats:     {name: 'HiveStats', icon: '', url: 'https://hivestats.io', description: ''},
  'hive-engine': {name: 'Hive Engine', icon: '', url: 'https://hive-engine.com/', description: ''},
  hivesearcher:  {name: 'Hivesearcher', icon: '', url: 'https://hivesearcher.com/', description: 'Search engine for Hive content'},
  hivetasks:     {name: 'HiveTasks', icon: '', url: 'https://hivetasks.com/', description: ''},

// null
  null:          {name: '', icon: '', url: '', description: ''},

}

FAVORITE_APPS = []

RECENT_APPS = []


function drawMenu() {

  // data
  var data = {categories: [ 
    {name: 'Favorites', apps: [HIVE_APPS['null']]},
    {name: 'Recents',   apps: [HIVE_APPS['null']]},
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