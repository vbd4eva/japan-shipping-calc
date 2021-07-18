// alert('calcCaterina');

//Prices for calc
const priceAirMail = {
  //AIRMAIL
  name: "AirMail",
  region: ["Asia", "Europe"],
  weight: [
    300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
    1700, 1800, 1900, 2000,
  ],
  Asia: {
    RUR: [
      798, 874, 950, 1102, 1178, 1254, 1330, 1406, 1520, 1596, 1672, 1748, 1862,
      1938, 2014, 2128, 2204, 2280,
    ],
    JPY: [
      1050, 1150, 1250, 1450, 1550, 1650, 1750, 1850, 2000, 2100, 2200, 2300,
      2450, 2550, 2650, 2800, 2900, 3000,
    ],
  },
  Europe: {
    RUR: [
      928, 1019, 1110, 1277, 1368, 1460, 1551, 1642, 1771, 1862, 1954, 2045,
      2174, 2265, 2356, 2486, 2577, 3413,
    ],
    JPY: [
      1220, 1340, 1460, 1680, 1800, 1920, 2040, 2160, 2330, 2450, 2570, 2690,
      2860, 2980, 3100, 3270, 3390, 4490,
    ],
  },
};
//
const priceEMS = {
  // EMS
  name: "EMS",
  region: ["Asia", "Europe", "Usa"],
  weight: [
    500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500,
    4000, 4500, 5000, 5500, 6000, 7000, 8000, 9000, 10000,
  ],
  Asia: {
    RUR: [
      1216, 1322.4, 1428.8, 1535.2, 1641.6, 1786, 2014, 2280, 2470, 2736, 3116,
      3496, 3876, 4256, 4636, 5016, 5434, 5814, 6422, 7068, 7676, 8360,
    ],
    JPY: [
      1600, 1740, 1880, 2020, 2160, 2350, 2650, 3000, 3250, 3600, 4100, 4600,
      5100, 5600, 6100, 6600, 7150, 7650, 8450, 9300, 10100, 11000,
    ],
  },
  Europe: {
    RUR: [
      2052, 2242, 2432, 2622, 2812, 3002, 3496, 3914, 4370, 4788, 5586, 6384,
      7182, 7980, 8778, 9576, 10374, 11210, 12578, 13984, 15428, 16796,
    ],
    JPY: [
      2700, 2950, 3200, 3450, 3700, 3950, 4600, 5150, 5750, 6300, 7350, 8400,
      9450, 10500, 11550, 12600, 13650, 14750, 16550, 18400, 20300, 22100,
    ],
  },
  Usa: {
    RUR: [
      2014, 2211.6, 2409.2, 2606.8, 2804.4, 3002, 3526.4, 3952, 4438.4, 4864,
      5700, 6536, 7372, 8208, 9044, 9880, 10716, 11552, 13072, 14516, 16036,
      17480,
    ],
    JPY: [
      2650, 2910, 3170, 3430, 3690, 3950, 4640, 5200, 5840, 6400, 7500, 8600,
      9700, 10800, 11900, 13000, 14100, 15200, 17200, 19100, 21100, 23000,
    ],
  },
};
//
const priceSurface = {
  name: "Surface",
  region: ["Asia", "Europe", "ToMoscow", "Surface"],
  weight: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
  Surface: {
    JPY: [2100, 2650, 3200, 3750, 4400, 4950, 5500, 6100, 6700, 7250],
    RUR: [1750, 2150, 2650, 3050, 3500, 3950, 4400, 4850, 5300, 5750],
  },
};
//
const priceToMoscow = {
  name: "ToMoscow",
  region: ["ToMoscow"],
  weight: [
    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500,
    7000, 7500, 8000, 8500, 9000, 9500, 10000,
  ],
  ToMoscow: {
    RUR: [
      875, 1750, 2625, 3500, 4375, 5250, 6125, 7000, 7875, 8750, 9625, 10500,
      11375, 12250, 13125, 14000, 14875, 15750, 16625, 17500,
    ],
  },
};
const pricesArr = [priceAirMail, priceEMS, priceSurface, priceToMoscow];
let shippingServices = [];
let aveilableShipping = [];
//console.log(pricesArr);

