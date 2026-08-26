const map = L.map('map', {
  zoomControl: true,
  minZoom: 6.6,
  maxZoom: 10,
  zoomSnap: 0.25
}).setView([-8.35, -37.9], 7.2);

const pernambucoBounds = L.latLngBounds([
  [-9.75, -41.4],
  [-7.05, -34.6]
]);

map.setMaxBounds(pernambucoBounds);
map.on('drag', () => map.panInsideBounds(pernambucoBounds, { animate: false }));

const geojsonUrl = 'https://cdn.jsdelivr.net/gh/henriquemalvar/br-geojson@main/dist/municipios/PE.geojson';

const cultureData = {
  'Recife': {
    intro: 'Capital pernambucana, marcada por forte diversidade cultural e pelo encontro entre tradições populares, produção artística contemporânea e patrimônio histórico.',
    manifestations: 'Frevo, maracatu-nação, maracatu de baque solto, caboclinhos e blocos carnavalescos.',
    music: 'Frevo, manguebeat, maracatu e outras expressões da música pernambucana.',
    food: 'Bolo de rolo, tapioca, caldinhos, frutos do mar e pratos com mandioca e carne de sol.',
    craft: 'Peças ligadas ao carnaval, xilogravura, renda e artesanato popular.',
    highlight: 'Destaque: o Carnaval do Recife é um dos grandes símbolos culturais da cidade, especialmente pelas apresentações de frevo e maracatu.'
  },
  'Olinda': {
    intro: 'Cidade histórica reconhecida pela arquitetura colonial, pelas ladeiras e por uma das festas de Carnaval mais tradicionais do Brasil.',
    manifestations: 'Bonecos gigantes, maracatu, caboclinhos, afoxés e blocos tradicionais.',
    music: 'Frevo de rua, maracatu e bandas que ocupam as ladeiras durante o Carnaval.',
    food: 'Tapioca, bolo de rolo, quitutes regionais e culinária típica pernambucana.',
    craft: 'Cerâmica, xilogravura, pintura, esculturas e produção artística nos ateliês do Sítio Histórico.',
    highlight: 'Destaque: o conjunto arquitetônico e paisagístico de Olinda é patrimônio cultural de enorme importância para Pernambuco.'
  },
  'Caruaru': {
    intro: 'Um dos principais polos culturais do Agreste, especialmente conhecido pelas tradições juninas, pelo artesanato e pela música regional.',
    manifestations: 'Festas juninas, quadrilhas, bacamarteiros, pífanos e cultura popular do Agreste.',
    music: 'Forró, baião, xote, xaxado e apresentações tradicionais ligadas ao São João.',
    food: 'Comidas de milho, pamonha, canjica, mungunzá, bolo de milho e carne de sol.',
    craft: 'Barro e cerâmica figurativa, com destaque para a tradição da produção artesanal do Alto do Moura.',
    highlight: 'Destaque: o São João de Caruaru é uma das festas juninas mais conhecidas do país.'
  },
  'Garanhuns': {
    intro: 'Conhecida pelo clima de serra e por sua forte programação cultural, a cidade se tornou referência em festivais no Agreste Meridional.',
    manifestations: 'Festivais culturais, apresentações de artes cênicas, literatura e manifestações populares.',
    music: 'Música popular brasileira, regional e atrações nacionais durante festivais.',
    food: 'Queijos, cafés, doces, pratos regionais e produtos da agricultura de clima mais ameno.',
    craft: 'Artesanato regional, trabalhos em madeira, tecido e produtos decorativos.',
    highlight: 'Destaque: o Festival de Inverno de Garanhuns consolidou a cidade como um importante polo cultural de Pernambuco.'
  },
  'Petrolina': {
    intro: 'Polo cultural do Sertão do São Francisco, com identidade fortemente relacionada ao rio, à fruticultura irrigada e às tradições sertanejas.',
    manifestations: 'Festas tradicionais, vaquejada, celebrações religiosas e eventos culturais do Vale do São Francisco.',
    music: 'Forró, vaquejada, música sertaneja e artistas ligados à tradição nordestina.',
    food: 'Carne de bode, comidas sertanejas, frutas produzidas na região e culinária à base de peixe do São Francisco.',
    craft: 'Artesanato em madeira, couro, fibras e trabalhos inspirados na paisagem sertaneja.',
    highlight: 'Destaque: a relação cultural com o Rio São Francisco é uma das marcas mais fortes de Petrolina.'
  },
  'Goiana': {
    intro: 'Município da Zona da Mata Norte com tradições populares muito fortes e ligação histórica com manifestações carnavalescas e religiosas.',
    manifestations: 'Maracatu de baque solto, caboclinhos, blocos e manifestações religiosas.',
    music: 'Maracatu, ciranda, coco e ritmos tradicionais da Mata Norte.',
    food: 'Culinária de tradição da Zona da Mata e preparações com mandioca, coco e frutos do mar.',
    craft: 'Artesanato popular, instrumentos e elementos visuais ligados às manifestações culturais.',
    highlight: 'Destaque: Goiana é um dos municípios importantes para compreender a força da cultura popular da Mata Norte.'
  },
  'Igarassu': {
    intro: 'Cidade histórica da Região Metropolitana do Recife, marcada por igrejas antigas, patrimônio colonial e tradições populares.',
    manifestations: 'Maracatus, caboclinhos, blocos carnavalescos e festas religiosas.',
    music: 'Frevo, maracatu, coco e outros ritmos populares de Pernambuco.',
    food: 'Peixes, mariscos, frutos do mar, tapioca e pratos regionais.',
    craft: 'Artesanato popular, cerâmica e trabalhos ligados ao patrimônio local.',
    highlight: 'Destaque: o patrimônio histórico de Igarassu ajuda a contar a formação cultural de Pernambuco.'
  },
  'Vitória de Santo Antão': {
    intro: 'Município da Mata Sul com forte tradição em festas populares, cultura religiosa e produção cultural regional.',
    manifestations: 'Carnaval, festas religiosas, quadrilhas e grupos de cultura popular.',
    music: 'Frevo, forró, coco e música popular pernambucana.',
    food: 'Culinária regional baseada em mandioca, milho, carne e doces tradicionais.',
    craft: 'Artesanato em madeira, tecido, palha e objetos decorativos.',
    highlight: 'Destaque: as festas populares ajudam a manter vivas as tradições comunitárias do município.'
  },
  'Triunfo': {
    intro: 'Cidade serrana do Sertão do Pajeú, conhecida pelo patrimônio histórico, pelo clima ameno e por manifestações culturais tradicionais.',
    manifestations: 'Careta do Carnaval, festas religiosas e tradições populares do Pajeú.',
    music: 'Forró, xote, baião e música tradicional sertaneja.',
    food: 'Doces, queijos, comidas sertanejas e preparações com milho e mandioca.',
    craft: 'Artesanato regional, trabalhos em palha, madeira e tecidos.',
    highlight: 'Destaque: a tradição dos Caretas de Triunfo é uma das manifestações populares mais características do Sertão pernambucano.'
  },
  'Serra Talhada': {
    intro: 'Importante cidade do Sertão do Pajeú, associada à cultura sertaneja, ao xaxado e à memória de Lampião e do cangaço.',
    manifestations: 'Xaxado, festas religiosas, eventos sobre memória sertaneja e cultura popular.',
    music: 'Forró, xaxado, baião e outros ritmos sertanejos.',
    food: 'Carne de bode, carne de sol, comidas de milho e preparações típicas do Sertão.',
    craft: 'Couro, madeira, palha e peças inspiradas na identidade sertaneja.',
    highlight: 'Destaque: a memória do cangaço e do xaxado ocupa um espaço importante na identidade cultural local.'
  },
  'Pesqueira': {
    intro: 'Município do Agreste pernambucano conhecido por manifestações indígenas, festas tradicionais e produção cultural popular.',
    manifestations: 'Carnaval, tradições indígenas, festas religiosas e grupos de cultura popular.',
    music: 'Forró, coco, ciranda e ritmos regionais.',
    food: 'Comidas de milho, mandioca, carnes e doces regionais.',
    craft: 'Artesanato popular, bordados, tecidos e peças decorativas.',
    highlight: 'Destaque: as tradições indígenas e populares fazem parte da diversidade cultural de Pesqueira.'
  },
  'Arcoverde': {
    intro: 'Polo cultural do Sertão do Moxotó, com destaque para festas juninas e manifestações populares.',
    manifestations: 'São João, reisado, grupos populares e festas religiosas.',
    music: 'Forró, baião, xote, coco e ritmos sertanejos.',
    food: 'Mungunzá, canjica, pamonha, carne de bode e outras comidas sertanejas.',
    craft: 'Artesanato em madeira, tecido, palha e produtos ligados às festas populares.',
    highlight: 'Destaque: as festas juninas são uma das principais vitrines da cultura popular de Arcoverde.'
  },
  'Gravatá': {
    intro: 'Cidade do Agreste bastante conhecida pelo turismo, pelo artesanato e por eventos sazonais.',
    manifestations: 'Festas juninas, eventos culturais e tradições religiosas.',
    music: 'Forró e música regional durante as festividades locais.',
    food: 'Queijos, doces, carnes, fondue e produtos ligados ao turismo gastronômico.',
    craft: 'Móveis artesanais, madeira, tecidos e decoração.',
    highlight: 'Destaque: o artesanato e o turismo cultural são importantes para a identidade contemporânea de Gravatá.'
  },
  'Jaboatão dos Guararapes': {
    intro: 'Município da Região Metropolitana do Recife com patrimônio histórico, tradições religiosas e forte vida cultural urbana.',
    manifestations: 'Festas religiosas, Carnaval, manifestações populares e eventos comunitários.',
    music: 'Frevo, maracatu, coco, música urbana e outros ritmos pernambucanos.',
    food: 'Frutos do mar, tapioca, pratos regionais e culinária metropolitana.',
    craft: 'Artesanato popular, trabalhos em tecido, madeira e materiais reciclados.',
    highlight: 'Destaque: o município reúne patrimônio histórico e expressões culturais contemporâneas da Região Metropolitana.'
  },
  'Cabo de Santo Agostinho': {
    intro: 'Município litorâneo com praias, patrimônio histórico e tradições relacionadas à cultura popular e marítima.',
    manifestations: 'Carnaval, festas religiosas e manifestações culturais locais.',
    music: 'Frevo, coco, ciranda e música popular pernambucana.',
    food: 'Peixes, mariscos, frutos do mar e pratos à base de coco.',
    craft: 'Artesanato com fibras, madeira, cerâmica e materiais ligados ao litoral.',
    highlight: 'Destaque: a combinação entre patrimônio, litoral e cultura popular marca a identidade do Cabo.'
  }
};

