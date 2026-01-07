const CONTACT = {
  phone: "000-0000-0000",
  lineUrl: "https://line.me/ti/p/your-line-id",
  address: "東京都中央区○○ 1-2-3",
  hours: "お問い合わせください",
};

const PRICING = [
  { label: "セット料金 (1時間)", price: "4,000円" },
  { label: "指名料 (1名)", price: "2,000円" },
  { label: "同伴料 (1回)", price: "4,000円" },
];

const FAQ = [
  {
    question: "料金は明確に案内されますか？",
    answer:
      "はい。セット料金・指名料など基本料金を事前にご案内しています。税・サービス料の有無は店舗にてご説明します。",
  },
  {
    question: "お一人でも利用できますか？",
    answer: "お一人様でも落ち着いて過ごせる空間をご用意しています。",
  },
  {
    question: "支払い方法は？",
    answer: "現金・クレジットカード対応予定です。詳細はお問い合わせください。",
  },
];

const initContactPlaceholders = () => {
  document.querySelectorAll("[data-contact]").forEach((el) => {
    const key = el.dataset.contact;
    if (!CONTACT[key]) return;

    if (el.tagName === "A") {
      if (key === "phone") {
        el.href = `tel:${CONTACT.phone}`;
      }
      if (key === "lineUrl") {
        el.href = CONTACT.lineUrl;
        el.target = "_blank";
        el.rel = "noopener";
      }
      if (el.dataset.contactDisplay === "true") {
        el.textContent = CONTACT[key];
      }
      return;
    }

    el.textContent = CONTACT[key];
  });
};

const renderPricing = () => {
  document.querySelectorAll("[data-pricing]").forEach((el) => {
    const rows = PRICING.map(
      (item) => `
        <tr>
          <td>${item.label}</td>
          <td>${item.price}</td>
        </tr>
      `
    ).join("");
    el.innerHTML = rows;
  });
};

const renderMenu = async () => {
  const listEl = document.getElementById("menu-list");
  if (!listEl) return;

  try {
    const response = await fetch("assets/data/menu.json");
    const menuItems = await response.json();
    listEl.innerHTML = menuItems
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.volume}</td>
          <td>${item.price}</td>
        </tr>
      `
      )
      .join("");
  } catch (error) {
    listEl.innerHTML = `<tr><td colspan="3">メニュー情報を読み込めませんでした。</td></tr>`;
  }
};

const initFaq = () => {
  const faqContainer = document.getElementById("faq-list");
  if (!faqContainer) return;

  faqContainer.innerHTML = FAQ.map(
    (item) => `
      <div class="faq-item">
        <div class="faq-question">
          <span>${item.question}</span>
          <span>＋</span>
        </div>
        <div class="faq-answer">${item.answer}</div>
      </div>
    `
  ).join("");

  faqContainer.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
};

const initForm = () => {
  const form = document.querySelector("form[data-contact-form]");
  if (!form) return;
  const message = form.querySelector(".form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const contact = form.querySelector("#contact").value.trim();
    const date = form.querySelector("#date").value.trim();

    if (!name || !contact || !date) {
      message.textContent = "必須項目をご入力ください。";
      return;
    }

    message.textContent = "送信ありがとうございます。担当より折り返しご連絡します。";
    form.reset();
  });
};

const initActiveNav = () => {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initContactPlaceholders();
  renderPricing();
  renderMenu();
  initFaq();
  initForm();
  initActiveNav();
});