// functions //

function drawPriceTable(priceObj, cssHook, place = "beforeend") {
  document
    .querySelector(cssHook)
    .insertAdjacentHTML(place, getPriceTableHtml(priceObj));

  function getPriceTableHtml(price) {
    if (!price) {
      alert(
        "initShippingPriceObj((price = false) - return error 'function argument missing'"
      );
      return;
    }
    //
    const { name, region, weight, ...prices } = price;
    const size = weight.length;
    if (!size) return;
    let tablePriceColumns = { weight };
    Object.entries(prices).forEach(([region, currencyList]) => {
      Object.keys(currencyList).forEach((currency) => {
        const key = `${region + currency}`;
        tablePriceColumns[key] = currencyList[currency];
      });
    });
    const tableHeadersRow = Object.keys(tablePriceColumns);

    const tableHtml = [
      `<table class="${name}">`,
      `<caption>${name}</caption>`,
      "<thead>",
      "<tr>",
      "<th>№</th>",
      ...tableHeadersRow.map((key) => `<th class="${key}">${key}</th>`),
      "</tr>",
      "</thead>",
      "<tbody>",
      ...weight.map((width, i) => [
        `<tr>`,
        `<td>${i + 1}</td>`,
        ...tableHeadersRow.map(
          (key) =>
            `<td class="${key}__${width}">${tablePriceColumns[key][i]}</td>`
        ),
        `</tr>`,
      ]),
      "</tbody>",
      `</table>`,
    ];
    return tableHtml.flat().join("");
  }
}

function drawPriceTables() {
  const cssHook = ".calcTables";
  const toDraw = shippingServices.length > 0 ? shippingServices : pricesArr;
  document.querySelector(cssHook).innerHTML = "";
  toDraw.forEach((price) => drawPriceTable(price, cssHook));
}
function markTables(cssHook) {}
function drawServicesForm(serviceNamesArr, cssHook) {
  // console.log({ serviceNamesArr, cssHook });
  const formRef = document.querySelector(cssHook);
  formRef;
  const formRadioHtml = serviceNamesArr
    .map(
      (name) => `
      <label>
        <input type="radio" name="shippingService" value="${name}" /> ${name}
      </label>
    `
    )
    .join("");

  formRef.innerHTML = formRadioHtml;
}
function markPriceTables(cssHook) {
  const calcTables = document.querySelector(cssHook);
  aveilableShipping.forEach((el) => {
    const row = calcTables.querySelector(
      `.${el.name} [class $= __${el.currnetWeigth}]`
    ).parentElement;

    row.style.outline = "solid";
  });

  //console.log(document.querySelector(cssHook));
}