const sesiUnitsByCity = {
  'Araripina': ['Escola SESI Araripina'],
  'Belo Jardim': ['Escola SESI Belo Jardim'],
  'Cabo de Santo Agostinho': ['Escola SESI Cabo de Santo Agostinho'],
  'Camaragibe': ['Escola SESI Camaragibe'],
  'Caruaru': ['Escola SESI Caruaru'],
  'Escada': ['Escola SESI Escada'],
  'Goiana': ['Escola SESI Goiana'],
  'Moreno': ['Escola SESI Moreno (A MAIOR E MELHOR DE TODAS!)'],
  'Paulista': ['Escola SESI Paulista'],
  'Petrolina': ['Escola SESI Petrolina'],
  'Recife': ['Escola SESI Ibura', 'Escola SESI Vasco da Gama']
};

const sesiCities = new Set(Object.keys(sesiUnitsByCity));
const foundSesiCities = new Set();
let completionShown = false;


let geoLayer;
let selectedLayer = null;
let municipalities = [];

const sesiTotal = sesiCities.size;


const normalStyle = {
  color: '#fff',
  weight: 1,
  fillColor: '#171aa6',
  fillOpacity: 0.83
};

const hoverStyle = {
  color: '#063b74',
  weight: 2,
  fillColor: '#2f86dc',
  fillOpacity: 0.97
};

