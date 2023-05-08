let values = ["", "", "", ""]

// function check(){
//     $('.table').addClass('open');
//     document.getElementsByClassName("table-container__buttons")[0].style.display = "flex";
// }

// function collapse(){
//     $('.table').removeClass('open');
//     $('.table').addClass('empty');
//     document.getElementsByClassName("table-container__buttons")[0].style.display = "none";
// }

document.getElementsByClassName("select1")[0].addEventListener("change", (event) => {
    // collapse()
    document.getElementById("main-buttons").style.display = "none";
    document.getElementById("main-table").style.display = "none";
    values[0] = (document.getElementsByClassName("select1")[0].value)
});

document.getElementsByClassName("select2")[0].addEventListener("change", (event) => {
    // collapse()
    document.getElementById("main-buttons").style.display = "none";
    document.getElementById("main-table").style.display = "none";
    values[1] = (document.getElementsByClassName("select2")[0].value)
});

document.getElementsByClassName("select3")[0].addEventListener("change", (event) => {
    // collapse()
    document.getElementById("main-buttons").style.display = "none";
    document.getElementById("main-table").style.display = "none";
    values[2] = (document.getElementsByClassName("select3")[0].value)
    values[3] = `${values[2]}-${values[0]}-${values[1]}`
    localStorage.setItem("name", values[3]);
    // check()
});

