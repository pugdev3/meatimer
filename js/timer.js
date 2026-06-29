$(document).ready(function () {
  let endAudio;
  var itsSoOver = false;
  var clock;
  var audioPlayed;

  const currentDate = new Date();
  const currentDateFormatted = new Date(
    currentDate.toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    }),
  );

  const futureDate = new Date("2026-07-01T00:00-03:00");
  const futureDateFormatted = new Date(
    futureDate.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );

  var difference =
    futureDateFormatted.getTime() / 1000 -
    currentDateFormatted.getTime() / 1000;

  function ShowClock() {
    clock = $(".clock").FlipClock(difference, {
      clockFace: "TwentyFourHourClockFace",
      stop: itsOver,
      countdown: true,
    });
    $(".flip-clock-wrapper.ul.li.a.div.up.div.inn").each(function() {
        const html = $(this).html();
        console.log(html);
    })
    if (difference <= 0) {
      itsOver();
    }
  }

  $(".enter").on("click", function () {
    endAudio = new Audio("fnaf.mp3");
    endAudio.load();
    $(".enter").hide();
    $("")
    ShowClock();
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
    $(".intro").fadeOut(2000);
    $(".info").fadeOut(2000, softHideInfo);

    function softHideInfo() {
      $(".intro").css({ opacity: "0.001", "user-select": "none" });
      $(".intro").show();
      $(".info").css({ opacity: "0.001", "user-select": "none" });
      $(".info").show();
      $(".mea1").hide();
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
    }, 8000);
  }
});
