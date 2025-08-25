import React, { useState } from 'react';
import { format, addMonths } from 'date-fns';
import './App.css';

function App() {
  const [contractDate, setContractDate] = useState('');
  const [carrier, setCarrier] = useState('');
  const [cancelMonth, setCancelMonth] = useState('');

  const calculateCancelMonth = () => {
    if (!contractDate || !carrier) {
      alert('契約月とキャリアを入力してください');
      return;
    }

    const startDate = new Date(contractDate);
    let cancelDate;

    if (carrier === 'docomo') {
      cancelDate = addMonths(startDate, 24);
    } else if (carrier === 'au') {
      cancelDate = addMonths(startDate, 23);
    } else if (carrier === 'softbank') {
      cancelDate = addMonths(startDate, 22);
    }

    const result = format(cancelDate, 'yyyy年MM月');
    setCancelMonth(result);
  };

  return (
    <div className="container">
      <h1>解約月チェックツール</h1>

      <div className="form-group">
        <label>契約月：</label>
        <input
          type="month"
          value={contractDate}
          onChange={(e) => setContractDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>キャリア：</label>
        <select
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="docomo">ドコモ</option>
          <option value="au">au</option>
          <option value="softbank">ソフトバンク</option>
        </select>
      </div>

      <button onClick={calculateCancelMonth}>解約月をチェック</button>

      {cancelMonth && (
        <div className="result">
          <p>解約月は <strong>{cancelMonth}</strong> です。</p>
        </div>
      )}
    </div>
  );
}

export default App;
