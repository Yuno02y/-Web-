const MENU_ITEMS = [
  { name: "ドンペリ二ヨン", volume: "720ml", price: 90000, category: "ボトル" },
  { name: "山崎", volume: "720ml", price: 35000, category: "ボトル" },
  { name: "響", volume: "720ml", price: 35000, category: "ボトル" },
  { name: "ヘネシーXO", volume: "720ml", price: 35000, category: "ボトル" },
  { name: "モエシャンパンピンク", volume: "720ml", price: 35000, category: "ボトル" },
  { name: "モエシャンパン", volume: "720ml", price: 30000, category: "ボトル" },
  { name: "ヘネシーハイネック", volume: "720ml", price: 25000, category: "ボトル" },
  { name: "シーバス", volume: "720ml", price: 15000, category: "ボトル" },
  { name: "オールドパー", volume: "720ml", price: 15000, category: "ボトル" },
  { name: "ダニエル", volume: "-", price: 15000, category: "ボトル" },
  { name: "ワイン", volume: "-", price: 15000, category: "ボトル" },
  { name: "スパークリングワイン", volume: "-", price: 15000, category: "ボトル" },
  { name: "ワイン果実", volume: "720ml", price: 10000, category: "ボトル" },
  { name: "吉兆者", volume: "720ml", price: 10000, category: "ボトル" },
  { name: "一刻者", volume: "720ml", price: 8000, category: "ボトル" },
  { name: "黒霧島", volume: "720ml", price: 8000, category: "ボトル" },
  { name: "眞露", volume: "720ml", price: 6000, category: "ボトル" },
  { name: "テキーラ（ショット）", volume: "-", price: 2000, category: "ショット" },
  { name: "梅酒（グラス）", volume: "-", price: 1000, category: "グラス" },
  { name: "ビール", volume: "340ml", price: 1000, category: "ビール" },
];

const formatPrice = (value) => `${value.toLocaleString("ja-JP")}円`;

const renderMenu = () => {
  const container = document.getElementById("menu-list");
  if (!container) return;

  const categories = [...new Set(MENU_ITEMS.map((item) => item.category))];

  container.innerHTML = categories
    .map((category) => {
      const items = MENU_ITEMS.filter((item) => item.category === category);
      const rows = items
        .map(
          (item) => `
          <tr>
            <th>${item.name}</th>
            <td>${item.volume}</td>
            <td>${formatPrice(item.price)}</td>
          </tr>
        `
        )
        .join("");

      return `
        <div class="menu-card">
          <h3>${category}</h3>
          <table class="menu-table">
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");
};

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});
