import React, { useState } from 'react';
import { addMonths, format } from 'date-fns';
import './App.css';

function App() {
  const [contractMonth, setContractMonth] = useState('');
  const [carrier, setCarrier] = useState('');
  const [plan, setPlan] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contractMonth || !carrier) {
      alert('契約月とキャリアを選択してください。');
      return;
    }

    const contractDate = new Date(contractMonth);
    const safeCancelDate = addMonths(contractDate, 3); // ブラックリスト回避の最短期間：3か月

    setResult({
      safeCancelDate,
    });
  };

  return (
    <div className="container">
      <h1>ブラックリスト回避用 解約月チェック</h1>
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
          <option value="mvno">格安SIM (例: IIJmio)</option>
        </select>

        <label>プラン名（例: ahamo, LINEMOなど）</label>
        <input
          type="text"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="プラン名を入力"
        />

        <button type="submit">チェック</button>
      </form>

      {result && (
        <div className="result">
          <p>最短で安全に解約できる目安月：<strong>{format(result.safeCancelDate, 'yyyy年MM月')}</strong></p>
          <p>※ 契約から3か月以上経過が推奨（ブラックリスト回避のため）</p>
        </div>
      )}
    </div>
  );
}

export default App;