const selectedStyle = {
  color: '#ffffff',
  weight: 3,
  fillColor: '#063b74',
  fillOpacity: 1
};

function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getRegion(name) {
  const n = normalize(name);
  if (/recife|olinda|jaboatao|igarassu|paulista|abreu e lima|camaragibe|cabo de santo agostinho|sao lourenco da mata|moreno|ipojuca|itamaraca|itapissuma/.test(n)) return 'Região Metropolitana';
  if (/goiana|carpina|nazare da mata|timbauba|tracunhaem|alianca|escada|ribeirao|palmares|barreiros|sirinhaem|tamandare/.test(n)) return 'Zona da Mata';
  if (/petrolina|salgueiro|serra talhada|triunfo|arcoverde|floresta|petrolandia|ouricuri|araripina|belem do sao francisco|afogados da ingazeira|custodia/.test(n)) return 'Sertão';
  return 'Agreste';
}

const regionalProfiles = {
  'Região Metropolitana': {
    intros: ['Na Região Metropolitana, a cultura mistura tradições populares, vida urbana e patrimônio histórico.', 'A vida cultural do município combina festas, manifestações populares e referências históricas do cotidiano.', 'Entre áreas urbanas e tradições antigas, o município mantém uma cena cultural ligada às festas e aos costumes pernambucanos.'],
    manifestations: ['Carnaval, festas religiosas, blocos e manifestações populares aparecem ao longo do ano.', 'Festas de bairro, celebrações religiosas e eventos do calendário popular fazem parte da vida local.', 'O calendário cultural reúne festas tradicionais, encontros comunitários e manifestações populares.'],
    music: ['Frevo, maracatu, coco e outros ritmos pernambucanos aparecem nas festas e apresentações locais.', 'A música local conversa com frevo, maracatu, coco e outras sonoridades da Região Metropolitana.', 'Os ritmos pernambucanos continuam presentes em festas, blocos e eventos culturais da cidade.'],
    food: ['Tapioca, bolos, frutos do mar e pratos do cotidiano pernambucano aparecem na mesa local.', 'A culinária reúne receitas com mandioca, coco, peixes e doces.', 'Comida de feira, tapioca, preparos com coco e pratos ligados ao litoral fazem parte dos sabores da região.'],
    craft: ['Artesanato em madeira, tecido, cerâmica e materiais reaproveitados aparece em feiras e espaços culturais.', 'Peças decorativas, trabalhos manuais e artesanato popular ajudam a manter saberes tradicionais.', 'Feiras e mercados costumam reunir trabalhos em madeira, tecido, cerâmica e outros materiais.']
  },
  'Zona da Mata': {
    intros: ['Na Zona da Mata, a cultura local guarda uma forte presença de festas populares, música e tradições passadas entre gerações.', 'O município faz parte de uma região onde maracatu, ciranda, coco e festas tradicionais ainda têm bastante espaço.', 'A identidade cultural da cidade se relaciona com as tradições da Mata Norte e da Mata Sul e com a vida comunitária.'],
    manifestations: ['Maracatu de baque solto, caboclinhos, ciranda e festas religiosas são referências da região.', 'Blocos, maracatus, festas religiosas e outras manifestações populares marcam o calendário local.', 'Festas tradicionais e grupos de cultura popular ajudam a manter costumes antigos vivos no município.'],
    music: ['Maracatu, ciranda, coco e forró aparecem entre os ritmos mais ligados à tradição da região.', 'As festas locais costumam abrir espaço para ciranda, coco, maracatu e forró.', 'A música popular pernambucana ocupa lugar de destaque nas celebrações e eventos da cidade.'],
    food: ['Mandioca, milho, coco, doces e preparos caseiros aparecem entre os sabores mais comuns da região.', 'A cozinha local mantém receitas com milho, mandioca, coco, carnes e doces tradicionais.', 'Receitas de família e comida de feira ajudam a formar os sabores do município.'],
    craft: ['Trabalhos com madeira, tecido, palha e barro aparecem entre as formas de artesanato da região.', 'O artesanato local reúne peças simples, decorativas e ligadas às manifestações culturais.', 'Feiras e espaços comunitários ajudam a circular peças produzidas por artesãos da região.']
  },
  'Agreste': {
    intros: ['No Agreste, a cultura do município aparece muito ligada às festas, à música regional, às feiras e ao artesanato.', 'A cidade faz parte de uma região marcada por festas populares, comércio de feira e tradições mantidas pelas comunidades.', 'A vida cultural local reúne costumes do Agreste, festas tradicionais e manifestações que atravessam gerações.'],
    manifestations: ['São João, quadrilhas, festas religiosas e encontros comunitários costumam movimentar o calendário cultural.', 'Festas juninas, feiras culturais e celebrações religiosas fazem parte das tradições locais.', 'O calendário da cidade ganha força com festas populares, quadrilhas e eventos comunitários.'],
    music: ['Forró, baião, xote, xaxado e outros ritmos regionais aparecem nas festas e encontros do município.', 'As festas locais costumam ter espaço para forró, xote, baião e outros ritmos nordestinos.', 'A música regional continua presente em festas juninas, eventos públicos e celebrações.'],
    food: ['Pamonha, canjica, mungunzá, bolo de milho, carne de sol e outros pratos do Agreste são comuns na região.', 'Milho, mandioca, carnes e doces tradicionais aparecem com frequência nas receitas locais.', 'A comida de feira e os pratos feitos com milho e mandioca ajudam a marcar a cozinha da cidade.'],
    craft: ['Cerâmica, madeira, couro, tecido e outros trabalhos manuais aparecem em feiras e mercados.', 'O artesanato reúne peças utilitárias e decorativas produzidas por artesãos locais.', 'Feiras e mercados são espaços importantes para a circulação de peças e trabalhos manuais.']
  },
  'Sertão': {
    intros: ['No Sertão, a cultura do município mantém uma ligação forte com a música, as festas, a memória local e o cotidiano sertanejo.', 'A cidade faz parte de uma região onde festas, religiosidade e tradições sertanejas ocupam um espaço importante.', 'A identidade cultural local reúne costumes sertanejos, celebrações e formas de expressão presentes no município.'],
    manifestations: ['Festas religiosas, vaquejadas, eventos comunitários e tradições sertanejas aparecem no calendário local.', 'Celebrações religiosas e festas tradicionais reúnem moradores durante o ano.', 'Eventos populares e festas de tradição sertaneja ajudam a manter a memória cultural da cidade.'],
    music: ['Forró, baião, xote, xaxado e música sertaneja fazem parte da paisagem cultural da região.', 'Forró e outros ritmos nordestinos costumam acompanhar festas e encontros da cidade.', 'A música regional aparece nas festas, nas feiras e nas celebrações comunitárias.'],
    food: ['Carne de bode, carne de sol, milho, mandioca e outros preparos sertanejos estão entre os sabores locais.', 'A culinária valoriza carnes, milho, mandioca, feijão e receitas simples do cotidiano sertanejo.', 'Pratos caseiros e comidas de feira ajudam a preservar hábitos alimentares da região.'],
    craft: ['Couro, madeira, palha e tecido aparecem em peças artesanais produzidas na região.', 'O artesanato local traz trabalhos manuais ligados ao cotidiano e às tradições sertanejas.', 'Peças de couro, madeira e fibras aparecem em feiras, mercados e eventos culturais.']
  }
};