function initShippingPriceObj(price) {
  if (!price) {
    alert(
      "initShippingPriceObj((price = false) - return error 'function argument missing'"
    );
    return;
  }
  //
  const table = {};
  //
  if (price.name) {
    table.name = price.name;
  } else {
    alert("Таблица Без названия!!");
    return;
  }
  //
  if (price.weight) {
    table.size = price.weight.length || null;
    if (table.size <= 0) {
      alert(`Таблица "${table.name}" - Пустая!`);
      return;
    }
    table.content = {};
    table.content.weight = price.weight;
  }
  //
  if (price.region) table.region = price.region;
  //
  if (price.Asia) {
    if (price.Asia.RUR) table.content.AsiaRUR = price.Asia.RUR;
    if (price.Asia.JPY) table.content.AsiaJPY = price.Asia.JPY;
  }
  //
  if (price.Europe) {
    if (price.Europe.RUR) table.content.EuropeRUR = price.Europe.RUR;
    if (price.Europe.JPY) table.content.EuropeJPY = price.Europe.JPY;
  }
  //
  if (price.Usa) {
    if (price.Usa.RUR) table.content.UsaRUR = price.Usa.RUR;
    if (price.Usa.JPY) table.content.UsaJPY = price.Usa.JPY;
  }
  //
  if (price.JPY) table.content.JPY = price.JPY;
  if (price.RUR) table.content.RUR = price.RUR;
  // MAKE TABLE HTML
  //row of headers
  const headersRow = Object.keys(table.content);
  table.html = [
    "<thead>",
    "<tr>",
    "<th>Num</th>",
    headersRow.map((header) => `<th>${header}</th>`).join(""),
    "</tr>",
    "</thead>",
    "<tbody>",
  ];
  //row of content
  for (let row = 0; table.size > row; row += 1) {
    // console.log("row=" + row);
    table.html = [
      ...table.html,
      "<tr>",
      `<td>${row + 1}</td>`,
      headersRow.map((cell) => `<td>${table.content[cell][row]}</td>`).join(""),
      "</tr>",
    ];
  }
  // caption and OuterHtml
  table.html = [
    ` <table class="${table.name}">
                <caption>${table.name}</caption>`,
    ...table.html,
    "</tbody>",
    "</table>",
  ].join("");
  // const taObject.keys(table.content);
  //

  return table;
}

function changeShippingServices() {
  // console.log(cargo);
  const { weight, region, service } = cargo;

  if (!weight) return;
  shippingServices = pricesArr.filter(
    (priceList) => Math.max(...priceList.weight) >= weight
  );

  if (!region) return shippingServices;
  shippingServices = shippingServices.filter((priceList) =>
    priceList.region.includes(region)
  );

  if (!service) return shippingServices;
  shippingServices = shippingServices.filter(
    (priceList) => priceList.name === service
  );

  return shippingServices;
}

function handleShippingServices() {
  changeShippingServices();
  drawPriceTables();

  aveilableShipping = handleService();

  console.log("cargo", cargo);
  console.log("shippingServices", shippingServices);
  console.log("aveilableShipping", aveilableShipping);

  markPriceTables(".calcTables");

  if (aveilableShipping.length === 1) {
    const { name, currnetWeigth } = aveilableShipping[0];
    const region = name === "Surface" ? "Surface" : cargo.region;

    const priceJPY = aveilableShipping[0][`${region}JPY`];
    const priceRUR = aveilableShipping[0][`${region}RUR`];
    const service = name;
    console.log("priceJPY", priceJPY);
    console.log("priceRUR", priceRUR);
    const shippingPrice = `${priceJPY ? priceJPY + " JPY" : ""} ${
      priceRUR ? priceRUR + " RUR" : ""
    }`;
    //   ${}
    // `;
    cargo.refreshData({
      width: currnetWeigth,
      service,
      shippingPrice,
    });

    pageManage.refreshOutputForm();
  }
}

function handleService() {
  const cargoWeight = cargo.weight;
  return shippingServices.map((service) => {
    const { name, region, weight, ...countries } = service;

    const currnetWeigth = weight.find((weight) => cargoWeight <= weight);
    const weightPosition = weight.indexOf(currnetWeigth);

    const returnObject = {
      name,
      currnetWeigth,
      weightPosition,
    };
    const countriesPrice = Object.keys(countries).forEach((country) => {
      //const returnObj = {};
      if (countries[country].JPY)
        returnObject[`${country}JPY`] = countries[country].JPY[weightPosition];
      if (countries[country].RUR)
        returnObject[`${country}RUR`] = countries[country].RUR[weightPosition];
      // return returnObj;
    });

    return returnObject;
  });
}

