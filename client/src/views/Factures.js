import React from 'react'

function printElem(data) {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write(`
      <html>
      <head>
        <title>document.title</title>
      </head>
      <body>
        <h1>${document.title}</h1>
      </body>
      </html>
    `);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

export default function Factures() {
  return (
    <div>
      <div id="el">ghjkh</div>
      <button onClick={() => printElem("el")}>Print</button>
    </div>
  )
}