function pickVariation(items, name, offset = 0) {
  const value = [...normalize(name)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return items[(value + offset) % items.length];
}

function buildRegionalProfile(name) {
  const region = getRegion(name);
  const profile = regionalProfiles[region];

  return {
    intro: pickVariation(profile.intros, name),
    manifestations: pickVariation(profile.manifestations, name, 1),
    music: pickVariation(profile.music, name, 2),
    food: pickVariation(profile.food, name, 3),
    craft: pickVariation(profile.craft, name, 4),
    highlight: `${name} faz parte do ${region.toLowerCase()}, onde essas tradições ganham formas diferentes de acordo com a história e a rotina de cada município.`,
    source: ''
  };
}

function registerSesiDiscovery(name) {
  if (!sesiCities.has(name)) return;

  foundSesiCities.add(name);
  updateSesiCounter();

  if (foundSesiCities.size === sesiTotal && !completionShown) {
    completionShown = true;
    setTimeout(showCompletionModal, 350);
  }
}

function updateSesiCounter() {
  document.getElementById('sesiFoundCount').textContent = foundSesiCities.size;
  document.getElementById('sesiTotalCount').textContent = sesiTotal;
  document.getElementById('sesiCounter').classList.toggle('complete', foundSesiCities.size === sesiTotal);
}

function showCompletionModal() {
  document.getElementById('completionModal').classList.remove('hidden');
}

function closeCompletionModal() {
  document.getElementById('completionModal').classList.add('hidden');
}

function showCity(name, data, layer = null) {
  if (selectedLayer && selectedLayer !== layer) selectedLayer.setStyle(normalStyle);

  if (layer) {
    layer.setStyle(selectedStyle);
    selectedLayer = layer;
  }

  registerSesiDiscovery(name);

  if (activeTimedChallenge) {
    handleTimedChallengeCity(name);
    return;
  }

  openCityModal();
  setModalLoading(name);

  const city = data || cultureData[name] || buildRegionalProfile(name);
  cultureData[name] = city;
  fillModal(name, city);
}

function setModalLoading(name) {
  document.getElementById('cityName').textContent = name;
  document.getElementById('cityRegion').textContent = getRegion(name);
  document.getElementById('cityIntro').textContent = 'Carregando informações…';
  document.getElementById('cultureManifestations').textContent = 'Preparando conteúdo…';
  document.getElementById('cultureMusic').textContent = 'Preparando conteúdo…';
  document.getElementById('cultureFood').textContent = 'Preparando conteúdo…';
  document.getElementById('cultureCraft').textContent = 'Preparando conteúdo…';
  document.getElementById('cultureHighlight').textContent = '';
}

function fillModal(name, city) {
  document.getElementById('cityName').textContent = name;
  document.getElementById('cityRegion').textContent = getRegion(name);
  document.getElementById('cityIntro').textContent = city.intro;

  document.getElementById('cultureManifestations').textContent = city.manifestations;
  document.getElementById('cultureMusic').textContent = city.music;
  document.getElementById('cultureFood').textContent = city.food;
  document.getElementById('cultureCraft').textContent = city.craft;
  document.getElementById('cultureHighlight').textContent = city.highlight;

  const sesiNotice = document.getElementById('sesiNotice');

  if (sesiUnitsByCity[name]) {
    const units = sesiUnitsByCity[name];
    sesiNotice.classList.remove('hidden');

    if (units.length > 1) {
      if (name === 'Moreno') {
        sesiNotice.innerHTML = `<strong>Grande achado! Moreno possui uma unidade do SESI.</strong><span>É apresentada aqui como a maior e melhor unidade do SESI de todas.</span>`;
      } else {
        sesiNotice.innerHTML = `<strong>Grande achado! ${name} possui ${units.length} unidades do SESI.</strong><span>${units.join(' e ')}. Essa cidade conta como um único achado no contador, mas guarda mais de uma unidade do SESI.</span>`;
      }
    } else {
      sesiNotice.innerHTML = `<strong>Você encontrou uma cidade com SESI!</strong><span>${name} possui a ${units[0]}.</span>`;
    }
  } else {
    sesiNotice.classList.add('hidden');
  }
}

function onEachFeature(feature, layer) {
  const name = feature.properties?.nome || feature.properties?.name || 'Município';

  municipalities.push({ name, layer });
  layer.setStyle(normalStyle);

  layer.bindTooltip(`${name} · clique para explorar`, {
    sticky: true,
    direction: 'top'
  });

  layer.on({
    mouseover: () => {
      if (layer !== selectedLayer) layer.setStyle(hoverStyle);
    },
    mouseout: () => {
      if (layer !== selectedLayer) layer.setStyle(normalStyle);
    },
    click: () => showCity(name, cultureData[name], layer)
  });
}

function openCityModal() {
  document.getElementById('cityModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.getElementById('modalClose').focus();
}

function closeCityModal() {
  document.getElementById('cityModal').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.getElementById('citySearch').focus();
}

function renderSearchResults(term) {
  const resultsBox = document.getElementById('searchResults');
  const cleanTerm = normalize(term);

  if (!cleanTerm) {
    resultsBox.classList.add('hidden');
    resultsBox.innerHTML = '';
    return;
  }

  const matches = municipalities
    .filter(item => normalize(item.name).includes(cleanTerm))
    .sort((a, b) => {
      const aStarts = normalize(a.name).startsWith(cleanTerm);
      const bStarts = normalize(b.name).startsWith(cleanTerm);
      return Number(bStarts) - Number(aStarts) || a.name.localeCompare(b.name, 'pt-BR');
    })
    .slice(0, 6);

  resultsBox.innerHTML = '';

  if (!matches.length) {
    resultsBox.classList.add('hidden');
    return;
  }

  matches.forEach(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'search-result';
    button.setAttribute('role', 'option');
    button.innerHTML = `<span class="result-dot"></span><span>${item.name}</span>`;
    button.addEventListener('click', () => selectSearchResult(item));
    resultsBox.appendChild(button);
  });

  resultsBox.classList.remove('hidden');
}

function selectSearchResult(item) {
  const input = document.getElementById('citySearch');
  input.value = item.name;
  document.getElementById('searchResults').classList.add('hidden');
  showCity(item.name, cultureData[item.name], item.layer);
}

function searchCity() {
  const term = normalize(document.getElementById('citySearch').value.trim());

  if (!term) return;

  const found = municipalities.find(item => normalize(item.name) === term)
    || municipalities.find(item => normalize(item.name).startsWith(term))
    || municipalities.find(item => normalize(item.name).includes(term));

  if (!found) {
    document.getElementById('searchResults').classList.add('hidden');
    alert('Município não encontrado. Tente outro nome.');
    return;
  }

  selectSearchResult(found);
}

fetch(geojsonUrl)
  .then(response => {
    if (!response.ok) throw new Error('Não foi possível carregar o mapa.');
    return response.json();
  })
  .then(data => {
    geoLayer = L.geoJSON(data, { onEachFeature }).addTo(map);
    map.fitBounds(geoLayer.getBounds(), { padding: [18, 18] });
    document.getElementById('mapLoading').classList.add('hidden');
  })
  .catch(() => {
    document.getElementById('mapLoading').innerHTML = '<strong>Não foi possível carregar o mapa.</strong><span>Verifique sua conexão com a internet e recarregue a página.</span>';
  });

document.getElementById('completionClose').addEventListener('click', closeCompletionModal);

document.getElementById('modalClose').addEventListener('click', closeCityModal);

document.getElementById('cityModal').addEventListener('click', event => {
  if (event.target.id === 'cityModal') closeCityModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (!document.getElementById('completionModal').classList.contains('hidden')) {
      closeCompletionModal();
      return;
    }
    if (!document.getElementById('searchResults').classList.contains('hidden')) {
      document.getElementById('searchResults').classList.add('hidden');
      return;
    }

    closeCityModal();
  }
});

