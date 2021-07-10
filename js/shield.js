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
    font2: "bold 44pt Arial",
    font3: "bold 30pt Arial",
    textX: 0.5,
    textY: 0.56,
  };

  shields["US:US"] = {
    backgroundImage: shieldImages.shield40_us_us,
    textColor: "black",
    font2: "bold 40pt Arial",
    font3: "bold 26pt Arial",
    textX: 0.5,
    textY: 0.56,
  };

  shields["US:US:Historic"] = {
    backgroundImage: shieldImages.shield40_us_us,
    textColor: "black",
    font2: "bold 44pt Arial",
    font3: "bold 30pt Arial",
    textX: 0.5,
    textY: 0.56,
    colorLighten: "#613214",
  };

  shields["US:PA"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
    font2: "bold 40pt Arial",
    font3: "bold 28pt Arial",
    textX: 0.5,
    textY: 0.6,
  };

  shields["US:PA:Turnpike"] = {
    backgroundImage: shieldImages.shield40_us_pa_turnpike,
    textColor: "white",
    font2: "bold 32pt Arial",
    font3: "bold 22pt Arial",
    textX: 0.5,
    textY: 0.56,
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
  var scaleH = 1;
  var scaleW = 1;
  var colorLighten = null;

  var c = document.createElement("canvas");
  var ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.mozImageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true;
  ctx.msImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;

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

    scaleW = shield.data.width / width;
    scaleH = shield.data.height / height;

    loadShield(ctx, shield);

    if (shieldDef.notext != true) {
      ctx.fillStyle = shieldDef.textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (ref.length <= 2) {
        ctx.font = shieldDef.font2;
      } else {
        ctx.font = shieldDef.font3;
      }
      ctx.fillText(
        ref,
        width * scaleW * shieldDef.textX,
        height * scaleH * shieldDef.textY,
        width * scaleW
      );
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

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (ref.length <= 2) {
          ctx.font = "bold 11pt Arial";
        } else {
          ctx.font = "bold 7pt Arial";
        }
        ctx.fillText(ref, width * 0.5, height * 0.58, width);
      }
    }
  }

  var scaleCanvas = document.createElement("canvas");
  var scaleCtx = scaleCanvas.getContext("2d");
  scaleCtx.scale(1 / scaleW, 1 / scaleH);
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
