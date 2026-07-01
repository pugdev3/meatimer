$(document).ready(function () {
  let endAudio;
  let endAudio2;
  let endMusic;
  let legeMusic1;
  let legeMusic2;
  var itsSoOver = false;
  var clock;
  var audioPlayed;

  const currentDate = new Date();
  const currentDateFormatted = new Date(
    currentDate.toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    }),
  );

  const futureYear = new Date().getFullYear();

  const futureDate = new Date(`${futureYear + 1}-07-01T00:00-03:00`);
  const futureDateFormatted = new Date(
    futureDate.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );

  var difference =
    futureDateFormatted.getTime() / 1000 -
    currentDateFormatted.getTime() / 1000;

  function ShowClock() {
    clock = $(".clock").FlipClock(difference, {
      clockFace: "DailyCounter",
      stop: itsOver,
      countdown: true,
    });
    if (difference <= 0) {
      itsOver();
    }
  }

  $(".enter").on("click", function () {
    // Load our sound effects / music owo
    endAudio = new Audio("music/fnaf.mp3");
    endAudio.load();
    endAudio2 = new Audio("music/chaos.mp3");
    endAudio2.load();
    endMusic = new Audio("music/mea.mp3");
    endMusic.load();
    legeMusic1 = new Audio("music/echoingmind.mp3");
    legeMusic1.load();
    legeMusic2 = new Audio("music/utopia.mp3");
    legeMusic2.load();

    $(".enter").hide();
    ShowClock();
  });

  $(".butfim").on("click", function() {
    itsOver();
  });

  function itsOver() {
    if (itsSoOver == true) {
      return;
    }
    itsSoOver = true;

    // Launch confetti
    function ShowConfetti() {
      let positionList = [
        { x: 0, y: 0 },
        { x: window.screen.width, y: 0 },
        { x: window.screen.width / 2, y: 0 },
        { x: 0, y: window.screen.height },
        { x: window.screen.width, y: window.screen.height },
        { x: window.screen.width / 2, y: window.screen.height / 2 },
      ];

      for (let i = 0; i < positionList.length; i++) {
        setTimeout(
          () => confetti({ position: positionList[i], count: 300 }),
          i * 300,
        );
      }
    }

    // Hide elements
    $(".fim").fadeOut(2000);
    $(".aposta").fadeOut(2000);
    $(".intro").fadeOut(2000);
    $(".info").fadeOut(2000, softHideInfo);

    function softHideInfo() {
      $(".intro").css({ opacity: "0.001", "user-select": "none" });
      $(".intro").show();
      $(".info").css({ opacity: "0.001", "user-select": "none" });
      $(".info").show();
      $(".mea1").hide();
    }

    function playEndSequence() {
      setTimeout(() => {
        $(".loading").show();
        $(".info").hide();
        $(".intro").hide();

        let bgVideo = $("#background");
        bgVideo.get(0).controls = false;
        bgVideo.get(0).src = "media/background.webm";
        bgVideo.get(0).play();
        bgVideo.show();

        $("body").append(
          '<div class="endinfo"><p class="text texshadow">então... e o namoradinho?</p><img class="mea" src="./media/mearelacionamentos1.png" /></div>',
        );
        $("body").append(
          '<footer class="footer"><p class="text texshadow texfooter">Criado por <a href="https://github.com/pugdev3">@pugdev3</a> / Música por <a href="https://sndo.ffm.to/dx9vezz">@zlegend77</a> / Muito obrigado por visitar o website <3 </p></footer>',
        );
        $(
          '<div class="endintro"><p class="text texshadow">parece que o tempo acabou mea...</p><img class="gatinho" src="./media/gatinho.webp" /></div>',
        ).insertBefore(".timer");
      }, 2000);
      setTimeout(() => {
        endAudio2.play();
      }, 3000);
      setTimeout(() => {
        endMusic.play();
        endMusic.addEventListener("ended", function () {
          setTimeout(() => {
            legeMusic1.play();
          }, 1000);
        });
        legeMusic1.addEventListener("ended", function () {
          setTimeout(() => {
            legeMusic2.play();
          }, 1000);
        });
        $(".loading").hide();
      }, 6000);
      setTimeout(() => {
        $("body").append('<img class="meatwo" src="./media/mea.png" />');
        setTimeout(() => {
          $(".mea").attr("src", "./media/mearelacionamentos2.png");
          $(".meatwo").remove();
        }, 500);
      }, 22300);
    }

    var styles = `
            html {
                --cor1: #391c31;
                --cor2: #311a1a;
            }
        `;
    var styles2 = `
            .timerend {
                color: #4c4b4b;
                text-shadow: 0 1px 2px #000; 
            }
        `;
    $("<style>").text(styles).appendTo("head");
    $(".clock").fadeOut(2000);
    endAudio.play();
    ShowConfetti();
    setTimeout(() => {
      $(".clock").hide();
      $(".timerend").show();
    }, 2000);
    setTimeout(() => {
      $(".timerend").removeClass("blink");
      $("<style>").text(styles2).appendTo("head");
      playEndSequence();
    }, 8000);
  }
});
