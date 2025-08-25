import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import './App.css';

function App() {
  const [contractMonth, setContractMonth] = useState('');
  const [carrier, setCarrier] = useState('');
  const [campaign, setCampaign] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contractMonth || !carrier || !campaign) {
      alert('契約月・キャリア・キャンペーン内容をすべて選択してください。');
      return;
    }

    const baseDate = new Date(contractMonth);
    let minDays = 90;
    let safeDays = 180;
    let note = '';

    switch (campaign) {
      case 'high_cashback':
        minDays = 180;
        safeDays = 211;
        note = '※3万円以上の高額キャッシュバック案件向け';
        break;
      case 'mid_cashback':
        minDays = 90;
        safeDays = 180;
        note = '※1～3万円の中額キャッシュバック案件向け';
        break;
      case 'popular_model':
        minDays = 90;
        safeDays = 180;
        note = '※人気機種・即終了キャンペーン向け';
        break;
      case 'multi_mnp':
        minDays = 180;
        safeDays = 240;
        note = '※複数回線・連続MNPはリスクが高いため、長めの利用が推奨されます。';
        break;
      default:
        break;
    }

    const minDate = addDays(baseDate, minDays);
    const safeDate = addDays(baseDate, safeDays);

    setResult({
      carrier,
      minDate,
      safeDate,
      note,
    });
  };

  return (
    <div className="container">
      <h1>キャリア・キャンペーン別 解約目安チェック</h1>
      <form onSubmit={handleSubmit}>
        <label>契約月：</label>
        <input
          type="month"
          value={contractMonth}
          onChange={(e) => setContractMonth(e.target.value)}
        />

        <label>キャリアを選択</label>
        <select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
          <option value="">選択してください</option>
          <option value="docomo">ドコモ</option>
          <option value="au">au / UQ / povo</option>
          <option value="softbank">ソフトバンク / LINEMO / Y!mobile</option>
          <option value="rakuten">楽天モバイル</option>
          <option value="mvno">格安SIM（IIJmio等）</option>
        </select>

        <label>キャンペーン内容を選択</label>
        <select value={campaign} onChange={(e) => setCampaign(e.target.value)}>
          <option value="">選択してください</option>
          <option value="high_cashback">高額キャッシュバック（3万円以上）</option>
          <option value="mid_cashback">中額キャッシュバック（1～3万円）</option>
          <option value="popular_model">人気機種・即終了キャンペーン</option>
          <option value="multi_mnp">連続MNP／複数回線</option>
        </select>

        <button type="submit">チェック</button>
      </form>

      {result && (
        <div className="result">
          <p>選択キャリア：<strong>{result.carrier}</strong></p>
          <p>📆 最低利用期間の目安：<strong>{format(result.minDate, 'yyyy年MM月')}</strong></p>
          <p>✅ 安全に解約できる目安：<strong>{format(result.safeDate, 'yyyy年MM月')}</strong></p>
          <p>{result.note}</p>
        </div>
      )}
    </div>
  );
}

export default App;
