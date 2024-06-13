import React from 'react';

function MyPage() {
  const rows = 5;
  const columns = 5;

  // 표의 행과 열을 생성하는 함수
  const createTable = () => {
    let table = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push(<td key={j}>{i * columns + j + 1}</td>);
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  return (
    <div>
      <h1 className='userIP'>5x5 표</h1>
      <table border="1">
        <tbody>
          {createTable()}
        </tbody>
      </table>
    </div>
  );
}

export default MyPage;
