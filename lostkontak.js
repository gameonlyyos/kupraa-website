window.onload = function () {
  createRain();

  document.getElementById("bodyblur").style.opacity = "0.3";
};

pesanAkhir1 = inip[iden];
pesanAkhir3 = "<br>thank you, and i love uuu";

document.getElementById("loveIn").onclick = function () {
  if (fungsiAwal == 0) {
    loveIn.style = "transition:all .8s ease;transform:scale(15);opacity:0";
    ftAwal.style = "opacity:0";
    wallpaper.style = "transform: scale(1);";
    ket.style = "display:none";
    fungsiAwal = 1;
    setTimeout(initengahan, 300);
    setTimeout(bqmuncul, 400);
  }
};

aktigeser = 0;
thisgeser = 1;
document.getElementById("bq").onclick = function () {
  if (aktigeser == 1) {
    setTimeout(kalimatakhir, 400);
    hsementara();
  }
};

function hsementara() {
  ketlanjut.style = "position:relative;";
  thisgeser += 1;
  aktigeser = 0;
}

function munculkembali() {
  if (thisgeser < totalPesan) {
    ketlanjut.style = "position:relative;opacity:.8";
    aktigeser = 1;
    iden += 1;
    pesanAkhir1 = inip[iden];
  }
  if (thisgeser == totalPesan) {
    setTimeout(mulaiketikA, 500);
  }
}

function aksiakhir() {
  setTimeout(bqmuncul, 400);
}

function initengahan() {
  loveIn.style = "display:none";
  ket.style = "display:none";
  Content.style = "opacity:1;margin-top:7vh";
}

function bqmuncul() {
  bq.style =
    "margin-top:0;position:relative;opacity:1;visibility:visible;transform: scale(1);";
  audio.play();
  waktumuncul();
}

function tombol() {
  Tombol.style = "opacity:1;transform: scale(1);";
  fungsi = 1;
}
document.getElementById("By").onclick = function () {
  if (fungsi == 1) {
    stopRain();
    Tombol.style = "";
    menuju();
    fungsi = 0;
  }
};

var i = 1;
function defwp() {
  wallpaper.style = "transform: scale(1); object-fit: cover;";
}
function kalimatakhir() {
  if (iden >= 1) {
    if (iden % 2 == 0) {
      wallpaper.style = "transform: scale(1); object-fit: cover;";
    } else {
      wallpaper.style = "transform: scale(1.5); object-fit: cover;";
    }
    wallpaper.src = iniwp[iden];
  }
  kalimat.innerHTML = "";
  new TypeIt("#kalimat", {
    strings: ["" + pesanAkhir1],
    startDelay: 10,
    speed: 40,
    cursor: true,
    afterComplete: function () {
      kalimat.innerHTML = pesanAkhir1;
      iden += 1;
      pesanAkhir1 = inip[iden];
      if (pesanAkhir1 == inip[totalPesan + 1]) {
        ftoAwal.src = ftoAkhir.src;
        ftAwal.style =
          "margin-top:80px;transform: scale(.8);transition: all .8s ease";
        setTimeout(jjfoto, 400);
        setInterval(berjatuhan, 300);
        setTimeout(tombol, 1500);
      }
    },
  }).go();
}

function jjfoto() {
  ftoAwal.style.animation = "jj 1s infinite alternate";
}

function mulaiketikA() {
  setInterval(berjatuhan, 300);
  bodyblur.style.opacity = ".15";
  pesanAkhir.style =
    "position:relative;opacity:1;visibility:visible;transform: scale(1)";
  new TypeIt("#pesanAkhir", {
    strings: ["" + pesanAkhir3],
    startDelay: 100,
    speed: 50,
    cursor: false,
    deleteSpeed: 20,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      pesanAkhir.style.animation = "rto .8s infinite alternate";
    },
  }).go();
}

async function menuju() {
  var { value: jawaban } = await swals.fire({
    title: "Isi Pesan Untukku 🥺👉👈",
    input: "text",
    allowOutsideClick: false,
    showCancelButton: false,
  });
  if (jawaban && jawaban.length < 19) {
    window.jawaban = jawaban;
    pesanwhatsapp = jawaban;
    await swals.fire(
      "OK! 🤗",
      "Kirim jawabannya ke WhatsApp aku, ya! 💌",
      "success"
    );
    window.location =
      "https://api.whatsapp.com/send?phone=&text=" + pesanwhatsapp;
    tombol();
  } else {
    await swals.fire(
      "Ups! 😥",
      "Jawaban tidak boleh kosong atau lebih dari 18 karakter, ya!"
    );
    jawab();
  }
}

function createRain() {
  const rain = document.querySelector(".rain");
  const dropCount = 150;

  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement("span");

    const posX = Math.random() * (window.innerWidth + 100);
    const delay = Math.random() * 2;
    const duration = Math.random() * 1.5 + 0.7;

    const size = Math.random() * 1.5 + 0.5;
    const opacity = Math.random() * 0.3 + 0.2;

    drop.style.left = posX + "px";
    drop.style.width = size + "px";
    drop.style.opacity = opacity;
    drop.style.animationDelay = delay + "s";
    drop.style.animationDuration = duration + "s";

    rain.appendChild(drop);
  }
}

// Tambahkan fungsi untuk mengupdate hujan saat resize window
window.addEventListener("resize", () => {
  stopRain();
  createRain();
});

// Update fungsi stopRain untuk membersihkan efek kabut
function stopRain() {
  const rain = document.querySelector(".rain");
  rain.innerHTML = "";
  rain.style.background = "none";
}
