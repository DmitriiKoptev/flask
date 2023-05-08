// Map your choices to your option value
let subj_4116_4117_4118 = [
   ['Технологии программирования', 'Теория систем и системный анализ', 'Теория автоматов и формальных языков'],
   ['tp', 'tsisa', 'taifya']
]
let subj_4125_4126_4127 = [
   ['Компьютерная графика', 'Математический анализ', 'Линейная алгебра и аналитическая геометрия', 'Основы программирования'],
   ['kg', 'ma', 'laiag', 'op']
]
let subj_4275_4276_4277 = [
   ['Физика', 'Дискретная математика', 'Информационные системы и технологии'],
   ['f', 'dm', 'isit']
]

var lookup = {
    '4116': subj_4116_4117_4118[0],
    '4117': subj_4116_4117_4118[0],
    '4118': subj_4116_4117_4118[0],
    '4125': subj_4125_4126_4127[0],
    '4126': subj_4125_4126_4127[0],
    '4127': subj_4125_4126_4127[0],
    '4275': subj_4275_4276_4277[0],
    '4276': subj_4275_4276_4277[0],
    '4277': subj_4275_4276_4277[0]
};

var subj_values = {
   '4116': subj_4116_4117_4118[1],
   '4117': subj_4116_4117_4118[1],
   '4118': subj_4116_4117_4118[1],
   '4125': subj_4125_4126_4127[1],
   '4126': subj_4125_4126_4127[1],
   '4127': subj_4125_4126_4127[1],
   '4275': subj_4275_4276_4277[1],
   '4276': subj_4275_4276_4277[1],
   '4277': subj_4275_4276_4277[1]
};
 
// When an option is changed, search the above for matching choices
$('.select2').on('change', function() {
   // Set selected option as variable
   let selectValue = $(this).val();
   if (selectValue != "0") {
      document.getElementsByClassName("select3")[0].disabled = false;
      // Empty the target field  
      // $('.select3').empty();
      // $( "#change" ).remove();
      // document.getElementById("subject").options[0].remove();
      // $('.select3').prepend("<option>" + '-- требуется выбор --' + "</option>");   
   }
   else{
      document.getElementsByClassName("select3")[0].disabled = true;
      $('.select3').empty();
   }
 });


 $('.select1').on('change', function() {
   let selectValue = $(this).val();
   if (selectValue != "0") {
      document.getElementsByClassName("select2")[0].disabled = false;
      $('.select3').empty();
      $('.select3').append("<option>" + '-- выберите предыдущее поле --' + "</option>");
      for (i = 0; i < lookup[selectValue].length; i++) {
         $('.select3').append("<option value='" + subj_values[selectValue][i] + "'>" + lookup[selectValue][i] + "</option>");
      }
   }
   else{
      document.getElementsByClassName("select2")[0].disabled = true;
      $('.select3').empty();
      $('.select3').append("<option>" + '-- выберите предыдущие поля --' + "</option>");
   }
   // localStorage.setItem('selectedtem', document.getElementById('date').value);
 });

//  if (localStorage.getItem('selectedtem')) {
//    document.getElementById('date').options[localStorage.getItem('selectedtem')].selected = true;
//   }