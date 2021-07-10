var layerMotorwayLink = {
  id: "road_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": {
      base: 1.2,
      stops: [
        [12.5, 0],
        [13, 1.5],
        [14, 2.5],
        [20, 11.5],
      ],
    },
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
  ],
  minzoom: 12,
  layout: layoutRoad,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorway = {
  id: "road_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": {
      base: 1.2,
      stops: [
        [4, 0],
        [7, 1],
        [20, 18],
      ],
    },
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoad,
  source: "openmaptiles",
  minzoom: 5,
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorwayLabel = {
  id: "road_label",
  type: "symbol",
  paint: {
    "text-color": "#333",
    "text-halo-color": "#fff",
    "text-halo-blur": 0.5,
    "text-halo-width": 1,
  },
  filter: ["all", ["==", "class", "motorway"]],
  layout: {
    "text-font": ["Metropolis Light"],
    "text-size": 20,
    "text-field": [
      "format",
      [
        "case",
        ["!=", ["get", "ref_1"], null],
        [
          "image",
          ["concat", "shield_", ["get", "network_1"], "=", ["get", "ref_1"]],
        ],
        ["literal", ""],
      ],
      " ",
      [
        "case",
        ["!=", ["get", "ref_2"], null],
        [
          "image",
          ["concat", "shield_", ["get", "network_2"], "=", ["get", "ref_2"]],
        ],
        ["literal", ""],
      ],
      " ",
      [
        "case",
        ["!=", ["get", "ref_3"], null],
        [
          "image",
          ["concat", "shield_", ["get", "network_3"], "=", ["get", "ref_3"]],
        ],
        ["literal", ""],
      ],
      " ",
      [
        "case",
        ["!=", ["get", "ref_4"], null],
        [
          "image",
          ["concat", "shield_", ["get", "network_4"], "=", ["get", "ref_4"]],
        ],
        ["literal", ""],
      ],
      " ",
      [
        "case",
        ["!=", ["get", "ref_5"], null],
        [
          "image",
          ["concat", "shield_", ["get", "network_5"], "=", ["get", "ref_5"]],
        ],
        ["literal", ""],
      ],
      " ",
      [
        "case",
        ["!=", ["get", "ref_6"], null],
        [
          "image",
          ["concat", "shield_", ["get", "network_5"], "=", ["get", "ref_6"]],
        ],
        ["literal", ""],
      ],
    ],
    "text-anchor": "center",
    "symbol-placement": "line",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation_ref",
};