document.addEventListener('click', event => {
  const searchBox = document.querySelector('.search-box');

  if (!searchBox.contains(event.target)) {
    document.getElementById('searchResults').classList.add('hidden');
  }
});

document.getElementById('searchBtn').addEventListener('click', searchCity);
document.getElementById('citySearch').addEventListener('input', event => renderSearchResults(event.target.value));

document.getElementById('citySearch').addEventListener('keydown', event => {
  if (event.key === 'Enter') searchCity();

  if (event.key === 'ArrowDown') {
    const first = document.querySelector('.search-result');
    if (first) first.focus();
  }
});


const challengeNames = {
  quiz: 'Quiz cultural',
  misteriosa: 'Cidade misteriosa',
  mapa: 'Mapa às cegas',
  speedrun: 'Speedrun SESI'
};

let playerName = '';
let activeTimedChallenge = null;
let timedChallengeSet = new Set();
let timedChallengeInterval = null;
let mapChallengeTargets = [];
let mapChallengeFound = new Set();

const quizQuestions = [
  { question: 'Qual ritmo é um dos maiores símbolos do Carnaval de Pernambuco?', options: ['Frevo', 'Carimbó', 'Sertanejo', 'Vanerão'], answer: 0 },
  { question: 'Qual cidade é conhecida pelo Alto do Moura e por sua tradição em cerâmica figurativa?', options: ['Caruaru', 'Petrolina', 'Goiana', 'Triunfo'], answer: 0 },
  { question: 'Qual manifestação cultural é muito associada à Zona da Mata pernambucana?', options: ['Maracatu de baque solto', 'Bumba meu boi', 'Siriri', 'Fandango'], answer: 0 },
  { question: 'Qual cidade do Sertão é conhecida pela tradição dos Caretas?', options: ['Triunfo', 'Olinda', 'Escada', 'Cabo de Santo Agostinho'], answer: 0 },
  { question: 'Qual cidade é conhecida pelo grande São João do Agreste?', options: ['Caruaru', 'Recife', 'Araripina', 'Goiana'], answer: 0 },
  { question: 'Qual destas expressões musicais marcou Recife de forma especial a partir dos anos 1990?', options: ['Manguebeat', 'Pagode baiano', 'Moda de viola', 'Carimbó'], answer: 0 },
  { question: 'Qual produto aparece com frequência na culinária de Pernambuco?', options: ['Tapioca', 'Açaí paulista', 'Pinhão', 'Barbecue'], answer: 0 }
];

