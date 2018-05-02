/**
 * Created by Owner on 5/1/2018.
 */
// data field********************************************************************************************************

// dinner array -- if local storage doesn't have list, it adds default list
var dinnerArr;
if(JSON.parse(localStorage.getItem("dinnerList")) === null){
    dinnerArr = ["Yakisoba", "ramen", "stuffed pepper", "fish and chips", "cheese fondue", "robster", "quesadilla", "pasta", "pizza", "soup"];
}else{
    dinnerArr = JSON.parse(localStorage.getItem("dinnerList"));
}
console.log("LocalStorage: " + JSON.parse(localStorage.getItem("dinnerList")));
console.log("Loaded: " + dinnerArr);


//selected dinner array
var selectedDinnerArr;
if(JSON.parse(localStorage.getItem("7daysDinnerList")) != null){
    selectedDinnerArr = JSON.parse(localStorage.getItem("7daysDinnerList"));
}else{
    selectedDinnerArr = [];
}
console.log("7daysDinnerList: " + selectedDinnerArr);

//randomly selected dinner
var dinnerChoice;

// hide alerts
$("#addAlert").hide();
$("#addSuccess").hide();
$("#deleteAlert").hide();
$("#deleteSuccess").hide();
$("#storageAlert").hide();


// functions **********************************************************************************************************
//select dinner randomly
function selectDinner(dinnerArr){
    // select dinner randomly
    var randomDinner = dinnerArr[Math.floor((Math.random() * dinnerArr.length))].toString();

    return randomDinner;
}


//add new dinner*******************************************************************************************************
$("#btnAdd").click(function(){

    var newItem = ($("#newItem").val()).trim();

    if(newItem == ""){
        $("#addAlert").text("Nothing has inputted.");
        $("#addAlert").show();
        $("#addAlert").delay(4000).fadeOut('slow');
    }else{

        //check if new item already exists in list
        var i;
        var isFound = false;
        for(i = 0; i <= dinnerArr.length; i++){
            if(dinnerArr[i] == newItem){
                isFound = true;
                break;
            }
        }
        if (isFound == true){
            $("#addAlert").html("The item <span id=\"alertNewItem\"></span> already exists in the list.");
            $("#alertNewItem").text("\""+newItem +"\" ");
            $("#addAlert").show();
            $("#addAlert").delay(5000).fadeOut('slow');
        }else{
            dinnerArr.push(newItem);
            $("#successNewItem").text("\""+newItem +"\" ");
            $("#addSuccess").show();
            $("#addSuccess").delay(5000).fadeOut('slow');
        }
    }

    $("#newItem").val ("");
    console.log(dinnerArr);

    //store data on the client
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("dinnerList", JSON.stringify(dinnerArr));
    } else {
        $("#storageAlert").show();
        $("#storageAlert").delay(4000).fadeOut('slow');
    }
});


//delete existing dinner***********************************************************************************************
$("#btnDelete").click(function(){
    var deleteItem = ($("#deleteItem").val()).trim();

    if(deleteItem == ""){
        $("#deleteAlert").text("Nothing has inputted.");
        $("#deleteAlert").show();
        $("#deleteAlert").delay(4000).fadeOut('slow');
    }else {

        var i;
        var isFound = false;
        for (i = 0; i <= dinnerArr.length; i++) {
            if (dinnerArr[i] == deleteItem) {
                dinnerArr.splice(i, 1);
                $("#successDeleteItem").text("\""+deleteItem +"\" ");
                $("#deleteSuccess").show();
                $("#deleteSuccess").delay(4000).fadeOut('slow');
                isFound = true;
            }
        }
        if (isFound == false) {
            $("#deleteAlert").html("Cannot find the item <span id=\"alertDeleteItem\"></span>");
            $("#alertDeleteItem").text("\"" + deleteItem + "\" ");
            $("#deleteAlert").show();
            $("#deleteAlert").delay(4000).fadeOut('slow');
        }
    }
    $("#deleteItem").val ("");
    console.log(dinnerArr);
    //store data on the client
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("dinnerList",JSON.stringify(dinnerArr));
    } else {
        $("#storageAlert").show();
        $("#storageAlert").delay(4000).fadeOut('slow');
    }
});


//when click tell me button, it shows randomly selected dinner *******************************************************
$("#tellMe").click(function(){
    dinnerChoice = selectDinner(dinnerArr);
    $("#answer").html("<h1>" + dinnerChoice + "</h1>");
});


//when click select button, it stores selected dinner ****************************************************************
$("#btnSelect").click(function(){

    var dinnerOfToday =  dinnerChoice;
    var i;
    var isFound = false;

    if(selectedDinnerArr.length == 0){  //no item in the list
        selectedDinnerArr.push(dinnerOfToday)
        console.log(selectedDinnerArr);
    }else{ //item exists in the list, ask if the user wants to add it
        for(i = 0; i < selectedDinnerArr.length; i++) {
            if(selectedDinnerArr[i] == dinnerOfToday){ //selected item is exists in the list
               var r = confirm("You had \"" + dinnerOfToday + "\" " + (selectedDinnerArr.length - i) + " day(s) ago.\n Are you sure you want it again?");
                if (r == true) {// if select yes, add the item in the list
                    selectedDinnerArr.push(dinnerOfToday);
                    console.log(selectedDinnerArr);
                    isFound = true;
                    break;
                } else { //if select no, back to selection
                    isFound = true;
                    break;
                }
            }else{
                isFound = false;
            }
        }

        //if no selected item in the list, add the item in the list
        if(isFound == false){
        selectedDinnerArr.push(dinnerOfToday);
        console.log(selectedDinnerArr);
        }
    }

    //store only dinners for 7 days
    if(selectedDinnerArr.length > 6){
        selectedDinnerArr.shift();
    }

    //store data on the client
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("7daysDinnerList", JSON.stringify(selectedDinnerArr));
    } else {
        $("#storageAlert").show();
        $("#storageAlert").delay(4000).fadeOut('slow');
    }
});