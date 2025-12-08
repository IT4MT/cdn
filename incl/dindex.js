
	function validatePassword() {

	var defaultcurrentPass,changenewPass,RetypePassword,output = true;
//	defaultcurrentPass = document.frmChange.defaultcurrentPass;
	changenewPass = document.frmChange.changenewPass;
	RetypePassword = document.frmChange.RetypePassword;

	var np = changenewPass.value.length;
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
//var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#%\^])(?=.{6,})");



	if(strongRegex.test(changenewPass.value)) {
//	if /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@%^]).{8,}$.test(changenewPass.value) {
	var devnull = true;
	} else {
        alert("At least one capital, one small, one number and one spe. char. is required.");
        output = false;
	}


	var pattern = new RegExp(/[~$*\+=)(\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
//	var pnum = new RegExp(/\d{1}/);
//	var caps = new RegExp(/[A-Z]{1}/i);

//#"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"


//	var myregex = new RegExp(/[a-z]+[A-Z]+[0-9]*/);
//        var checkSpecial = new RegExp(/#@^%{1}/i);


//	if (myregex.test(changenewPass.value)) {
//	var devnull = true;
// 	} else {
//        alert("At least one capital, one small and one number is required.");
//        output = false;
//	}

//	if (checkSpecial.test(changenewPass.value)) {
//	var devnull = true;
// 	} else {
//       alert("Special char. not used or not from the approved list (# @ % or ^).");
//       output = false;
//	}


   if (pattern.test(changenewPass.value)) {
        alert("The only special char permitted are # @ % or ^");
	output = false;
    }

 //   if (pnum.test(changenewPass.value)) {
//	var devnull = true;
//	} else {
//        alert("You need at least one number between 0 and 9");
//	output = false;
 //   }

  //  if (caps.test(changenewPass.value)) {
//	var devnull = true;
//	} else {
//        alert("You need at least one capital letter");
//	output = false;
 //   }


//	if(!defaultcurrentPass.value) {
//
//		defaultcurrentPass.focus();

//		document.getElementById("defaultcurrentPass").innerHTML = "required";

//		output = false;

//	}

	else if(!changenewPass.value) {

		changenewPass.focus();

		document.getElementById("changenewPass").innerHTML = "required";

		output = false;

	}

	else if(!RetypePassword.value) {

		RetypePassword.focus();

		document.getElementById("RetypePassword").innerHTML = "required";

		output = false;

	}

	if(changenewPass.value != RetypePassword.value) {
		changenewPass.value="";
		RetypePassword.value="";
		changenewPass.focus();
		document.getElementById("RetypePassword").innerHTML = "Both Password are not same";
		output = false;
	}

//	if(changenewPass.value == defaultcurrentPass.value) {
//		changenewPass.value="";
//		RetypePassword.value="";
//		changenewPass.focus();
//		document.getElementById("RetypePassword").innerHTML = "Can't reuse same Password";
//		output = false;
//	}

//        if(document.frmChange.RetypePassword.value.length < 6) {
        if(np < 6) {
               changenewPass.value="";
               RetypePassword.value="";
               changenewPass.focus();
               document.getElementById("RetypePassword").innerHTML = "Must be at least 8 char.";
               output = false;
       }



	return output;

	}