const mysteryCities = [
  { city: 'Caruaru', clues: ['Fica no Agreste.', 'É famosa pelo São João.', 'Tem forte tradição no artesanato do Alto do Moura.'] },
  { city: 'Triunfo', clues: ['Fica no Sertão do Pajeú.', 'Tem clima de serra.', 'É conhecida pelos Caretas.'] },
  { city: 'Goiana', clues: ['Fica na Zona da Mata Norte.', 'Tem forte tradição de maracatu.', 'Também possui manifestações como caboclinhos.'] },
  { city: 'Petrolina', clues: ['Fica no Sertão do São Francisco.', 'A cidade tem relação forte com o Rio São Francisco.', 'É um polo da fruticultura irrigada.'] },
  { city: 'Olinda', clues: ['Fica no litoral.', 'É conhecida pelas ladeiras e pelo patrimônio histórico.', 'Os bonecos gigantes são uma marca do Carnaval local.'] }
];

function openOverlay(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
  if (document.querySelectorAll('.overlay-backdrop:not(.hidden), .modal-backdrop:not(.hidden), .completion-backdrop:not(.hidden)').length === 0) {
    document.body.classList.remove('modal-open');
  }
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

let challengeTimer = null;
let challengeStart = 0;

function startChallengeTimer() {
  stopChallengeTimer();
  challengeStart = performance.now();
  challengeTimer = setInterval(updateChallengeTimer, 40);
  updateChallengeTimer();
}

function getChallengeElapsed() {
  return challengeStart ? Math.round(performance.now() - challengeStart) : 0;
}

function updateChallengeTimer() {
  const timer = document.getElementById('challengeTimer');
  if (timer && challengeStart) timer.textContent = formatTime(getChallengeElapsed());
}

function stopChallengeTimer() {
  if (challengeTimer) clearInterval(challengeTimer);
  challengeTimer = null;
}

function saveLocalScore(challenge, score, timeMs) {
  const key = 'mapaCulturalRanking';
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  items.push({ player_name: playerName, challenge, score, time_ms: timeMs, created_at: new Date().toISOString() });

  items.sort((a, b) => {
    if (challenge === 'speedrun') return Number(a.time_ms || a.score) - Number(b.time_ms || b.score);
    return Number(b.score) - Number(a.score) || Number(a.time_ms || 0) - Number(b.time_ms || 0);
  });

  localStorage.setItem(key, JSON.stringify(items.slice(0, 50)));
}

function submitScore(challenge, score, timeMs) {
  saveLocalScore(challenge, score, timeMs);
}

function loadRanking(challenge) {
  const results = document.getElementById('rankingResults');
  results.classList.remove('hidden');

  const local = JSON.parse(localStorage.getItem('mapaCulturalRanking') || '[]');
  const items = local
    .filter(item => item.challenge === challenge)
    .sort((a, b) => {
      if (challenge === 'speedrun') return Number(a.time_ms || a.score) - Number(b.time_ms || b.score);
      return Number(b.score) - Number(a.score) || Number(a.time_ms || 0) - Number(b.time_ms || 0);
    });

  if (!items.length) {
    results.innerHTML = '<div class="empty-ranking">Ainda não existe pontuação neste desafio neste computador.</div>';
    return;
  }

  results.innerHTML = `<h3>${challengeNames[challenge]}</h3><p class="ranking-note">Em caso de empate, o menor tempo fica na frente.</p>` + items.slice(0, 10).map((item, index) => {
    const scoreText = challenge === 'speedrun' ? 'Speedrun concluído' : `${Number(item.score)} pontos`;
    const timeText = formatTime(Number(item.time_ms || item.score || 0));
    return `<div class="ranking-row"><strong>${index + 1}º</strong><span>${escapeHtml(item.player_name)}</span><span>${scoreText} · ${timeText}</span></div>`;
  }).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function resetChallengeView() {
  document.getElementById('challengeIntroView').classList.add('hidden');
  document.getElementById('challengeListView').classList.remove('hidden');
  document.getElementById('challengeGameView').classList.add('hidden');
  document.getElementById('playerNameLabel').textContent = playerName;
}

function startQuiz() {
  const questions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
  let current = 0;
  let score = 0;
  document.getElementById('challengeListView').classList.add('hidden');
  document.getElementById('challengeGameView').classList.remove('hidden');

  function render() {
    const q = questions[current];
    document.getElementById('gameKicker').textContent = `QUIZ · ${current + 1}/5`;
    document.getElementById('gameTitle').textContent = 'Pergunta rápida';
    document.getElementById('gameBody').innerHTML = `<div class="game-box"><div class="challenge-timer">Tempo <strong id="challengeTimer">00:00:000</strong></div><div class="game-question">${q.question}</div><div class="game-options">${q.options.map((option, index) => `<button class="game-option" data-answer="${index}">${option}</button>`).join('')}</div><div class="game-status">Pontuação: ${score}</div></div>`;
    document.querySelectorAll('[data-answer]').forEach(button => {
      button.addEventListener('click', () => {
        if (Number(button.dataset.answer) === q.answer) score += 10;
        current += 1;
        if (current >= questions.length) finishStandardChallenge('quiz', score, 'Quiz concluído!', getChallengeElapsed());
        else render();
      });
    });
  }

  startChallengeTimer();
  render();
}

function startMystery() {
  const rounds = [...mysteryCities].sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [...new Set(mysteryCities.map(item => item.city))];
  let current = 0;
  let score = 0;
  document.getElementById('challengeListView').classList.add('hidden');
  document.getElementById('challengeGameView').classList.remove('hidden');

  function render() {
    const round = rounds[current];
    document.getElementById('gameKicker').textContent = `MISTERIOSA · ${current + 1}/3`;
    document.getElementById('gameTitle').textContent = 'Qual cidade é essa?';
    document.getElementById('gameBody').innerHTML = `<div class="game-box"><div class="challenge-timer">Tempo <strong id="challengeTimer">00:00:000</strong></div><div class="game-question">${round.clues.map((clue, i) => `${i + 1}. ${clue}`).join('<br>')}</div><div class="game-options">${choices.sort(() => Math.random() - 0.5).map(city => `<button class="game-option" data-city="${city}">${city}</button>`).join('')}</div><div class="game-status">Pontuação: ${score}</div></div>`;
    document.querySelectorAll('[data-city]').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.city === round.city) score += 10;
        current += 1;
        if (current >= rounds.length) finishStandardChallenge('misteriosa', score, 'Desafio concluído!', getChallengeElapsed());
        else render();
      });
    });
  }

  startChallengeTimer();
  render();
}

