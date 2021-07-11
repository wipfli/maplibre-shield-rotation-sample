function loadShield(ctx, shield) {
  var imgData = ctx.createImageData(shield.data.width, shield.data.height);
  for (i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }
  ctx.putImageData(imgData, 0, 0);
}

var shields = {};
var shieldImages = [];
var shieldsLoaded = false;

function initShields(map) {
  shieldImages = map.style.imageManager.images;

  shields["US:I"] = {
    backgroundImage: shieldImages.shield40_us_interstate,
    textColor: "white",
    padding: {
      left: 10,
      right: 10,
      top: 1,
      bottom: 3
    },
  };

  shields["US:US"] = {
    backgroundImage: shieldImages.shield40_us_us,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: -10,
      bottom: 10
    },
  };

  shields["US:US:Historic"] = {
    backgroundImage: shieldImages.shield40_us_us,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: -10,
      bottom: 10
    },
    colorLighten: "#613214",
  };

  shields["US:PA"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: -10,
      bottom: 10
    },
  };

  shields["US:PA:Turnpike"] = {
    backgroundImage: shieldImages.shield40_us_pa_turnpike,
    textColor: "white",
    padding: {
      left: 10,
      right: 10,
      top: -10,
      bottom: 10
    },
  };

  shields["US:PA:Belt"] = {
    notext: true,
  };
}

function missingIconLoader(map, e) {
  var id = e.id;

  if (id == "shield_") {
    return;
  }

  if (!shieldsLoaded) {
    initShields(map);
    shieldsLoaded = true;
  }

  var network_ref = id.split("_")[1];
  var network_ref_parts = network_ref.split("=");
  var network = network_ref_parts[0];
  var ref = network_ref_parts[1];

  var width = 20;
  var height = 20;
  var colorLighten = null;

  var c = document.createElement("canvas");
  c.width = 80;
  c.height = 80;

  var scaleH = height/c.height;
  var scaleW = width/c.width;

  var ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.mozImageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true;
  ctx.msImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold 16px Arial";

  if (shields[network] != null) {
    var shieldDef = shields[network];
    var shield = shieldDef.backgroundImage;
    colorLighten = shieldDef.colorLighten;

    if (network == "US:PA:Turnpike" && ref == "") {
      shield = shieldImages.shield40_us_pa_turnpike_noref;
    }

    if (network == "US:PA:Belt") {
      switch (ref) {
        case "Red Belt":
        default:
          shield = shieldImages.shield40_us_pa_belt_red_2;
          break;
      }
    }

    if (shield == null) {
      console.log("No shield defined for: " + network + "=" + ref);
      return;
    }

//    scaleW = shield.data.width / width;
//    scaleH = shield.data.height / height;

    loadShield(ctx, shield);

    if (shieldDef.notext != true) {
      ctx.fillStyle = shieldDef.textColor;

      var padding = shieldDef.padding || {};
      var padTop = padding.top || 0;
      var padBot = padding.bottom || 0;
      var padLeft = padding.left || 0;
      var padRight = padding.right || 0;

      var metrics = ctx.measureText(ref);
      var textWidth = metrics.width;
      var textHeight =
          metrics.actualBoundingBoxAscent+
          metrics.actualBoundingBoxDescent;

      var desiredWidth = c.width-padLeft-padRight;
      var scaleWidth = desiredWidth/textWidth;

      var desiredHeight = c.height-padTop-padBot;
      var scaleHeight = desiredHeight/textHeight;
      var desiredRenderHeight = (c.height-padTop-padBot)/scaleHeight;
      scaleHeight = Math.min(scaleWidth,scaleHeight);

      var renderHeight = desiredHeight/scaleHeight;

      var vBaselineOffset = (desiredRenderHeight - renderHeight) / 2;

      ctx.scale(scaleWidth, scaleHeight);
      ctx.fillText(ref,
          (padLeft + 0.5*desiredWidth)/scaleWidth,
          (padTop)/scaleHeight -vBaselineOffset,
          80);
      ctx.scale(1/scaleWidth, 1/scaleHeight);
    }
  } else if (ref == "") {
    return;
  } else {
    switch (network) {
      default: {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 20, 20);
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 20, 20);
        ctx.fillText(ref, width * 0.5, height * 0.58, width);
      }
    }
  }

  var scaleCanvas = document.createElement("canvas");
  var scaleCtx = scaleCanvas.getContext("2d");
  scaleCtx.scale(scaleH, scaleW);
  scaleCtx.drawImage(c, 0, 0);

  if (colorLighten != null) {
    scaleCtx.globalCompositeOperation = "lighten";
    scaleCtx.fillStyle = colorLighten;
    scaleCtx.fillRect(0, 0, width * scaleW, height * scaleH);
    scaleCtx.globalCompositeOperation = "destination-atop";
    scaleCtx.drawImage(c, 0, 0);
  }

  var imgData = scaleCtx.getImageData(0, 0, width, height);

  map.addImage(id, {
    width: width,
    height: width,
    data: imgData.data,
  });
}
