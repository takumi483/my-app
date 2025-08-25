import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import './App.css';

function App() {
  const [contractMonth, setContractMonth] = useState('');
  const [carrier, setCarrier] = useState('');
  const [plan, setPlan] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contractMonth || !carrier || !plan) {
      alert('契約月・キャリア・プラン名を入力してください。');
      return;
    }

    const baseDate = new Date(contractMonth);
    let minDays = 90;
    let safeDays = 180;
    let note = '';

    // キャリア・プランごとの目安
    if (carrier === 'docomo' && plan.toLowerCase().includes('ahamo')) {
      minDays = 90;
      safeDays = 120;
      note = 'ahamoは短期解約に比較的厳しいため、4か月以上推奨。';
    } else if (carrier === 'softbank' && plan.toLowerCase().includes('linemo')) {
      minDays = 90;
      safeDays = 150;
      note = 'LINEMOは早期解約に一定のリスクがあります。';
    } else if (carrier === 'au' && plan.toLowerCase().includes('povo')) {
      minDays = 60;
      safeDays = 90;
      note = 'povoは比較的柔軟ですが、最低3か月以上が安全です。';
    } else if (carrier === 'rakuten') {
      minDays = 30;
      safeDays = 60;
      note = '楽天モバイルは違約金なしだが、3か月未満の解約は調査対象となる可能性あり。';
    } else if (carrier === 'mvno') {
      minDays = 60;
      safeDays = 90;
      note = 'MVNOは短期解約に寛容だが、最低2～3か月は継続を推奨。';
    } else {
      note = '一般的なキャリア契約は3～6か月の利用が安全です。';
    }

    const minDate = addDays(baseDate, minDays);
    const safeDate = addDays(baseDate, safeDays);

    setResult({
      minDate,
      safeDate,
      note,
    });
  };

  return (
    <div className="container">
      <h1>キャリア・プラン別 解約目安チェック</h1>
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
          <option value="mvno">格安SIM（IIJmioなど）</option>
        </select>

        <label>契約プラン名（例: ahamo, LINEMO, povoなど）</label>
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
          <p>📆 最低利用期間の目安：<strong>{format(result.minDate, 'yyyy年MM月')}</strong></p>
          <p>✅ 安全に解約できる目安：<strong>{format(result.safeDate, 'yyyy年MM月')}</strong></p>
          <p>{result.note}</p>
        </div>
      )}
    </div>
  );
}

export default App;