function startMapChallenge() {
  if (!municipalities.length) {
    alert('O mapa ainda está carregando. Tente novamente em alguns segundos.');
    return;
  }

  mapChallengeFound = new Set();
  mapChallengeTargets = [...municipalities]
    .map(item => item.name)
    .filter((name, index, arr) => arr.indexOf(name) === index)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  closeOverlay('challengeHub');

  const hud = document.createElement('div');
  hud.className = 'challenge-hud';
  hud.id = 'challengeHud';
  hud.innerHTML = `<strong>Mapa às cegas</strong><span id="hudStatus">0/5 cidades encontradas</span><span class="challenge-hud-time" id="challengeTimer">00:00:000</span><div class="map-targets" id="mapTargets"></div><button type="button" id="stopChallenge">Parar</button>`;
  document.body.appendChild(hud);

  document.getElementById('mapTargets').innerHTML = mapChallengeTargets
    .map(name => `<span class="challenge-city-chip" data-target-city="${escapeHtml(name)}">${escapeHtml(name)}</span>`)
    .join('');

  document.getElementById('stopChallenge').addEventListener('click', () => finishMapChallenge(false));
  startChallengeTimer();
  updateMapChallengeHud();
}

function handleMapChallengeCity(name) {
  if (!mapChallengeTargets.length || mapChallengeFound.has(name) || !mapChallengeTargets.includes(name)) return;

  mapChallengeFound.add(name);
  updateMapChallengeHud();

  if (mapChallengeFound.size === mapChallengeTargets.length) {
    finishMapChallenge(true);
  }
}

function updateMapChallengeHud() {
  const status = document.getElementById('hudStatus');
  if (status) status.textContent = `${mapChallengeFound.size}/${mapChallengeTargets.length} cidades encontradas`;

  document.querySelectorAll('[data-target-city]').forEach(chip => {
    chip.classList.toggle('found', mapChallengeFound.has(chip.dataset.targetCity));
  });
}

function finishMapChallenge(completed) {
  if (!mapChallengeTargets.length) return;

  const found = mapChallengeFound.size;
  const score = found * 20;
  const elapsedMs = getChallengeElapsed();
  stopChallengeTimer();
  submitScore('mapa', score, elapsedMs);

  document.getElementById('challengeHud')?.remove();
  mapChallengeTargets = [];
  mapChallengeFound = new Set();

  openOverlay('challengeHub');
  resetChallengeView();
  document.getElementById('challengeListView').classList.add('hidden');
  document.getElementById('challengeGameView').classList.remove('hidden');
  document.getElementById('gameKicker').textContent = 'RESULTADO';
  document.getElementById('gameTitle').textContent = completed ? 'Desafio concluído!' : 'Desafio encerrado';
  document.getElementById('gameBody').innerHTML = `<div class="game-box"><div class="game-question">${found}/5 cidades encontradas · ${score} pontos</div><div class="game-time-result">Tempo: ${formatTime(elapsedMs)}</div><p class="game-status">Seu resultado foi salvo no ranking deste computador.</p><button class="game-button" id="backToChallenges">Voltar aos desafios</button></div>`;
  document.getElementById('backToChallenges').addEventListener('click', resetChallengeView);
}

