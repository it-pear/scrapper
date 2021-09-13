const puppeteer = require('puppeteer');
const cheerio = require('cheerio');



async function scrape(port, url) {
  const browser = await puppeteer.launch({
    args: ['--proxy-server=socks5://127.0.0.1:' + port]
  });

  const page = await browser.newPage();
  console.log(url + ' ' + port);
  const yandex = `https://yandex.ru/images/search?text=${url}`;
  const encodedURI = encodeURI(yandex);
  await page.goto(encodedURI);
  const content = await page.content();
  
  const $ = cheerio.load(content);
  
  const photos = [];
  $('.serp-item img').slice(0, 5).each((i, el) => {
    const img = $(el);
    photos.push(img.attr('src'));
  });

  browser.close();
  return photos;
}

async function main() {
  /**
   * Номера SOCKS-портов Tor, заданные в файле torrc. 
   */
  const ports = [
    '9050',
    '9052',
    '9053',
    '9054'
  ];
  
  const urls = [
    'Защелка магнитная AVERS 5800-M-NIS матовый хром',
    'презерватив',
    'сиськи',
    'пися',
    'попа',
    'анус женщины'
  ];
  let number = ports.length;
  console.log(number);
  var i = 0;
 
  for (const url of urls) {
    
    let urlafter = url.replace(/ /g, '%20');
    
    console.log(i + 1);
    if (i > number - 1) {
      i = 0;
    }
    /**
     * ...каждый раз - с новым номером порта.
     */
    console.log(await scrape(ports[i], urlafter));
    i++;
    
  }
 
}

main();