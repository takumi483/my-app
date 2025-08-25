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
    let blacklistSafeDate = addMonths(contractDate, 3); // ブラックリスト対策：最低3か月
    let extraNote = '';
    let suggestDate = null;

    if (carrier === 'docomo' || carrier === 'au' || carrier === 'softbank') {
      suggestDate = addMonths(contractDate, 24); // 旧2年契約向け
      extraNote = '※2年契約の違約金がかからない月も考慮しています';
    } else {
      suggestDate = blacklistSafeDate;
    }

    setResult({
      suggestDate,
      extraNote,
    });
  };

  return (
    <div className="container">
      <h1>解約月チェックツール</h1>
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
          <p>ブラックリスト回避も考慮した安全な解約目安月：<strong>{format(result.suggestDate, 'yyyy年MM月')}</strong></p>
          {result.extraNote && <p>{result.extraNote}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