function startTimedChallenge(mode) {
  activeTimedChallenge = mode;
  timedChallengeSet = new Set();

  closeOverlay('challengeHub');
  const hud = document.createElement('div');
  hud.className = 'challenge-hud';
  hud.id = 'challengeHud';
  hud.innerHTML = `<strong id="hudTitle">Encontre todas as cidades com SESI</strong><span id="hudStatus">0/${sesiTotal}</span><span class="challenge-hud-time" id="challengeTimer">00:00:000</span><div class="challenge-cities" id="hudCities"></div><button type="button" id="stopChallenge">Parar</button>`;
  document.body.appendChild(hud);

  startChallengeTimer();
  document.getElementById('stopChallenge').addEventListener('click', () => finishTimedChallenge(false, getChallengeElapsed()));
}

function handleTimedChallengeCity(name) {
  if (!activeTimedChallenge || !sesiCities.has(name) || timedChallengeSet.has(name)) return;

  timedChallengeSet.add(name);
  const chips = document.getElementById('hudCities');
  if (chips) chips.innerHTML += `<span class="challenge-city-chip found">${escapeHtml(name)}</span>`;

  if (activeTimedChallenge === 'tempo') {
    const hudStatus = document.getElementById('hudStatus');
    if (hudStatus) {
      const current = hudStatus.textContent.split('·')[1] || '';
      hudStatus.textContent = `${timedChallengeSet.size}/${sesiTotal}${current ? ` ·${current}` : ''}`;
    }
  }

  if (timedChallengeSet.size === sesiTotal) finishTimedChallenge(true, getChallengeElapsed());
}

function finishTimedChallenge(completed, elapsedMs) {
  if (!activeTimedChallenge) return;
  clearInterval(timedChallengeInterval);
  timedChallengeInterval = null;
  stopChallengeTimer();
  const mode = activeTimedChallenge;
  const score = 0;
  const title = completed ? 'Speedrun concluído!' : 'Speedrun encerrado';
  submitScore(mode, score, elapsedMs);

  document.getElementById('challengeHud')?.remove();
  activeTimedChallenge = null;

  openOverlay('challengeHub');
  resetChallengeView();
  document.getElementById('challengeListView').classList.add('hidden');
  document.getElementById('challengeGameView').classList.remove('hidden');
  document.getElementById('gameKicker').textContent = 'RESULTADO';
  document.getElementById('gameTitle').textContent = title;
  const result = `Tempo: ${formatTime(elapsedMs)} · ${timedChallengeSet.size}/${sesiTotal} cidades encontradas.`;
  document.getElementById('gameBody').innerHTML = `<div class="game-box"><div class="game-question">${result}</div><p class="game-status">Seu resultado foi salvo no ranking deste computador.</p><button class="game-button" id="backToChallenges">Voltar aos desafios</button></div>`;
  document.getElementById('backToChallenges').addEventListener('click', resetChallengeView);
}

function finishStandardChallenge(challenge, score, message, timeMs) {
  stopChallengeTimer();
  submitScore(challenge, score, timeMs);
  document.getElementById('gameKicker').textContent = 'RESULTADO';
  document.getElementById('gameTitle').textContent = message;
  document.getElementById('gameBody').innerHTML = `<div class="game-box"><div class="game-question">${score} pontos</div><div class="game-time-result">Tempo: ${formatTime(timeMs)}</div><p class="game-status">Seu resultado foi salvo no ranking deste computador.</p><button class="game-button" id="backToChallenges">Voltar aos desafios</button></div>`;
  document.getElementById('backToChallenges').addEventListener('click', resetChallengeView);
}

document.getElementById('rankingBtn').addEventListener('click', () => {
  openOverlay('rankingHub');
  document.getElementById('rankingResults').classList.add('hidden');
});

document.getElementById('challengesBtn').addEventListener('click', () => {
  openOverlay('challengeHub');
  if (playerName) resetChallengeView();
  else {
    document.getElementById('challengeIntroView').classList.remove('hidden');
    document.getElementById('challengeListView').classList.add('hidden');
    document.getElementById('challengeGameView').classList.add('hidden');
    setTimeout(() => document.getElementById('playerName').focus(), 50);
  }
});

document.getElementById('logoutButton').addEventListener('click', () => {
  stopChallengeTimer();
  playerName = '';
  document.getElementById('playerName').value = '';
  document.getElementById('playerNameLabel').textContent = '—';
  document.getElementById('challengeIntroView').classList.remove('hidden');
  document.getElementById('challengeListView').classList.add('hidden');
  document.getElementById('challengeGameView').classList.add('hidden');
});

document.getElementById('playerForm').addEventListener('submit', event => {
  event.preventDefault();
  const value = document.getElementById('playerName').value.trim();
  if (!value) return;
  playerName = value.slice(0, 18);
  resetChallengeView();
});

document.querySelectorAll('[data-close-overlay]').forEach(button => {
  button.addEventListener('click', () => closeOverlay(button.dataset.closeOverlay));
});

document.querySelectorAll('[data-challenge]').forEach(button => {
  button.addEventListener('click', () => {
    const challenge = button.dataset.challenge;
    if (!playerName) return;
    if (challenge === 'quiz') startQuiz();
    if (challenge === 'misteriosa') startMystery();
    if (challenge === 'mapa') startMapChallenge();
    if (challenge === 'speedrun') startTimedChallenge(challenge);
  });
});

document.querySelectorAll('[data-ranking]').forEach(button => {
  button.addEventListener('click', () => loadRanking(button.dataset.ranking));
});

updateSesiCounter();
