/**************************************************
Florina Knip / 04-09-12 / CIS 270				  
This the JAVAScript  for the Validate
/**************************************************

**************************************************/

//********************    helper methods   ******************
// get a reference to the element with specified id
function $(id) {return document.getElementById(id);}

function setFocus(id){$(id).focus();}

//never used
function capitalizeFirstLetter(string)
{return string.charAt(0).toUpperCase() + string.slice(1);}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
/*allows only letter including spaces
* needed for name validation
*/
function onlyLetters(strValue) {
  var objRegExp  = /^[a-zA-Z\u00C0-\u00ff\s]+$/;		//does not work for "spaces"
  return objRegExp.test(strValue);
}

function displayGreenCheckmark(id) {
	$(id).style.color="green";
	$(id).innerHTML = "&#8730;";
}

function displayError(id, msg) {
	$(id).style.color="red";
	$(id).innerHTML = msg
}

function setBackToDefault(id, hint) {
$(id).style.color="grey";
	$(id).innerHTML = hint
}

function uncheck(id)
{$(id).checked = false;}

//************************************************************

//*******************Error messages: ****************************
var fNameMsg = "Is that really your first name? Only letters allowed!";
var lNameMsg = "Is that really your last name? Only letters allowed!";
var telephoneMsg = "Incorrect format! The correct format is e.g.: 333.333.3333";
var socialSecurityMsg = "Incorrect format! The correct format is e.g.: 333-33-3333!";
var birthdayMonthErrMsg = "Please select a month first!";
var birthdayDayErrMsg = "Please select a day first!"
var birthdayYearErrMsg = "Please select a year first!";
var birthdayErrMsg = "You forgot to choose the date for your Birthday.";
var incomeErrMsg = "Please type in a number between 1 and 1000000!";
var deductionErrMsg = "You must declare your body type!";

//VARIABLES
	var deduction;
	var showRules = false;

/*****			VALIDATION:				*****/
function validateFirstName() {
	var firstName = $("firstName").value;
	if(onlyLetters(firstName)){
		firstName = firstName.capitalize();		//adjust to first letter upperCase
		$("firstName").value = firstName;		//change Textbox
		displayGreenCheckmark("fNameAlert")
	}else{
			setFocus("firstName");
			displayError("fNameAlert", fNameMsg);
			throw new Error(fNameMsg);
	}
}

function validateLastName() {
	var lastName = $("lastName").value;
	if(onlyLetters(lastName)){
		lastName = lastName.capitalize();		//adjust
		$("lastName").value = lastName;			//change Textbox
		displayGreenCheckmark("lNameAlert")
	}else{
		setFocus("lastName");
		displayError("lNameAlert", lNameMsg);
		throw new Error(lNameMsg);
	}
}

function validateTelephone() {
	var telephone = $("telephone").value;
	if(!(/^\d{3}.\d{3}.\d{4}$/.test(telephone))) {
		setFocus("telephone");
		displayError("teleAlert", telephoneMsg);
		throw new Error(telephoneMsg);
	}else{
		displayGreenCheckmark("teleAlert")
	}

/*
	var telephone = $("telephone").value;
	//examine the first part of the input: e.g.: "333."333.3333
	var firstPart = telephone.indexOf(".");
	if(isNaN(telephone.slice(0,3))) {			//true if first part is a number
		throw new Error("A phone number can only contain numbers. Please check your typing again!");
	}
	//examine the second part of the input: e.g.: 333."333."3333
	var secondPart = telephone.indexOf(".", firstPart);
	if(isNaN(telephone.slice(4,7))) {			//true if middle part is a number
		throw new Error("A phone number can only contain numbers. Please check the middle part of your typing!");
	}
	//examine the second part of the input: e.g.: 333.333."3333"
	if(isNaN(telephone.slice(8,11))) {			//true if last part is a number
		throw new Error("A phone number can only contain numbers. Please check the last part of your typing!");
	}
	//ALERTS
	alert(telephone.slice(0,3));
	alert(telephone.slice(7,10));
	alert(telephone.length);
	alert(firstPart);
	alert(secondPart);
	
	if(firstPart == 3 && secondPart == 3 && telephone.length == 12) {
	}else{
		throw new Error("This phone number does not exist. Please check again!");
	}*/
}

function validateSocialSecurity() {
	var socSec = $("social_security").value;
	if(!(/^\d{3}-\d{2}-\d{4}$/.test(socSec))) {
		setFocus("social_security");
		displayError("ssnAlert", socialSecurityMsg);
		throw new Error(socialSecurityMsg);
	}else{
		displayGreenCheckmark("ssnAlert");
	}
}

function validateBirthdayMonth() {

	var month = $("month").value;
	if(month=="") {
		setFocus("month");
		throw new Error(birthdayMonthErrMsg);
	}
}

function validateBirthdayDay() {
	var day = parseInt($("day").value);
	if(isNaN(day)) {
		setFocus("day");
		throw new Error(birthdayDayErrMsg);
	}
}

function validateBirthdayYear() {
	var year = parseInt($("year").value);
	if(isNaN(year)) {
		setFocus("year");
		throw new Error(birthdayYearErrMsg);
	}
}

function validateIncome() {
	var income = $("income_amount").value;
	if(isNaN(income)) {
	setFocus("income_amount");
	displayError("incomeAlert", incomeErrMsg);
	throw new Error(incomeErrMsg);
	}
	if(income<1 || income>1000000) {
		setFocus("income_amount");
		displayError("incomeAlert", incomeErrMsg);
		throw new Error(incomeErrMsg);
	}else{
	displayGreenCheckmark("incomeAlert");
	}
}

