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
      alert('契約月・キャリア・プランをすべて選択してください。');
      return;
    }

    const baseDate = new Date(contractMonth);
    let safeDays = 180; // デフォルト：180日（6ヶ月）
    let note = '';

    if (carrier === 'docomo' && plan === 'ahamo') {
      safeDays = 365; // ahamoは1年以内の解約で契約解除料が発生する可能性あり :contentReference[oaicite:1]{index=1}
      note = 'ahamoは1年以内の解約で解約料がかかることがあります。';
    } else if (carrier === 'au' && plan === 'povo') {
      safeDays = 180; // au系（povo含む）は180日以上で回避目安 :contentReference[oaicite:2]{index=2}
      note = 'au系プラン（povo含む）は180日以上の利用がブラック回避の目安です。';
    } else if (carrier === 'softbank' && plan === 'linemo') {
      safeDays = 180;
      note = 'LINEMOも短期解約のリスクがあるため、6ヶ月以上の利用が安心です。';
    } else if (carrier === 'rakuten') {
      safeDays = 90;
      note = '楽天モバイルは比較的短くてもOKですが、最低3ヶ月の利用が推奨されます。';
    } else if (carrier === 'mvno') {
      safeDays = 90;
      note = 'MVNO（格安SIM）は比較的寛容ですが、3ヶ月は継続を推奨。';
    } else {
      note = '一般的に3～6ヶ月継続が短期解約に見られにくい目安です。';
    }

    const safeDate = addDays(baseDate, safeDays);
    setResult({ safeDate, note });
  };

  return (
    <div className="container">
      <h1>キャリア／プラン別 安全な解約目安チェック</h1>
      <form onSubmit={handleSubmit}>
        <label>契約月：</label>
        <input
          type="month"
          value={contractMonth}
          onChange={(e) => setContractMonth(e.target.value)}
        />

        <label>キャリア：</label>
        <select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
          <option value="">選択してください</option>
          <option value="docomo">ドコモ</option>
          <option value="au">au（UQ・povo含む）</option>
          <option value="softbank">ソフトバンク／LINEMO</option>
          <option value="rakuten">楽天モバイル</option>
          <option value="mvno">格安SIM（MVNO）</option>
        </select>

        <label>プラン：</label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="">選択してください</option>
          <option value="ahamo">ahamo</option>
          <option value="povo">povo</option>
          <option value="linemo">LINEMO</option>
          <option value="other">他プラン</option>
        </select>

        <button type="submit">解約目安を表示</button>
      </form>

      {result && (
        <div className="result">
          <p>最短で安全な解約目安：<strong>{format(result.safeDate, 'yyyy年MM月')}</strong></p>
          <p>{result.note}</p>
        </div>
      )}
    </div>
  );
}

export default App;
