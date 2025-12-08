/************************************* this is the default handle function of ajax*****************************************/
function GetXmlHttpObject(handler)
{ 
var objXmlHttp=null

if (navigator.userAgent.indexOf("Opera")>=0)
{
objXmlHttp=new XMLHttpRequest()
objXmlHttp.onload=handler
objXmlHttp.onerror=handler 
return objXmlHttp
}
if (navigator.userAgent.indexOf("MSIE")>=0)
{ 
var strName="Msxml2.XMLHTTP"
if (navigator.appVersion.indexOf("MSIE 5.5")>=0)
{
strName="Microsoft.XMLHTTP"
} 
try
{ 
objXmlHttp=new ActiveXObject(strName)
objXmlHttp.onreadystatechange=handler 
return objXmlHttp
} 
catch(e)
{ 
alert("Error. Scripting for ActiveX might be disabled") 
return 
} 
} 
if (navigator.userAgent.indexOf("Mozilla")>=0)
{
objXmlHttp=new XMLHttpRequest()
objXmlHttp.onload=handler
objXmlHttp.onerror=handler 
return objXmlHttp
}
} 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchWashedCar()
{ 

 	    s_cat=document.getElementById("carwash_cat").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
	    		
		var url="car_washed_div.php?cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(car_washed_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function car_washed_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("car_washed_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("car_washed_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_carwash(j)
{ 
 	    s_cat=document.getElementById("carwash_cat").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
	    		
		var url="car_washed_div.php?pageNum_rr="+j+"&selectme="+j+"&cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(car_washed_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function getAllWashedCar()
{
	var allid='';
	for(var i=1;i<document.getElementById("allCars").value;i++)
	{
		if(document.getElementById("car_id"+i).checked==true)
		{
			if(allid)
			{
				allid=allid+","+document.getElementById("car_id"+i).value;
			}
			else
			{
				allid=document.getElementById("car_id"+i).value;
			}
		}
	}
	document.getElementById("car_id_hidden").value=allid;
}

//////////////////////////////////end car wash ///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getProject(id1,id2)
{ 
		var url="pro_div.php?id="+id1+"&branch="+id2+"&search=y";
		xmlHttp=GetXmlHttpObject(getpro_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function getpro_div() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("proj_div").innerHTML=xmlHttp.responseText 
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchTask()
{ 

 	    s_heading=document.getElementById("heading").value;
		s_project_id=document.getElementById("project_id").value;
		s_status=document.getElementById("status").value;
		s_user=document.getElementById("user").value;
		s_start_date=document.getElementById("start_date").value;
		s_end_date=document.getElementById("end_date").value;
	    		
		var url="task_div.php?heading="+s_heading+"&project_id="+s_project_id+"&status="+s_status+"&user="+s_user+"&start_date="+s_start_date+"&end_date="+s_end_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(task_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function task_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("task_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("task_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_function(j)
{ 
 	    s_heading=document.getElementById("heading_hidden").value;
		s_project_id=document.getElementById("project_id_hidden").value;
		s_status=document.getElementById("status_hidden").value;
		s_user=document.getElementById("user_hidden").value;
		s_start_date=document.getElementById("start_date_hidden").value;
		s_end_date=document.getElementById("end_date_hidden").value;
	    		
		var url="task_div.php?pageNum_rr="+j+"&selectme="+j+"&heading="+s_heading+"&project_id="+s_project_id+"&status="+s_status+"&user="+s_user+"&start_date="+s_start_date+"&end_date="+s_end_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(task_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 


///////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchMyTask()
{ 
 	    s_heading=document.getElementById("heading").value;
		s_project_id=document.getElementById("project_id").value;
		s_status=document.getElementById("status").value;
		s_branch=document.getElementById("branch").value;
		s_start_date=document.getElementById("start_date").value;
		s_end_date=document.getElementById("end_date").value;
	    		
		//var url="myTasks_div.php?heading="+s_heading+"&project_id="+s_project_id+"&status="+s_status+"&task_type="+s_task_type+"&start_date="+s_start_date+"&end_date="+s_end_date+"&search=y";
		var url="myTasks_div.php?heading="+s_heading+"&project_id="+s_project_id+"&status="+s_status+"&start_date="+s_start_date+"&end_date="+s_end_date+"&branch="+s_branch+"&search=y";
		
		//alert(url);
		xmlHttp=GetXmlHttpObject(my_task_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function my_task_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("my_task_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("my_task_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_function2(j)
{ 
 	    s_heading=document.getElementById("heading_hidden").value;
		s_project_id=document.getElementById("project_id_hidden").value;
		s_status=document.getElementById("status_hidden").value;
		s_branch=document.getElementById("branch_hidden").value;
		s_start_date=document.getElementById("start_date_hidden").value;
		s_end_date=document.getElementById("end_date_hidden").value;
	    		
		var url="myTasks_div.php?pageNum_rr="+j+"&selectme="+j+"&heading="+s_heading+"&project_id="+s_project_id+"&status="+s_status+"&start_date="+s_start_date+"&end_date="+s_end_date+"&branch="+s_branch+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(my_task_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 


function getProjectTask(id1,p)
{ 
		var url="taskD.php?id="+id1+"&task_p="+p+"&search=y";
		xmlHttp=GetXmlHttpObject(taskD)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		
} 
function taskD() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("taskD").innerHTML=xmlHttp.responseText 
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addExpense()
{
	if(document.getElementById("expense_type").value=='')
	{
		alert('please select expense type');
		document.getElementById("expense_type").focus();
		return false;
	}
	if(document.getElementById("expense_amount").value=='')
	{
		alert('please enter expense amount');
		document.getElementById("expense_amount").focus();
		return false;
	}
	var etS=document.getElementById("expense_type").value;
	var eaS=document.getElementById("expense_amount").value;
	
	var url="add_expense_div.php?et="+etS+"&add=1&ea="+eaS+"&su=1";
	//alert(url);
	xmlHttp=GetXmlHttpObject(add_expense_div)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
	
} 

function add_expense_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("add_expense_div").innerHTML="<img src='images/loading.gif'>" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("add_expense_div").innerHTML=xmlHttp.responseText 
		
	}
	
}

function update_ses_expense()
{
	no=document.getElementById("total_no_of_checkbox").value;
	var package_Id;
	for(a=1;a<no;a++)
	{
		id="checkbox"+a;
		if(document.getElementById(id).checked==true)
		{
			if(package_Id)
			{
			package_Id=document.getElementById(id).value+"@"+package_Id;
			}
			else
			{
			package_Id=document.getElementById(id).value
			}
		}
    }
	var url="add_expense_div.php?add=2&pId="+package_Id+"&su=1";
	//alert(url);
	xmlHttp=GetXmlHttpObject(add_expense_div)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function calcu_tot_cl_exp()
{
	document.getElementById("total_amt").value=parseFloat(document.getElementById("quantity").value)*parseFloat(document.getElementById("unit_amt").value);
}
function addExpenseHead()
{
	if(document.getElementById("exp_date").value=='')
	{
		alert('please select expense date');
		document.getElementById("exp_date").focus();
		return false;
	}
	if(document.getElementById("expense_head").value=='')
	{
		alert('please select expense head');
		document.getElementById("expense_head").focus();
		return false;
	}
	if(document.getElementById("exp_status").value=='')
	{
		alert('please select status');
		document.getElementById("exp_status").focus();
		return false;
	}
	var expense_headS=document.getElementById("expense_head").value;
	var exp_dateS=document.getElementById("exp_date").value;
	var quantityS=document.getElementById("quantity").value;
	var unit_amtS=document.getElementById("unit_amt").value;
	var total_amtS=document.getElementById("total_amt").value;
	var commS=document.getElementById("comm").value;
	var exp_statusS=document.getElementById("exp_status").value;
	
	var url="expense_head_div.php?expense_head="+expense_headS+"&add=1&exp_date="+exp_dateS+"&quantity="+quantityS+"&unit_amt="+unit_amtS+"&total_amt="+total_amtS+"&comm="+commS+"&exp_status="+exp_statusS+"&su=1";
	//alert(url);
	xmlHttp=GetXmlHttpObject(expense_head_div)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
	
} 

function expense_head_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("expense_head_div").innerHTML="<img src='images/loading.gif'>" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("expense_head_div").innerHTML=xmlHttp.responseText 
		
	}
	
}

function update_ses_expense_head()
{
	no=document.getElementById("total_no_of_checkbox").value;
	var package_Id;
	for(a=1;a<no;a++)
	{
		id="checkbox"+a;
		if(document.getElementById(id).checked==true)
		{
			if(package_Id)
			{
			package_Id=document.getElementById(id).value+"@"+package_Id;
			}
			else
			{
			package_Id=document.getElementById(id).value
			}
		}
    }
	var url="expense_head_div.php?add=2&pId="+package_Id+"&su=1";
	//alert(url);
	xmlHttp=GetXmlHttpObject(expense_head_div)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getSubHead(id)
{ 
		var allid='';
		for(var i=1;i<document.getElementById("hidden_tota_subhd").value;i++)
		{
			if(document.getElementById("expense_parent"+i).checked==true)
			{
				if(allid)
				{
				allid=allid+","+document.getElementById("expense_parent"+i).value;
				}
				else
				{
					allid=document.getElementById("expense_parent"+i).value;
				}
			}
		}
		if(allid)
		{
		var url="sub_head_div.php?id="+allid+"&pId="+id+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(sub_head_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		}
		else
		{
			document.getElementById("sub_head_div").innerHTML=''
		}
		

} 
function sub_head_div() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("sub_head_div").innerHTML=xmlHttp.responseText 
		calculate_total_budget();
	}
}
function getBudgetCatHead(id)
{
	    if(id)
		{
		var url="main_head_div.php?catid="+id+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(main_head_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		}
		else
		{
			document.getElementById("main_head_div").innerHTML=''
		}
}
function main_head_div() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("main_head_div").innerHTML=xmlHttp.responseText 
	}
}

function calculate_total_budget()
{
	var allamt=0;
	
	for(var i=1;i<document.getElementById("hidden_count").value;i++)
	{
	   if(document.getElementById("budget_amt_main"+i))
	   {
		   
		   if(document.getElementById("hidden_count_sub"+i))
		   {
			  var allamt_sub=0;
			  //alert(document.getElementById("hidden_count_sub"+i));
			  for(var j=1;j<document.getElementById("hidden_count_sub"+i).value;j++)
			   {
					
					if(document.getElementById("budget_amt"+i+j) && document.getElementById("budget_amt"+i+j).value>0)
					{
						//alert("budget_amt"+i+j);
						allamt_sub=parseFloat(allamt_sub)+parseFloat(document.getElementById("budget_amt"+i+j).value);
					}
			   }
			   document.getElementById("sub_total_amt"+i).value=allamt_sub;
			   document.getElementById("budget_amt_main"+i).value=allamt_sub;
		   }
		  if(document.getElementById("budget_amt_main"+i).value>0)
		   {
				allamt=parseFloat(allamt)+parseFloat(document.getElementById("budget_amt_main"+i).value);
		   } 
	   }
	}
	document.getElementById("total_budgeted_amt").value=allamt;
	
}
function getBudgetCatHeadEdit(id1,id2,id3,id4)
{
	    if(id3)
		{
		s1=id1;s2=id2;
		var url="main_head_div.php?catid="+id3+"&bPt="+id4+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(main_head_div_edit)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		}
		else
		{
			document.getElementById("main_head_div").innerHTML=''
		}
}
function main_head_div_edit() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("main_head_div").innerHTML=xmlHttp.responseText
		getSubHeadEdit(s1,s2);
	}
}

function getSubHeadEdit(id1,id2)
{ 
		if(id1)
		{
		var url="sub_head_div.php?id="+id1+"&pId="+id2+"&search=y";
		xmlHttp=GetXmlHttpObject(sub_head_edit_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		}
		else
		{
			document.getElementById("sub_head_div").innerHTML=''
		}
		

} 
function sub_head_edit_div() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("sub_head_div").innerHTML=xmlHttp.responseText 
		calculate_total_budget();
	}
}


function get_budget_head(id)
{ 
		if(id)
		{
		var url="add_expense_div3.php?bID="+id+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(add_expense_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		}
		else
		{
			document.getElementById("add_expense_div").innerHTML=''
		}

} 
function add_expense_div() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("add_expense_div").innerHTML=xmlHttp.responseText 
	}
}

function calculate_total_expensed()
{
	var allamt_sub=0;
	for(var i=1;i<document.getElementById("hidden_count").value;i++)
	{
		   if(document.getElementById("hidden_count_sub"+i))
		   {
			  
			  //alert(document.getElementById("hidden_count_sub"+i));
			  for(var j=1;j<document.getElementById("hidden_count_sub"+i).value;j++)
			   {
					
					if(document.getElementById("expensed_amt"+i+j) && document.getElementById("expensed_amt"+i+j).value>0)
					{
						//alert("expensed_amt"+i+j);
						allamt_sub=parseFloat(allamt_sub)+parseFloat(document.getElementById("expensed_amt"+i+j).value);
					}
			   }
			   if(document.getElementById("sub_total_amt_exp"+i))
			   {
			   		document.getElementById("sub_total_amt_exp"+i).value=allamt_sub;
			   }
			   
		   }
		   
	}
	document.getElementById("total_expensed_amt").value=allamt_sub;
}

function get_budget_head_edit(id,bid)
{ 
		if(id)
		{
		var url="add_expense_div2.php?pId="+id+"&bID="+bid+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(add_expense_div2)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
		}
		else
		{
			document.getElementById("add_expense_div").innerHTML=''
		}

} 
function add_expense_div2() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("add_expense_div").innerHTML=xmlHttp.responseText 
		calculate_total_expensed();
	}
}







function addExpenseMainHead()
{
	if(document.getElementById("name").value=='')
	{
		alert('please enter expense head');
		document.getElementById("name").focus();
		return false;
	}
	
	var etS=document.getElementById("name").value;
	var eaS=document.getElementById("sequence").value;
	
	var url="expense_type_div.php?et="+etS+"&add=1&ea="+eaS+"&su=1";
	//alert(url);
	xmlHttp=GetXmlHttpObject(expense_type_div)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
	
} 

function expense_type_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("expense_type_div").innerHTML="<img src='images/loading.gif'>" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("expense_type_div").innerHTML=xmlHttp.responseText 
		
	}
	
}

function update_ses_expense_head_main()
{
	no=document.getElementById("total_no_of_checkbox").value;
	var package_Id;
	for(a=1;a<no;a++)
	{
		id="checkbox"+a;
		if(document.getElementById(id).checked==true)
		{
			if(package_Id)
			{
			package_Id=document.getElementById(id).value+"@"+package_Id;
			}
			else
			{
			package_Id=document.getElementById(id).value
			}
		}
    }
	var url="expense_type_div.php?add=2&pId="+package_Id+"&su=1";
	//alert(url);
	xmlHttp=GetXmlHttpObject(expense_type_div)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
}

function selAllChk()
{
	if(document.getElementById("sel_all").checked==true)
	{
		for(var i=1;i<document.getElementById("hidden_total").value;i++)
		{
			document.getElementById("checkbox"+i).checked=true;
		}
	}
	else
	{
		for(var i=1;i<document.getElementById("hidden_total").value;i++)
		{
			document.getElementById("checkbox"+i).checked=false;
		}
	}
	getAllChkId();
}

function getAllChkId()
{
		var allid='';
		for(var i=1;i<document.getElementById("hidden_total").value;i++)
		{
			if(document.getElementById("checkbox"+i) && document.getElementById("checkbox"+i).checked==true)
			{
				if(allid)
				{
				allid=allid+","+document.getElementById("checkbox"+i).value;
				}
				else
				{
					allid=document.getElementById("checkbox"+i).value;
				}
			}
		}
		document.getElementById("hidden_apr_id").value=allid;
}

function fnHandleSubmit1(url) 
{

	 var width  = 750;
	 var height = 380;
	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	 var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=no';
	 params += ', menubar=no';
	 params += ', resizable=no';
	 params += ', scrollbars=no';
	 params += ', status=no';
	 params += ', toolbar=no';
	 
	 newwin=window.open(url,'windowname5', params);
	 if (window.focus) {newwin.focus()}
	 return false;
}



function searchExpenceClam()
{ 

 	    s_cat=document.getElementById("expense_head").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
		s_user_id=document.getElementById("user_id").value;
	    		
		var url="claimed_expense_div.php? user_id="+s_user_id+"&cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(claimed_expense_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function claimed_expense_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("claimed_expense_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("claimed_expense_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_expclm(j)
{ 
 	    s_cat=document.getElementById("expense_head").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
		s_user_id=document.getElementById("user_id").value;
	    		
		var url="claimed_expense_div.php?user_id="+s_user_id+"&pageNum_rr="+j+"&selectme="+j+"&cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(claimed_expense_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function getPaccountUser(id1,s)
{ 
		var url="employee_div.php?id="+id1+"&id2="+s+"&search=y";
		xmlHttp=GetXmlHttpObject(employee_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function employee_div() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("employee_div").innerHTML=xmlHttp.responseText 
	}
}


function searchBudget()
{ 
 	    var  project_idS=document.getElementById("project_id").value;
		var headingS=document.getElementById("heading").value;
		var url="budget_div.php?pr="+project_idS+"&hd="+headingS+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(budget_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function budget_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("budget_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("budget_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_budget(j)
{ 
 	    var  project_idS=document.getElementById("project_id").value;
		var headingS=document.getElementById("heading").value;
				
		var url="budget_div.php?pageNum_rr="+j+"&selectme="+j+"&pr="+project_idS+"&hd="+headingS+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(budget_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function searchAttendance()
{ 

 	    s_cat=document.getElementById("pay_account").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
	    		
		var url="attendance_div.php?cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(attendance_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function attendance_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("attendance_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("attendance_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_attendance(j)
{ 
 	    s_cat=document.getElementById("pay_account").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
	    		
		var url="attendance_div.php?pageNum_rr="+j+"&selectme="+j+"&cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(attendance_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 

function searchEmployee()
{ 

 	    s_cat=document.getElementById("pay_account").value;
		s_fname=document.getElementById("fname").value;
		s_pay_tp=document.getElementById("pay_tp").value;
		var url="employees_s_div.php?pa="+s_cat+"&fn="+s_fname+"&pt="+s_pay_tp+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(employees_s_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function employees_s_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("employees_s_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("employees_s_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_employee(j)
{ 
 	    s_cat=document.getElementById("pay_account").value;
		s_fname=document.getElementById("fname").value;
		s_pay_tp=document.getElementById("pay_tp").value;
		var url="employees_s_div.php?pageNum_rr="+j+"&selectme="+j+"&pa="+s_cat+"&fn="+s_fname+"&pt="+s_pay_tp+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(employees_s_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function searchExpBudget()
{ 

 	    s_cat=document.getElementById("budget").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
	    		
		var url="expense_div.php?cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(expense_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 
function expense_div() 
{ 
	if (xmlHttp.readyState==1)
	{
		document.getElementById("expense_div").innerHTML="<img src='images/loading.gif'>&nbsp;&nbsp;" 
	}
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
		document.getElementById("expense_div").innerHTML=xmlHttp.responseText 
	}
} 
function paging_budgetExp(j)
{ 
 	    s_cat=document.getElementById("budget").value;
		s_from_date=document.getElementById("from_date").value;
		s_to_date=document.getElementById("to_date").value;
	    		
		var url="expense_div.php?pageNum_rr="+j+"&selectme="+j+"&cat="+s_cat+"&from_date="+s_from_date+"&to_date="+s_to_date+"&search=y";
		//alert(url);
		xmlHttp=GetXmlHttpObject(expense_div)
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)

} 

function fnHandleSubmitnew(url) 
{

	 var width  = 750;
	 var height = 380;
	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	 var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=no';
	 params += ', menubar=no';
	 params += ', resizable=no';
	 params += ', scrollbars=yes';
	 params += ', status=no';
	 params += ', toolbar=no';
	 
	 newwin=window.open(url,'windowname5', params);
	 if (window.focus) {newwin.focus()}
	 return false;
}