function validateDeduction() {
	if($("human").checked) {
		deduction = 1000;
	}else if ($("robot").checked) {
		deduction = 2000;
	}else if($("zombie").checked) {
		deduction = 5000;
	}else if($("human").checked==false && $("robot").checked==false && $("zombie").checked==false){
		throw new Error(deductionErrMsg);
	}
}


/***		CALCULATION					***/
function calculateTax(id) {
	var income = parseFloat($(id).value);
	var tax;
	if(income <= 20000) {
		tax = income * 0.10;
	}
	if(income > 20000 && income <= 50000) {
		tax = (income-20000) * 0.20 + 2000;
	}
	if(income > 50000 && income <= 100000) {
		tax = (income-50000) * 0.25 + 8000;
	}
	if(income > 100000 && income <= 500000) {
		tax = (income-100000) * 0.3 + 20500;
	}
	if(income > 500000 && income <= 1000000) {
		tax = income * 0.01;
	}
	return tax;
}

function displayResults() {
	try {
            validateForm();
    } catch (error) {
          alert(error.message);
    }
    var income = $("income_amount").value
    var myTax = calculateTax("income_amount");
    var deltaTaxDeduction;
    if(myTax-deduction >= 0) {
    	deltaTaxDeduction = myTax-deduction;
    	}else{
    	deltaTaxDeduction = 0;
    	}
    var netIncome = income-deltaTaxDeduction;
    
    $("results").innerHTML= "";
	$("results").innerHTML+= "\nFirst Name:\t\t "+$("firstName").value;
	$("results").innerHTML+= "\nLast Name:\t\t "+$("lastName").value;
	$("results").innerHTML+= "\nTelephone:\t\t "+$("telephone").value;
	$("results").innerHTML+= "\nSSN:\t\t\t "	+$("social_security").value;
	$("results").innerHTML+= "\nBirthday:\t\t " +$("month").value+"/"+$("day").value+"/"+$("year").value;
	$("results").innerHTML+= "\n\nIncome:\t\t\t $" +income;
	$("results").innerHTML+= "\nTax:\t\t\t $" +myTax;
	$("results").innerHTML+= "\nDeduction:\t\t $" +deduction;
	$("results").innerHTML+= "\nNet Income:\t\t $" + netIncome;
}

/*
This method validates everything. Some validations are redundant 
and some methods in the try-catch-block are not even supposed to 
throw errors. Just to make sure that no invalid data goes through.
*/
function validateForm() {
	try {
            validateFirstName();
        } catch (error) {
          throw new Error(error.message);
        }
    try {
            validateLastName();
        } catch (error) {
          throw new Error(error.message);
        }
    try {
            validateTelephone();
        } catch (error) {
          throw new Error(error.message);
        }
    try {
            validateSocialSecurity();
        } catch (error) {
          throw new Error(error.message);
        }
   try {
            validateBirthdayMonth();
        } catch (error) {
          throw new Error(error.message);
        }
     try {
            validateBirthdayDay();
        } catch (error) {
          throw new Error(error.message);
        }
     try {
            validateBirthdayYear();
        } catch (error) {
          throw new Error(error.message);
        }
    try {
            validateIncome();
        } catch (error) {
          throw new Error(error.message);
        }
    try {
            validateDeduction();
        } catch (error) {
          throw new Error(error.message);
        }
}


/***		DISPLAY					***/
function displayRules() {
	if($("display").checked) {
		$("rules").innerHTML= "If income <= 20,000\r\n   tax = 10% of income \r\nIf 20,000 < income <= 50,000\r\n   tax = $2,000 and 20% of amount over $20,000 \r\nIf 50,000 < income <= 100,000\r\n   tax = 8,000 and 25% of amount over $50,000 \r\nIf 100,000 <income <= 500,000\r\n   tax = $20,000 and %30 of amount over $100,000 \r\nIf 500,000 <income <= 1,000,000\r\n   tax = 1% of income. You're welcom... \r\nDeductions: $1k human, $2k robot, $5k zombie";
	}else {$("rules").innerHTML="";
	}
}

function validateAndCalculate() {
	//again redundant try-catch
	try { validateForm();
	}catch(error){
		alert(error.message);
		throw new Error(error.message);
	}
        
        displayResults();
}

/***		CLEAR FORM:	  	***/
function clear() {
	$("firstName").value = ("");
	$("lastName").value = ("");
	$("telephone").value = ("");
	$("month").value = ("");
	$("day").value = ("");
	$("year").value = ("");
	$("income_amount").value = ("");
	$("social_security").value = ("");
	
	// greenCheckmarks disapear and grey hints are displayed again
	setBackToDefault("fNameAlert", "(e.g.: Gloria)");
	setBackToDefault("lNameAlert", "(e.g.: Schmitt)");
	setBackToDefault("teleAlert", "(e.g.: 333.444.5555)");
	setBackToDefault("ssnAlert", "(e.g.: 111-11-1111)");
	setBackToDefault("incomeAlert", "(e.g.: 1000000)");
	//document.getElementById("display").checked=false;
	$("results").value = "";
    $("rules").innerHTML=""
	//uncheck("display");
}

// EVENT HANDLERS:
window.onload = function() 
{
   $("calculate").onclick = validateAndCalculate;
   $("display").onclick =displayRules;
   $("clear").onclick = clear;
   $("firstName").onblur = validateFirstName;
   $("lastName").onblur = validateLastName;
   $("telephone").onblur = validateTelephone;
   $("social_security").onblur = validateSocialSecurity;
   $("month").onblur = validateBirthdayMonth;
   $("day").onblur = validateBirthdayDay;
   $("year").onblur = validateBirthdayYear;
   $("income_amount").onblur = validateIncome; 
}