function randomInteger3(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// function correctWeight(weight) {
//   // const weightFloor100 = Math.floor(weight / 100) * 100;
//   const weightCeil100 = Math.ceil(weight / 100) * 100;
//   const weightHalfCeil100 = weightCeil100 - 50;
//   const coorectWeight =
//     weight > weightHalfCeil100 ? weightCeil100 : weightHalfCeil100;
//   return coorectWeight;
//   // return Math.floor(weight / 100) * 100;
// }

// objects //
const cargo = {
  weight: null,
  region: null,
  service: null,
  shippingPrice: null,
  //
  changeWeight(newWeight) {
    if (!newWeight) {
      alert("cargo Weight - not changed");
      return;
    }
    this.weight = newWeight;
    this.shippingPrice = null;
    // console.log("new cargo.weight = ", cargo.weight);
  },
  //
  changeRegion(newRegion) {
    if (!newRegion) {
      alert("cargo Region - not changed");
      return;
    }
    this.service = null;
    this.shippingPrice = null;
    this.region = newRegion;
    // console.log("new cargo.region = ", cargo.region);
    // this.calcShippingPrice();
  },
  changeService(newService) {
    if (!newService) {
      alert("cargo Service - not changed");
      return;
    }
    this.service = newService;
    // console.log("new cargo.region = ", cargo.region);
    // this.calcShippingPrice();
  },
  refreshData(obj) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
    console.log("newCargo", cargo);
  },
  //
};

const pageManage = {
  //output HTML block
  outputWeightEl: document.querySelector(
    ".shipingInfo > .shipingWeight > .data"
  ),
  outputRegionEl: document.querySelector(
    ".shipingInfo > .shipingRegion > .data"
  ),
  outputServiceEl: document.querySelector(
    ".shipingInfo > .shipingService > .data"
  ),
  outputShipingCostEl: document.querySelector(
    ".shipingInfo > .shipingCost > .data"
  ),

  //input HTML block
  inputWeightNumberEl: document.querySelector("#weightNumberInput"),
  inputWeightRangeEl: document.querySelector("#weightRangeInput"),
  inputRegionEl: document.querySelector("#region"),
  inputServiceEl: document.querySelector(".js-services-form"),

  //
  init() {
    this.inputWeightNumberEl.addEventListener("input", (e) => {
      this.changeWeight(e.target.value);
    });
    this.inputWeightRangeEl.addEventListener("input", (e) => {
      this.changeWeight(e.target.value);
    });
    this.inputRegionEl.addEventListener("change", (e) => {
      this.changeRegion(e.target.value);
    });
    this.inputServiceEl.addEventListener("change", (e) => {
      this.changeService(e.target.value);
    });
  },
  changeWeight(newWeight) {
    cargo.changeWeight(newWeight);
    this.outputWeightEl.innerHTML = newWeight;
    this.inputWeightNumberEl.value = newWeight;
    this.inputWeightRangeEl.value = newWeight;
    //console.log(this.inputWeightNumberEl.validity);
    handleShippingServices();
  },
  changeRegion(newRegion) {
    cargo.changeRegion(newRegion);

    this.inputRegionEl.value = newRegion;
    this.outputRegionEl.innerHTML = newRegion;
    this.outputServiceEl.innerHTML = "";
    this.outputShipingCostEl.innerHTML = "";

    handleShippingServices();

    const serviceNamesArr = shippingServices.map((service) => service.name);

    drawServicesForm(serviceNamesArr, ".js-services-form");
  },
  changeService(newService) {
    console.log(`service checked`, newService);
    // this.outputServiceEl.innerHTML(newService);
    this.outputServiceEl.innerHTML = newService;
    cargo.changeService(newService);
    handleShippingServices();

    // this.outputShipingCostEl.innerHTML = ;
  },

  refreshOutputForm() {
    this.outputWeightEl.innerHTML =
      cargo.weight + " = " + aveilableShipping[0].currnetWeigth;
    this.outputShipingCostEl.innerHTML = cargo.shippingPrice;
    this.outputServiceEl.innerHTML = cargo.service;
    // outputWeightEl.innerHTML = cargo.weight,
  },
};

// draw priceTables //
// drawPriceTables();

//
// init page elements managment //
pageManage.init();

// init weight //
{
  const random = randomInteger3(0, 10000);
  pageManage.changeWeight(random);
  // console.log("cargo", cargo);
}

//
