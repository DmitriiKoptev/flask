let values = ["", "", "", ""]
let file_container = [""]
let codes = ["tp-1-kln", "tp-1-rop", "tp-1-taa"]

function check(){
    if (codes.includes(values[2])){
        $(`#${values[2]}`).addClass('file_open');
    }
}

function value_input(){
    values[2] = (document.getElementsByClassName("select3")[0].value)
}

function collapse(){
    $('.file-content').removeClass('file_open');
    $('.file-content').addClass('file_empty');
}

document.getElementsByClassName("select1")[0].addEventListener("change", (event) => {
    collapse()
    values[1] = '';
    values[2] = '';
    // value_input()
    check()
    console.log(values)
});

document.getElementsByClassName("select2")[0].addEventListener("change", (event) => {
    collapse()
    values[2] = '';
    // value_input()
    check()
    console.log(values)
});

document.getElementsByClassName("select3")[0].addEventListener("change", (event) => {
    collapse()
    value_input()
    check()
    console.log(values)
});