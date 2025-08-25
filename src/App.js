import React, { useState } from 'react';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [contractMonth, setContractMonth] = useState('');
  const [carrier, setCarrier] = useState('');
  const [plan, setPlan] = useState('');
  const [cashback, setCashback] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contractMonth || !carrier) {
      alert('契約月とキャリアを選択してください。');
      return;
    }

    const now = new Date();
    const contractDate = new Date(contractMonth);
    const monthsPassed =
      now.getFullYear() * 12 + now.getMonth() -
      (contractDate.getFullYear() * 12 + contractDate.getMonth());

    let penalty = 0;
    if (carrier === 'docomo' || carrier === 'au' || carrier === 'softbank') {
      if (monthsPassed < 24) {
        penalty = 1000;
      }
    }

    const finalCashback = parseInt(cashback || '0', 10) - penalty;

    setResult({
      monthsPassed,
      penalty,
      finalCashback,
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

        <label>キャッシュバック額（円）</label>
        <input
          type="number"
          value={cashback}
          onChange={(e) => setCashback(e.target.value)}
          placeholder="例: 30000"
        />

        <button type="submit">チェック</button>
      </form>

      {result && (
        <div className="result">
          <p>契約からの経過月数: {result.monthsPassed}ヶ月</p>
          <p>違約金: {result.penalty}円</p>
          <p>キャッシュバック最終額: {result.finalCashback}円</p>
        </div>
      )}
    </div>
  );
}

export default App;
