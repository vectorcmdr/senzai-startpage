let saved_config = JSON.parse(localStorage.getItem("CONFIG"));

const default_config = {
  overrideStorage: true, // override localStorage with fixed userconfig values

  disabled: [],

  // Counter Language Styles:
  // Numeric: decimal, decimal-leading-zero, arabic-indic, armenian, upper-armenian, lower-armenian, bengali, cambodian, khmer, cjk-decimal, devanagari, georgian, gujarati, gurmukhi, hebrew, kannada, lao, malayalam, mongolian, myanmar, oriya, persian, lower-roman, upper-roman, tamil, telugu, thai, tibetan
  // Alphabetic: lower-alpha, lower-latin, upper-alpha, upper-latin, lower-greek, hiragana, hiragana-iroha, katakana, katakana-iroha
  // Symbolic: disc, circle, square, disclosure-open, disclosure-closed
  // Fixed: cjk-earthly-branch, cjk-heavenly-stem
  // JP: japanese-informal and japanese-formal
  // KR: korean-hangul-formal, korean-hanja-informal, and korean-hanja-formal
  // CH: simp-chinese-informal, simp-chinese-formal, trad-chinese-informal, and trad-chinese-formal
  // ET: ethiopic-numeric
  statusbar:{
    tabslang: 'cjk-decimal'
  },
  temperature: {
    location: 'Belconnen, ACT',
    scale: 'C'
  },
  clock: {
    format: 'h:i p',
    iconColor: 'var(--icon-clock)'
  },
  currencyconv: {
      base: 'AUD',
      baseamount: '1',
      curone: 'USD',
      curoneglyph: '$',
      curtwo: 'JPY',
      curtwoglyph: '¥',
      url: 'https://www.google.com/finance/markets/currencies'
  },
  calendar: {
      url: 'https://calendar.google.com'
  },
  search: {
    engines: {
      g: ['https://google.com/search?q=', 'Google'],
      d: ['https://duckduckgo.com/html?q=', 'DuckDuckGo'],
      y: ['https://youtube.com/results?search_query=', 'Youtube'],
      w: ['https://en.wikipedia.org/w/index.php?search=', 'Wikipedia']
    }
  },
  keybindings: {
    "t": 'todo-list',
    "s": 'search-bar',
    "c": "config-editor",
  },  
  openLastVisitedTab: false,
  // For icon names, see: https://tabler.io/icons
  tabs: [
    {
      name: 'Daily',
      background_url: 'src/img/banners/pop_culture/eva_01.gif',
      move: '54% 0%',
      scale: '0',
      categories: [{
        name: 'Work',
        links: [
          {
            name: 'GitHub',
            url: 'https://github.com',
            icon: 'brand-github'
          },
          {
            name: 'Unity Publishing',
            url: 'https://publisher.unity.com',
            icon: 'brand-unity',
            icon_color: '#f5f5ef'
          },
          {
            name: 'Trello',
            url: 'https://trello.com',
            icon: 'brand-trello',
            icon_color: '#80dfef'
          },
          {
              name: 'Unity Hub',
              url: 'unityhub://open',
              icon: 'brand-unity',
              icon_color: '#f5f5ef'
            },
          {
            name: 'Drive',
            url: 'https://drive.google.com',
            icon: 'brand-google-drive',
            icon_color: '#b9e48b'
          },
          {
            name: 'Gmail',
            url: 'https://gmail.com',
            icon: 'brand-gmail',
            icon_color: '#fdac72'
          },
          {
            name: 'Discord',
            url: 'discord://open/',
            icon: 'brand-discord',
            icon_color: '#c5b4f8'
          }
        ]
      },
      {
        name: 'Bookmarks',
        links: [
          {
            name: 'Raindrop',
            url: 'https://app.raindrop.io',
            icon: 'filters',
            icon_color: '#a5f2e3'
          },
          {
            name: 'ebay',
            url: 'https://www.ebay.com.au/sh/ovw',
            icon: 'shopping-bag',
            icon_color: '#f9e18b'
          }
        ]
      }
      ]
    },
    {
      name: 'dev',
      background_url: 'src/img/banners/pop_culture/gits_03.gif',
      move: '0',
      scale: '0',
      categories: [
        {
          name: 'Workspace',
          links: [
            {
              name: 'GitHub',
              url: 'https://github.com',
              icon: 'brand-github'
            },
            {
              name: 'Trello',
              url: 'https://trello.com',
              icon: 'brand-trello',
              icon_color: '#80dfef'
            },
            {
              name: 'Unity Hub',
              url: 'unityhub://open',
              icon: 'brand-unity',
              icon_color: '#f5f5ef'
            },
            {
              name: 'ImHex',
              url: 'https://web.imhex.werwolv.net/',
              icon: 'file-digit',
              icon_color: '#80dfef'
            },
            {
              name: 'Photopea',
              url: 'https://www.photopea.com/',
              icon: 'brush',
              icon_color: '#b9e48b'
            }
          ]
        },
        {
          name: 'docs & news',
          links: [
            {
              name: 'Unity API Docs',
              url: 'https://docs.unity3d.com/ScriptReference/index.html',
              icon: 'brand-unity',
              icon_color: '#f5f5ef'
            },
            {
              name: 'Unity Discussions',
              url: 'https://discussions.unity.com/',
              icon: 'brand-unity',
              icon_color: '#f5f5ef'
            },
            {
              name: 'stackoverflow',
              url: 'https://stackoverflow.com/questions',
              icon: 'brand-stackoverflow',
              icon_color: '#fdac72'
            },
            {
              name: 'r/Unity3D/',
              url: 'https://www.reddit.com/r/Unity3D/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/programming',
              url: 'https://www.reddit.com/r/programming/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/startpages/',
              url: 'https://www.reddit.com/r/startpages/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/low_poly',
              url: 'https://www.reddit.com/r/low_poly/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'Hacker News',
              url: 'https://news.ycombinator.com/',
              icon: 'brand-ycombinator',
              icon_color: '#fdac72'
            } 
          ]
        },
        {
          name: '3D Printing',
          links: [
            {
              name: 'Thingiverse',
              url: 'https://www.thingiverse.com/',
              icon: 'brand-thingiverse',
              icon_color: '#49d1e9'
            },
            {
              name: 'Cults',
              url: 'https://cults3d.com/',
              icon: 'badge-3d',
              icon_color: '#9a7cf3'
            },
            {
              name: 'MyMiniFactory',
              url: 'https://www.myminifactory.com/',
              icon: 'square-letter-m',
              icon_color: '#6febd3'
            },
            {
              name: 'Maker World',
              url: 'https://makerworld.com/en',
              icon: 'cube',
              icon_color: '#b9e48b'
            }
          ]
        }
      ]
    },
    {
      name: 'chill',
      background_url: 'src/img/banners/pop_culture/beebop_02.gif',
      move: '0',
      scale: '0',
      categories: [
        {
          name: 'audio',
          links: [
            {
              name: 'musicForProgramming();',
              url: 'https://musicforprogramming.net',
              icon: 'music-code',
              icon_color: '#b9e48b'
            },
            {
              name: 'Nightwave Plaza',
              url: 'https://plaza.one/',
              icon: 'user-pentagon',
              icon_color: '#c5b4f8'
            },
            {
              name: 'myNoise',
              url: 'https://mynoise.net/',
              icon: 'chart-area-line',
              icon_color: '#f5f5ef'
            },
            {
              name: 'YouTube Music',
              url: 'youtubemusic://open/',
              icon: 'brand-youtube',
              icon_color: '#ff2d5e'
            },
            {
              name: 'Sound Cloud',
              url: 'https://soundcloud.com/',
              icon: 'brand-soundcloud',
              icon_color: '#fdac72'
            }
          ]
        },
        {
          name: 'video',
          links: [
            {
              name: 'FreeTube',
              url: 'freetube://open/',
              icon: 'device-tv',
              icon_color: '#80dfef'
            },
            {
              name: 'YouTube',
              url: 'https://youtu.be/',
              icon: 'brand-youtube',
              icon_color: '#ff2d5e'
            }
          ]
        }
      ]
    },
    {
      name: 'hobby',
      background_url: 'src/img/banners/pop_culture/eva_04.gif',
      move: '70%',
      scale: '0',
      categories: [
        {
          name: 'LEGO',
          links: [
            {
              name: 'Rebrickable',
              url: 'https://rebrickable.com',
              icon: 'wall',
              icon_color: '#f9e18b'
            },
            {
              name: 'Bricklink',
              url: 'https://www.bricklink.com',
              icon: 'cube',
              icon_color: '#f9e18b'
            },
            {
              name: 'LEGO.com',
              url: 'https://www.lego.com',
              icon: 'lego',
              icon_color: '#f9e18b'
            },
            {
              name: 'LEGO Insiders',
              url: 'https://www.lego.com/en-au/insiders/rewards?icmp=LP-SHQL-Standard-NO_QL_Insiders_Rewards_LP-P-NO-8L4YEGC02A',
              icon: 'lego',
              icon_color: '#f9e18b'
            },
            {
              name: 'r/lego',
              url: 'https://www.reddit.com/r/lego/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/LegoLeak',
              url: 'https://www.reddit.com/r/Legoleak/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
          ]
        },
        {
          name: 'Gaming',
          links: [
            {
              name: 'Steam',
              url: 'steam://open/',
              icon: 'brand-steam'
            },
            {
              name: 'Steam Store',
              url: 'https://store.steampowered.com/',
              icon: 'brand-steam'
            },
            {
              name: 'Steam Workshop',
              url: 'https://steamcommunity.com/id/vector_cmdr/myworkshopfiles/',
              icon: 'brand-steam'
            },
            {
              name: 'Star Rail (Prydwen)',
              url: 'https://www.prydwen.gg/star-rail/',
              icon: 'train',
              icon_color: '#ff93fa'
            },
            {
              name: 'Warmane',
              url: 'https://www.warmane.com/',
              icon: 'swords',
              icon_color: '#fdac72'
            },
            {
              name: 'TGA Rumor Thread',
              url: 'https://www.tga.community/forums/topic/22826-the-rumour-thread/?page=6742',
              icon: 'axe',
              icon_color: '#f9e18b'
            }
          ]
        },
        {
          name: 'Fossil Hunting',
          links: [
            {
              name: 'The Fossil Forum',
              url: 'https://www.thefossilforum.com/',
              icon: 'fish-bone'
            },
            {
              name: 'mindat',
              url: 'https://www.mindat.org/loc-66.html#autoanchor5',
              icon: 'pick'
            },
            {
              name: 'Canberra Geo Map',
              url: 'https://gmaps.geoscience.nsw.gov.au/100K/Canberra/',
              icon: 'map-route',
              icon_color: '#a5f2e3'
            },
            {
              name: 'r/FossilHunting',
              url: 'https://www.reddit.com/r/FossilHunting/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/FossilID',
              url: 'https://www.reddit.com/r/fossilid/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/Fossils',
              url: 'https://www.reddit.com/r/fossils/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'r/FossilPorn',
              url: 'https://www.reddit.com/r/FossilPorn/',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
          ]
        }
      ]
    },
    {
      name: 'social',
      background_url: 'src/img/banners/pop_culture/beebop_01.gif',
      move: '0',
      scale: '0',
      categories: [
        {
          name: 'social media',
          links: [
            {
              name: 'Reddit',
              url: 'https://rebrickable.com',
              icon: 'brand-reddit',
              icon_color: '#fc8936'
            },
            {
              name: 'Bluesky',
              url: 'https://bsky.app',
              icon: 'brand-bluesky',
              icon_color: '#49d1e9'
            },
            {
              name: 'Instagram',
              url: 'https://www.instagram.com/',
              icon: 'brand-instagram',
              icon_color: '#fdac72'
            },
            {
              name: 'Discord',
              url: 'discord://open/',
              icon: 'brand-discord',
              icon_color: '#c5b4f8'
            }
          ]
        },
      ]
    },
    ]
};

const CONFIG = new Config(saved_config ?? default_config);
// const CONFIG = new Config(default_config);