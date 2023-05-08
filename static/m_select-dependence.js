// // Map your choices to your option value
// let subj_4116_4117_4118 = [
//    ['Технологии программирования', 'Теория систем и системный анализ', 'Теория автоматов и формальных языков'],
//    ['tp', 'tsisa', 'taifya']
// ]
// let subj_4125_4126_4127 = [
//    ['Компьютерная графика', 'Математический анализ', 'Линейная алгебра и аналитическая геометрия', 'Основы программирования'],
//    ['kg', 'ma', 'laiag', 'op']
// ]
// let subj_4275_4276_4277 = [
//    ['Физика', 'Дискретная математика', 'Информационные системы и технологии'],
//    ['f', 'dm', 'isit']
// ]

// var lookup = {
//     '4116': subj_4116_4117_4118[0],
//     '4117': subj_4116_4117_4118[0],
//     '4118': subj_4116_4117_4118[0],
//     '4125': subj_4125_4126_4127[0],
//     '4126': subj_4125_4126_4127[0],
//     '4127': subj_4125_4126_4127[0],
//     '4275': subj_4275_4276_4277[0],
//     '4276': subj_4275_4276_4277[0],
//     '4277': subj_4275_4276_4277[0]
// };

// var subj_values = {
//    '4116': subj_4116_4117_4118[1],
//    '4117': subj_4116_4117_4118[1],
//    '4118': subj_4116_4117_4118[1],
//    '4125': subj_4125_4126_4127[1],
//    '4126': subj_4125_4126_4127[1],
//    '4127': subj_4125_4126_4127[1],
//    '4275': subj_4275_4276_4277[1],
//    '4276': subj_4275_4276_4277[1],
//    '4277': subj_4275_4276_4277[1]
// };
 
// // When an option is changed, search the above for matching choices
// $('.select1').on('change', function() {
//    // Set selected option as variable
//    let selectValue = $(this).val();
//    if (selectValue != "0") {
//       document.getElementsByClassName("select3")[0].disabled = false;
//       // Empty the target field
//       $('.select3').empty();
//       $('.select3').append("<option>" + '-- требуется выбор --' + "</option>");

//       // For each chocie in the selected option
//       for (i = 0; i < lookup[selectValue].length; i++) {
//          // Output choice in the target field
//          $('.select3').append("<option value='" + subj_values[selectValue][i] + "'>" + lookup[selectValue][i] + "</option>");
//       }
//    }
//    else{
//       document.getElementsByClassName("select3")[0].disabled = true;
//       $('.select3').empty();
//       $('.select3').append("<option>" + '-- выберите предыдущие поля --' + "</option>");
//    }
//  });



//  var subjectObject = {
//    "1": {
//      "tp": ["kln", "rop", "taa"],
//      "tsisa": ["Borders", "Margins", "Backgrounds", "Float"],
//      "taifya": ["Variables", "Operators", "Functions", "Conditions"]
//    },
//    "2": {
//      "PHP": ["Variables", "Strings", "Arrays"],
//      "SQL": ["SELECT", "UPDATE", "DELETE"]
//    }
//  }
//  window.onload = function() {
//    var semesterSel = document.getElementById("semester");
//    var subjectSel = document.getElementById("subject");
//    var teacherSel = document.getElementById("teacher");
//    for (var x in subjectObject) {
//      semesterSel.options[semesterSel.options.length] = new Option(x, x);
//    }
//    semesterSel.onchange = function() {
//      //empty Chapters- and Topics- dropdowns
//      teacherSel.length = 1;
//      subjectSel.length = 1;
//      //display correct values
//      for (var y in subjectObject[this.value]) {
//        subjectSel.options[subjectSel.options.length] = new Option(y, y);
//      }
//    }
//    subjectSel.onchange = function() {
//      //empty Chapters dropdown
//      teacherSel.length = 1;
//      //display correct values
//      var z = subjectObject[semesterSel.value][this.value];
//      for (var i = 0; i < z.length; i++) {
//        teacherSel.options[teacherSel.options.length] = new Option(z[i], z[i]);
//      }
//    }
//  }
let id_to_name = {
  semester: 'Семестр',
  subject: 'Дисциплину',
  teacher: 'Преподавателя'
};

function get_json_data(id, parent_id) {
  var html_code = '';
  $.getJSON('../static/dataset.json', function(data) {
    // ListName = id.substr(0, 1).toUpperCase() + id.substr(1);
    ListName = id_to_name[id];
      // if (document.getElementById(id).hasAttribute('disabled')){
      //   document.getElementById(id).disabled = false;
      // }
      html_code += '<option value="0">-- требуется выбор --</option>';
      $.each(data, function(key, value) {
          if (value.parent_id == parent_id) {
              html_code += '<option value="' + value.id + '">' + value.name + '</option>';
          }
      });
      $('#' + id).html(html_code);
  });

}
get_json_data('semester',0);

$(document).on('change', '#semester', function() {
  var semester_id = $(this).val();
  if (semester_id != '') {
      get_json_data('subject', semester_id);
  } else {
      $('#subject').html('<option value="0">-- требуется выбор --</option>');
  }
  $('#teacher').html('<option value="0">-- выберите предыдущее поле --</option>');
});

$(document).on('change', '#subject', function() {
  var subject_id = $(this).val();
  if (subject_id != '') {
      get_json_data('teacher', subject_id);
  } else {
      $('#teacher').html('<option value="0">-- выберите --</option>');
  }
});