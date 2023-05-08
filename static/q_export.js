// function exportReportToExcel() {
//     TableToExcel.convert($( "#export_this" ), {
//       name: `export.xlsx`,
//       sheet: {
//         name: 'Sheet 1'
//       }
//     });
//   }


function exportReportToExcel() {
  let n = localStorage.getItem("name");
  let table = document.getElementsByTagName("table"); // you can use document.getElementById('tableId') as well by providing id to the table tag
  TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
    name: `${n}.xlsx`, // fileName you could use any name
    sheet: {
      name: 'Лист 1' // sheetName
    }
  });
}

function downloadPDFWithBrowserPrint(){
  var divContents = $("#main-table").html();
  var printWindow = window.open('', '', 'height=400,width=800');
  printWindow.document.write('<html><head><title>Таблица</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(divContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};


// 

// ${values[3]}