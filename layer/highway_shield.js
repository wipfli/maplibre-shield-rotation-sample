var layerHighwayShieldInterstate = {
  id: "highway-shield-us-interstate",
  type: "symbol",
  paint: {
    "text-color": "rgba(255, 255, 255, 1)",
    "icon-translate": [0, 0],
    "text-translate": [0, 0],
  },
  filter: [
    "all",
    ["==", "concurrency_size", 1],
    ["==", "concurrency_index", 1],
    ["<=", "ref_length", 6],
    ["==", "$type", "LineString"],
    ["in", "network", "us-interstate"],
  ],
  layout: {
    "icon-size": 2.0,
    "text-font": ["Open Sans Bold"],
    "text-size": 10.5,
    "text-anchor": "center",
    "text-field": "{ref}",
    "text-offset": [0, -0.2],
    "icon-image": "us_interstate",
    "icon-text-fit": "both",
    "icon-padding": 0,
    //    "icon-optional": false,
    "icon-ignore-placement": true,
    "text-ignore-placement": true,
    "icon-allow-overlap": false,
    "text-allow-overlap": false,
    //    "symbol-spacing": 450,
    //	    "symbol-placement": "line-center",
    "symbol-z-order": "viewport-y",
    //    "symbol-avoid-edges": false,
    //    "icon-rotation-alignment": "viewport",
    //    "text-rotation-alignment": "viewport",
  },
  source: "openmaptiles",
  minzoom: 7,
  "source-layer": "transportation_name",
};

var layerHighwayShieldInterstate_2_1 = JSON.parse(
  JSON.stringify(layerHighwayShieldInterstate)
);
var layerHighwayShieldInterstate_2_2 = JSON.parse(
  JSON.stringify(layerHighwayShieldInterstate)
);
var layerHighwayShieldInterstate_2_3 = JSON.parse(
  JSON.stringify(layerHighwayShieldInterstate)
);
var layerHighwayShieldInterstate_2_4 = JSON.parse(
  JSON.stringify(layerHighwayShieldInterstate)
);

layerHighwayShieldInterstate_2_1.paint["text-translate"] = [-20, 20];
layerHighwayShieldInterstate_2_2.paint["text-translate"] = [20, 20];
layerHighwayShieldInterstate_2_3.paint["text-translate"] = [-20, -20];
layerHighwayShieldInterstate_2_4.paint["text-translate"] = [20, -20];

layerHighwayShieldInterstate_2_1.paint["icon-translate"] = [-20, 20];
layerHighwayShieldInterstate_2_2.paint["icon-translate"] = [20, 20];
layerHighwayShieldInterstate_2_3.paint["icon-translate"] = [-20, -20];
layerHighwayShieldInterstate_2_4.paint["icon-translate"] = [20, -20];

//Concurrency size
//layerHighwayShieldInterstate_2_1.filter[1][2]=2;
//layerHighwayShieldInterstate_2_2.filter[1][2]=2;

//Concurrency index
//layerHighwayShieldInterstate_2_1.filter[2][2]=1;
//layerHighwayShieldInterstate_2_2.filter[2][2]=2;

layerHighwayShieldInterstate_2_1.id = "highway-shield-us-interstate-2-1";
layerHighwayShieldInterstate_2_2.id = "highway-shield-us-interstate-2-2";
layerHighwayShieldInterstate_2_3.id = "highway-shield-us-interstate-2-3";
layerHighwayShieldInterstate_2_4.id = "highway-shield-us-interstate-2-4";

/*
var layerHighwayShieldInterstate_3_1 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));
var layerHighwayShieldInterstate_3_2 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));
var layerHighwayShieldInterstate_3_3 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));

var layerHighwayShieldInterstate_4_1 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));
var layerHighwayShieldInterstate_4_2 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));
var layerHighwayShieldInterstate_4_3 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));
var layerHighwayShieldInterstate_4_4 = JSON.parse(JSON.stringify(layerHighwayShieldInterstate));
*/

var layerHighwayShieldUS = {
  id: "highway-shield-us-highway",
  type: "symbol",
  paint: {
    "text-color": "rgba(0, 0, 0, 1)",
  },
  filter: [
    "all",
    ["<=", "ref_length", 6],
    ["==", "$type", "LineString"],
    ["in", "network", "us-highway"],
  ],
  layout: {
    "icon-size": 2.0,
    "text-font": ["Open Sans Bold"],
    "text-size": 10.5,
    "text-anchor": "center",
    "text-field": "{ref}",
    "icon-image": "us_us_route",
    "icon-text-fit": "both",
    "icon-padding": 0,
    "icon-optional": false,
    "symbol-spacing": 450,
    "symbol-placement": "line-center",
    "symbol-avoid-edges": false,
    "icon-rotation-alignment": "viewport",
    "text-rotation-alignment": "viewport",
  },
  source: "openmaptiles",
  minzoom: 7,
  "source-layer": "transportation_name",
};

var layerHighwayShieldState = {
  id: "highway-shield-us-state",
  type: "symbol",
  paint: {
    "text-color": "rgba(0, 0, 0, 1)",
  },
  filter: [
    "all",
    ["<=", "ref_length", 6],
    ["==", "$type", "LineString"],
    ["in", "network", "us-state"],
  ],
  layout: {
    "icon-size": 2.0,
    "text-font": ["Open Sans Bold"],
    "text-size": 10.5,
    "text-anchor": "center",
    "text-field": "{ref}",
    "text-offset": [0, 0],
    "icon-offset": [0, 0],
    "icon-image": "us_white_rectangle",
    "icon-text-fit": "both",
    "icon-padding": 0,
    //    "icon-text-fit-padding": [0.5, 0.6, 0, 0.5],
    "symbol-spacing": {
      stops: [
        [7, 150],
        [13, 300],
        [16, 800],
      ],
    },

    "symbol-placement": {
      base: 1,
      stops: [
        [7, "point"],
        [7, "line"],
        [8, "line"],
      ],
    },
    "symbol-avoid-edges": true,
    "icon-rotation-alignment": "viewport",
    "text-rotation-alignment": "viewport",
  },
  source: "openmaptiles",
  minzoom: 7,
  "source-layer": "transportation_name",
};
