import React, { useState } from "react";
import { addDays, format } from "date-fns";

export default function App() {
  const [contractDate, setContractDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [plan, setPlan] = useState("");
  const [cashback, setCashback] = useState("");
  const [safeDate, setSafeDate] = useState("");

  const baseDays = {
    docomo: 180,
    au: 211,
    softbank: 181,
    rakuten: 90,
    mvno: 180
  };

  const calculateSafeDate = () => {
    if (!contractDate || !carrier) return;

    let days = baseDays[carrier] || 180;

    const cashbackAmount = parseInt(cashback);
    if (!isNaN(cashbackAmount)) {
      if (cashbackAmount >= 30000) days += 30;
      else if (cashbackAmount >= 10000) days += 15;
    }

    if (plan.toLowerCase().includes("ahamo") || plan.toLowerCase().includes("linemo")) {
      days += 10;
    }

    const resultDate = addDays(new Date(contractDate), days);
    setSafeDate(format(resultDate, "yyyy年MM月dd日"));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>📅 解約安全日チェックツール</h2>

      <div>
        <label>契約日：</label><br />
        <input type="date" value={contractDate} onChange={(e) => setContractDate(e.target.value)} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>キャリア：</label><br />
        <select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
          <option value="">選択してください</option>
          <option value="docomo">ドコモ</option>
          <option value="au">au / UQ / povo</option>
          <option value="softbank">ソフトバンク / LINEMO / Y!mobile</option>
          <option value="rakuten">楽天モバイル</option>
          <option value="mvno">格安SIM (例: IIJmio)</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>プラン名（例：ahamo, LINEMOなど）：</label><br />
        <input type="text" value={plan} onChange={(e) => setPlan(e.target.value)} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>キャッシュバック額（円）：</label><br />
        <input type="number" value={cashback} onChange={(e) => setCashback(e.target.value)} />
      </div>

      <button style={{ marginTop: "15px" }} onClick={calculateSafeDate}>
        安全な解約日を計算する
      </button>

      {safeDate && (
        <div style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
          ✅ 安全に解約できる日は：{safeDate}
        </div>
      )}
    </div>
  );
}
