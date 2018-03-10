var CalendarPopup_curCalendar = '';
var CalendarPopup_curCalendarID = '';
var CalendarPopup_curMonthYear = '';
var CalendarPopup_selMonth = '';
var CalendarPopup_selYear = '';
if (navigator.appName == 'Netscape') { document.captureEvents(Event.CLICK); }

function CalendarPopup_Up_LostFocus(e) { CalendarPopup_Up_HideNonCurrentCalendar('', ''); }

function CalendarPopup_Up_Holiday(month, day, year, span) {
	this.Month = month;
	this.Day = day;
	this.Year = year;
	this.Span = span;
}

function CalendarPopup_Up_IsHoliday(month, day, year, dateArray) {
	var returnVal = false;
	
	if(dateArray == null) {
		returnVal = false;
	} else {
		for(var i=0; i<dateArray.length; i++) {
			if(dateArray[i].Month == (month + 1) && dateArray[i].Day == day && (dateArray[i].Year == year || dateArray[i].Span)) {
				returnVal = true;
				i = dateArray.length;
			} else {
				returnVal = false;
			}
		}
	}
	
	return returnVal;
}

function CalendarPopup_Up_findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x) {
		curleft += obj.x;
	}
	return curleft;
}

function CalendarPopup_Up_findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

function CalendarPopup_Up_DisplayCalendar(calIdFlag, tbName, lblName, lblTemp, funcName, myFuncName, wdStyle, weStyle, omStyle, sdStyle, mhStyle, dhStyle, cdStyle, tdStyle, gttStyle, holStyle, formatNum, fdweek, sunNum, satNum, enableHide, includeYears, lBound, uBound, btnName, locQuad, pad, postbackFunc, offsetX, offsetY, showClear, clearText, showGoToToday, goToTodayText, arrowUrl, customFunc, calWidth, /*visibleKey, */nullText, dateArray, nextMonthImgUrl, prevMonthImgUrl, nextYearImgUrl, prevYearImgUrl) {
	var div, tb;
	CalendarPopup_curCalendarID = calIdFlag;
	//div = document.getElementById(divName);
	div = document.getElementById('dvCalendar');
	tb = document.getElementById(tbName);
	if(div.style.visibility != 'hidden') {
		div.style.visibility = 'hidden';
		if(enableHide)
			CalendarPopup_Up_ShowHideDDL('visible');
	} else {
		var todayDate = CalendarPopup_Up_GetDate(tbName, formatNum);
		//eval('var stringDate = ' + visibleKey + ';');
		var stringDate = document.getElementById(tbName).data;
		//CalendarPopup_Up_HideNonCurrentCalendar(divName, myName)
		CalendarPopup_Up_HideNonCurrentCalendar('dvCalendar', 'dvMonthYear')
		if(enableHide)
			CalendarPopup_Up_ShowHideDDL('hidden');
		div.style.position = 'absolute';
		var obj;
		if(lblTemp != '')
			obj = document.getElementById(lblTemp);
		else if(lblName != '')
			obj = document.getElementById(lblName);
		else
			obj = tb;
		var y = CalendarPopup_Up_findPosY(obj);
		var x = CalendarPopup_Up_findPosX(obj);
		switch(locQuad) {
			case 1:
				y += (obj.offsetHeight + 1);
				break;
			case 2:
				x -= (div.offsetWidth - 2);
				break;
			case 3:
				x += (obj.offsetWidth + 1);
				break;
			case 4:
				y -= (div.offsetHeight - 1);
				break;
			default:
				y = CalendarPopup_Up_findPosY(document.getElementById(btnName));
				x = CalendarPopup_Up_findPosX(document.getElementById(btnName)) - 3;
				break;
		}
		div.style.top = y + offsetY + 'px';
		div.style.left = x + offsetX + 'px';
		CalendarPopup_Up_DisplayCalendarByDate(tbName, lblName, funcName, myFuncName, stringDate, wdStyle, weStyle, omStyle, sdStyle, mhStyle, dhStyle, cdStyle, tdStyle, gttStyle, holStyle, formatNum, fdweek, sunNum, satNum, enableHide, includeYears, lBound, uBound, pad, postbackFunc, showClear, clearText, showGoToToday, goToTodayText, arrowUrl, customFunc, calWidth, /*visibleKey, */nullText, dateArray, nextMonthImgUrl, prevMonthImgUrl, nextYearImgUrl, prevYearImgUrl);
		div.style.visibility = 'visible';
	}
}

function CalendarPopup_Up_ChangeMonth(selMonth, lbDate, ubDate) {
	if(document.getElementById('CalendarPopup_monthname' + selMonth).style.color == 'black') {
		for(var i=0; i<12; i++) {
			if(i != selMonth)
				document.getElementById('CalendarPopup_monthname' + i).style.background='white';
			else
				document.getElementById('CalendarPopup_monthname' + i).style.background='lightgrey';
		}
		CalendarPopup_selMonth = selMonth++;
	}
}

function CalendarPopup_Up_ChangeYear(selYear, yearNum, lbDate, ubDate) {
	var lowerDate = new Date(lbDate);
	var upperDate = new Date(ubDate);
	lowerDate = new Date((lowerDate.getMonth() + 1) + '/1/' + lowerDate.getFullYear());
	for(var i=0; i<10; i++) {
		if(i != selYear)
			document.getElementById('CalendarPopup_yearname' + i).style.background='white';
		else
			document.getElementById('CalendarPopup_yearname' + i).style.background='lightgrey';
	}
	for(var i=0; i<12; i++) {
		var curDate = new Date((i + 1) + '/1/' + yearNum);
		if(curDate < lowerDate || curDate > upperDate)
			document.getElementById('CalendarPopup_monthname' + i).style.color = 'gray';
		else
			document.getElementById('CalendarPopup_monthname' + i).style.color = 'black';
		document.getElementById('CalendarPopup_monthname' + i).style.background = 'white';
	}
	var curDate = new Date((CalendarPopup_selMonth + 1) + '/1/' + yearNum);
	if(curDate <= lowerDate)
		CalendarPopup_selMonth = lowerDate.getMonth();
	else if(curDate >= upperDate)
		CalendarPopup_selMonth = upperDate.getMonth();
	document.getElementById('CalendarPopup_monthname' + CalendarPopup_selMonth).style.background = 'lightgrey';
	CalendarPopup_selYear = yearNum;
}

function CalendarPopup_Up_ChangeMonthYear(funcName, isCancel, tbName, lblName) {
	if(!isCancel) {
		eval(funcName + "('" + (CalendarPopup_selMonth + 1) + "/1/" + CalendarPopup_selYear + "', '" + tbName + "','" + lblName + "');");
	}
	//document.getElementById(divName).style.visibility = 'hidden';
	document.getElementById('dvMonthYear').style.visibility = 'hidden';
	//document.getElementById(divName).innerHTML = '';
	document.getElementById('dvMonthYear').innerHTML = '';
	document.onmousedown = CalendarPopup_Up_LostFocus;
}

function CalendarPopup_Up_DisplayMonthYear(funcName, myFuncName, theDate, lbDate, ubDate, tbName, lblName) {
	var monthnames = new Array('jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez');
	//var calDIV = document.getElementById(calDivName);
	var calDIV = document.getElementById('dvCalendar');
	//var myDIV = document.getElementById(myDivName);
	var myDIV = document.getElementById('dvMonthYear');
	var curDate = new Date(theDate);
	var lowerDate = new Date(lbDate);
	var upperDate = new Date(ubDate);
	lowerDate = new Date((lowerDate.getMonth() + 1) + '/1/' + lowerDate.getFullYear());
		
	CalendarPopup_selMonth = curDate.getMonth();
	if(curDate < lowerDate)
		CalendarPopup_selMonth = lowerDate.getMonth();
	else if(curDate > upperDate)
		CalendarPopup_selMonth = upperDate.getMonth();
	CalendarPopup_selYear = curDate.getFullYear();
	
	outputString = '<table style=\"border: black 1px solid;background: white;\" border=0 cellspacing=0 cellpadding=0>';
	outputString = outputString + '<tr><td width=50% valign=top><table border=0 cellspacing=0 cellpadding=2>';
	for(var i=0; i<12; i++) {
		if(i % 2 == 0)
			outputString = outputString + '<tr>';
		var tempDate = new Date((i + 1) + '/1/' + CalendarPopup_selYear);
		if(tempDate >= lowerDate  && tempDate <= upperDate) {
			if(i == CalendarPopup_selMonth)
				outputString = outputString + "<td id=\"CalendarPopup_monthname" + i + "\" onclick=\"CalendarPopup_Up_ChangeMonth(" + i + ", '" + lbDate + "', '" + ubDate + "')\" align=left nowrap style=\"font-family:verdana; font-size:xx-small; color: black;background:lightgrey; cursor:hand;\">" + monthnames[i] + "</td>";
			else
				outputString = outputString + "<td id=\"CalendarPopup_monthname" + i + "\" onclick=\"CalendarPopup_Up_ChangeMonth(" + i + ", '" + lbDate + "', '" + ubDate + "')\" align=left nowrap style=\"font-family:verdana; font-size:xx-small; color: black; cursor:hand;\">" + monthnames[i] + "</td>";
		} else {
			outputString = outputString + "<td id=\"CalendarPopup_monthname" + i + "\" onclick=\"CalendarPopup_Up_ChangeMonth(" + i + ", '" + i + lbDate + "', '" + ubDate + "')\" align=left nowrap style=\"font-family:verdana; font-size:xx-small; color: gray; cursor:hand;\">" + monthnames[i] + "</td>";
		}
		if(i % 2 != 0)
			outputString = outputString + '</tr>';
	}
	outputString = outputString + '</table></td><td width=50% valign=top><table border=0 cellspacing=0 cellpadding=2 width=100%>';
	var j = 0;
	for(var i=(curDate.getFullYear() - 5); i<(curDate.getFullYear() + 5); i++) {
		if(j % 2 == 0)
			outputString = outputString + '<tr>';
		if(i >= lowerDate.getFullYear() && i <= upperDate.getFullYear()) {
			if(i == curDate.getFullYear())
				outputString = outputString + "<td id=\"CalendarPopup_yearname" + j + "\" onclick=\"CalendarPopup_Up_ChangeYear(" + j + ", " + i + ", '" + lbDate + "', '" + ubDate + "')\" align=left nowrap style=\"font-family:verdana; font-size:xx-small;color: black;background: lightgrey; cursor:hand;\">" + i + "</td>";
			else
				outputString = outputString + "<td id=\"CalendarPopup_yearname" + j + "\" onclick=\"CalendarPopup_Up_ChangeYear(" + j + ", " + i + ", '" + lbDate + "', '" + ubDate + "')\" align=left nowrap style=\"font-family:verdana; font-size:xx-small;color: black; cursor:hand;\">" + i + "</td>";
		} else {
			outputString = outputString + "<td id=\"CalendarPopup_yearname" + j + "\" align=left nowrap style=\"font-family:verdana; font-size:xx-small;color: gray; cursor:hand;\">" + i + "</td>";
		}
		if(j % 2 != 0)
			outputString = outputString + '</tr>';
		j++;
	}
	outputString = outputString + "<tr><td align=left><a style=\"font-family:verdana; font-size:xx-small; color: black;\" href=\"javascript:" + myFuncName + "((CalendarPopup_selMonth + 1) + '/" + curDate.getDate() + "/" + (curDate.getFullYear() - 10) + "', '" + tbName + "','" + lblName + "')\">&lt;&lt;</a></td>";
	outputString = outputString + "<td align=right><a style=\"font-family:verdana; font-size:xx-small; color: black;\" href=\"javascript:" + myFuncName + "((CalendarPopup_selMonth + 1) + '/" + curDate.getDate() + "/" + (curDate.getFullYear() + 10) + "', '" + tbName + "','" + lblName + "')\">&gt;&gt;</a></td></tr>";
	outputString = outputString + '</table></td></tr>';
	outputString = outputString + "<tr><td colspan=2 align=right nowrap><input onclick=\"CalendarPopup_Up_ChangeMonthYear('" + funcName + "', false, '" + tbName + "','" + lblName + "');\" type=button value=\"Ok\" style=\"font-family:verdana; font-size:xx-small\"><input onclick=\"CalendarPopup_Up_ChangeMonthYear('" + funcName + "', true, '" + tbName + "','" + lblName + "');\" type=button value=\"Cancelar\" style=\"font-family:verdana; font-size:xx-small\"></td></tr>";
	
	myDIV.style.position = 'absolute';
	myDIV.style.top = parseInt(calDIV.style.top.replace('px', '')) + 2;
	myDIV.style.left = parseInt(calDIV.style.left.replace('px', '')) + 2;
	myDIV.innerHTML = outputString;
	myDIV.style.visibility = 'visible';
}

function CalendarPopup_Up_HideNonCurrentCalendar(){//(divName, myName) {
	if (!eval("document.getElementById('dvCalendar')"))
		return;
	if(CalendarPopup_curMonthYear != '') {
		document.getElementById(CalendarPopup_curMonthYear).style.visibility = 'hidden';
		document.getElementById(CalendarPopup_curMonthYear).innerHTML = '';
	}
	if(CalendarPopup_curCalendar != '') {
		document.getElementById(CalendarPopup_curCalendar).style.visibility = 'hidden';
		document.getElementById(CalendarPopup_curCalendar).innerHTML = '';
		if(eval(CalendarPopup_curCalendarID) == true)
			CalendarPopup_Up_ShowHideDDL('visible');
	}
	//if(divName != '')
		CalendarPopup_curCalendar = 'dvCalendar';//divName;
	//if(myName != '')
		CalendarPopup_curMonthYear = 'dvMonthYear';//myName;
}

function CalendarPopup_Up_GetDate(tbName, formatNum) {
	var todayDate;
	if(document.getElementById(tbName).value != '') {
		var theDate;
		var theDateArr = document.getElementById(tbName).value.split("/");
		if(theDateArr.length != 3) {
			theDateArr = document.getElementById(tbName).value.split(".");
			if(theDateArr.length != 3)
				theDateArr = document.getElementById(tbName).value.split("-");
		}
		if(theDateArr.length == 3) {
			switch(formatNum) {
				case 1: // In: MM/DD/YYYY Out: MM/DD/YYYY
					theDate = theDateArr[0].concat("/").concat(theDateArr[1]).concat("/").concat(theDateArr[2]);
					break;
				case 2: // In: DD/MM/YYYY Out: MM/DD/YYYY
					theDate = theDateArr[1].concat("/").concat(theDateArr[0]).concat("/").concat(theDateArr[2]);
					break;
				case 3: // In: YYYY/MM/DD Out: MM/DD/YYYY
					theDate = theDateArr[1].concat("/").concat(theDateArr[2]).concat("/").concat(theDateArr[0]);
					break;
				case 4: // In MM.DD.YYYY Out: MM.DD.YYYY
					theDate = theDateArr[0].concat("/").concat(theDateArr[1]).concat("/").concat(theDateArr[2]);
					break;
				case 5: // In DD.MM.YYYY Out: MM.DD.YYYY
					theDate = theDateArr[1].concat("/").concat(theDateArr[0]).concat("/").concat(theDateArr[2]);
					break;
				case 6: // In YYYY.MM.DD Out: MM.DD.YYYY
					theDate = theDateArr[1].concat("/").concat(theDateArr[2]).concat("/").concat(theDateArr[0]);
					break;
				case 7: // In MM-DD-YYYY Out: MM-DD-YYYY
					theDate = theDateArr[0].concat("/").concat(theDateArr[1]).concat("/").concat(theDateArr[2]);
					break;
				case 8: // In DD-MM-YYYY Out: MM-DD-YYYY
					theDate = theDateArr[1].concat("/").concat(theDateArr[0]).concat("/").concat(theDateArr[2]);
					break;
				case 9: // In YYYY-MM-DD Out: MM-DD-YYYY
					theDate = theDateArr[1].concat("/").concat(theDateArr[2]).concat("/").concat(theDateArr[0]);
					break;
			}
			todayDate = new Date(theDate);
			if(todayDate == NaN)
				todayDate = new Date();
		} else
			todayDate = new Date();
	} else
		todayDate = new Date();
	return todayDate;
}

function CalendarPopup_Up_ShowHideDDL(visibility) {
	for(j=0;j<document.forms.length; j++) {
		for(i=0;i<document.forms[j].elements.length;i++) {
			if(document.forms[j].elements[i].type != null) {
				if(document.forms[j].elements[i].type.indexOf('select') == 0)
					document.forms[j].elements[i].style.visibility = visibility;
			}
		}
	}
}

function CalendarPopup_Up_DisplayCalendarByDate(tbName, lblName, funcName, myFuncName, stringDate, wdStyle, weStyle, omStyle, sdStyle, mhStyle, dhStyle, cdStyle, tdStyle, gttStyle, holStyle, formatNum, fdweek, sunNum, satNum, enableHide, includeYears, lBound, uBound, pad, postbackFunc, showClear, clearText, showGoToToday, goToTodayText, arrowUrl, customFunc, calWidth, /*visibleKey, */nullText, dateArray, nextMonthImgUrl, prevMonthImgUrl, nextYearImgUrl, prevYearImgUrl) {
	var monthnames = new Array('janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro');
	var daynames = new Array('d','s','t','q','q','s','s');
	var dateToday = new Date();
	var lowerDate = new Date(lBound);
	var upperDate = new Date(uBound);
	var todayDate = new Date(stringDate);
	var curDate = CalendarPopup_Up_GetDate(tbName, formatNum);//new Date(CalendarPopup_Up_GetDate(tbName, formatNum));
	var curMonth = curDate.getMonth();
	var curYear = curDate.getFullYear();
	var monthdays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	thisday=todayDate.getDay();
	thismonth=todayDate.getMonth();
	thisdate=todayDate.getDate();
	thisyear=todayDate.getFullYear();
	if (((thisyear % 4 == 0) && !(thisyear % 100 == 0)) ||(thisyear % 400 == 0))
		monthdays[1]++;
	var outputString = '';
	startspaces=thisdate;
	var prevMonth = thismonth;
	var prevDay = thisdate;
	var prevYear = thisyear;
	var thisPreviousYear = thisyear - 1;
	var thisNextYear = thisyear + 1;
	if(prevMonth < 1) {
		prevMonth = 12;
		prevYear = prevYear - 1;
	}
	if(thisdate > monthdays[prevMonth - 1])
		prevDay = monthdays[prevMonth - 1];
	var nextMonth = thismonth + 2;
	var nextDay = thisdate;
	var nextYear = thisyear;
	if(nextMonth > 12) {
		nextMonth = 1;
		nextYear = nextYear + 1;
	}
	if(thisdate > monthdays[nextMonth - 1])
		nextDay = monthdays[nextMonth - 1];
	while (startspaces > 7)
		startspaces-=7;
	startspaces = thisday - startspaces + 1;
	startspaces = startspaces - fdweek;
	if (startspaces < 0)
		startspaces+=7;
	outputString = outputString + '<table';
	if(calWidth > 0)
		outputString = outputString + ' width=\"' + calWidth + 'px\"';
	outputString = outputString + ' style=\"border: black 1px solid;\" border=0 cellspacing=0px cellpadding=2px>';
	
	if (includeYears == false) {
		if(prevMonthImgUrl == '')
			outputString = outputString + "<tr " + mhStyle + "><td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + prevMonth + "/" + prevDay + "/" + prevYear + "', '" + tbName + "','" + lblName + "')\">&lt;</a></td>";
		else
			outputString = outputString + "<tr " + mhStyle + "><td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + prevMonth + "/" + prevDay + "/" + prevYear + "', '" + tbName + "','" + lblName + "')\"><img src=\"" + prevMonthImgUrl + "\" border=0></a></td>";
	} else {
		if(prevMonthImgUrl == '')
			outputString = outputString + "<tr " + mhStyle + "><td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + prevMonth + "/" + prevDay+ "/" + prevYear + "', '" + tbName + "','" + lblName + "')\">&lt;</a><br>";
		else
			outputString = outputString + "<tr " + mhStyle + "><td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + prevMonth + "/" + prevDay+ "/" + prevYear + "', '" + tbName + "','" + lblName + "')\"><img src=\"" + prevMonthImgUrl + "\" border=0></a><br>";
		
		if(prevYearImgUrl == '')
			outputString = outputString + "<a " + mhStyle + " href=\"javascript:" + funcName + "('" + (thismonth + 1) + "/" + thisdate + "/" + thisPreviousYear + "', '" + tbName + "','" + lblName + "')\">&lt;&lt;</a></td>";
		else
			outputString = outputString + "<a " + mhStyle + " href=\"javascript:" + funcName + "('" + (thismonth + 1) + "/" + thisdate + "/" + thisPreviousYear + "', '" + tbName + "','" + lblName + "')\"><img src=\"" + prevYearImgUrl + "\" border=0></a></td>";
	}
	outputString = outputString + '<td colspan=5 nowrap align=center ' +mhStyle + "><a " + mhStyle + " href=\"javascript:" + myFuncName + "('" + (thismonth + 1) + "/1/" + thisyear + "', '" + tbName + "','" + lblName + "')\">" + monthnames[thismonth] + ' ' + thisyear;
	if(arrowUrl != "")
		outputString = outputString + ' <img src=\"' + arrowUrl + '\" border=0>';
	outputString = outputString + '</a></td>';
	if (includeYears == false) {
		if(nextMonthImgUrl == '')
			outputString = outputString + "<td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + nextMonth + "/" + nextDay + "/" + nextYear + "', '" + tbName + "','" + lblName + "')\">&gt;</a></td></tr>";
		else
			outputString = outputString + "<td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + nextMonth + "/" + nextDay + "/" + nextYear + "', '" + tbName + "','" + lblName + "')\"><img src=\"" + nextMonthImgUrl + "\" border=0></a></td></tr>";
	} else {
		if(nextMonthImgUrl == '')
			outputString = outputString + "<td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + nextMonth + "/" + nextDay+ "/" + nextYear + "', '" + tbName + "','" + lblName + "')\">&gt;</a><br>";
		else
			outputString = outputString + "<td align=center><a " + mhStyle + " href=\"javascript:" + funcName + "('" + nextMonth + "/" + nextDay+ "/" + nextYear + "', '" + tbName + "','" + lblName + "')\"><img src=\"" + nextMonthImgUrl + "\" border=0></a><br>";
		
		if(nextYearImgUrl == '')
			outputString = outputString + "<a " + mhStyle + " href=\"javascript:" + funcName + "('" + (thismonth + 1) + "/" + thisdate + "/" + thisNextYear + "', '" + tbName + "','" + lblName + "')\">&gt;&gt;</a></td></tr>";
		else
			outputString = outputString + "<a " + mhStyle + " href=\"javascript:" + funcName + "('" + (thismonth + 1) + "/" + thisdate + "/" + thisNextYear + "', '" + tbName + "','" + lblName + "')\"><img src=\"" + nextYearImgUrl + "\" border=0></a></td></tr>";
	}
	outputString = outputString + '<tr>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[0] + '</td>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[1] + '</td>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[2] + '</td>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[3] + '</td>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[4] + '</td>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[5] + '</td>';
	outputString = outputString + '<td ' + dhStyle + ' align=center>' + daynames[6] + '</td>';
	outputString = outputString + '</tr>';
	for (s=0;s<startspaces;s++) {
		var theDate, month, year;
		if(thismonth == 0) {
			theDate = monthdays[11] - (startspaces - (s + 1));
			month = 12;
			year = thisyear - 1;
		} else {
			theDate = monthdays[thismonth - 1] - (startspaces - (s + 1));
			month = thismonth;
			year = thisyear;
		}
		var theCurDate = new Date(month + "/" + theDate + "/" + year);
		var lowerAmount = (lowerDate - theCurDate);
		var upperAmount = (theCurDate - upperDate);	
		if(s == 0)
			outputString = outputString + '<tr>';
		if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
			outputString = outputString + "<td align=center " + omStyle + "\">" + theDate + "</td>";
		else if(s!=sunNum && s!=satNum)
			outputString = outputString + "<td align=center " + omStyle + "><a " + omStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + month + "/" + theDate + "/" + year + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + theDate + "</a></td>";
		else
			outputString = outputString + "<td align=center " + omStyle + "><a " + omStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + month + "/" + theDate + "/" + year + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + theDate + "</a></td>";
	}
	count=1;
	while (count <= monthdays[thismonth]) {
		for (b = startspaces;b<7;b++) {
			if(b == 0)
				outputString = outputString + '<tr>';
			if((thismonth == dateToday.getMonth() && count == dateToday.getDate() && thisyear == dateToday.getFullYear()) || (count==curDate.getDate() && thismonth == curMonth && thisyear == curYear && document.getElementById(tbName).value != '')) {
				if (count==curDate.getDate() && thismonth == curMonth && thisyear == curYear && document.getElementById(tbName).value != '')
					outputString = outputString + '<td align=center ' + sdStyle + '>';
				else if(CalendarPopup_Up_IsHoliday(thismonth, count, thisyear, dateArray))
					outputString = outputString + '<td align=center ' + holStyle + '>';
				else if(thismonth == dateToday.getMonth() && count == dateToday.getDate() && thisyear == dateToday.getFullYear())
					outputString = outputString + '<td align=center ' + tdStyle + '>';
			} else {
				if (count <= monthdays[thismonth]) {
					if(CalendarPopup_Up_IsHoliday(thismonth, count, thisyear, dateArray)) {
						outputString = outputString + '<td align=center ' + holStyle + '>';
					} else {
						if(b!=sunNum && b!=satNum) {
							outputString = outputString + '<td align=center ' + wdStyle + '>';
						} else {
							outputString = outputString + '<td align=center ' + weStyle + '>';
						}
					}
				} else {
					outputString = outputString + '<td align=center ' + omStyle + '>';
				}
			}
			if (count <= monthdays[thismonth]) {
				var theCurDate = new Date((thismonth + 1) + "/" + count + "/" + thisyear);
				var lowerAmount = (lowerDate - theCurDate);
				var upperAmount = (theCurDate - upperDate);	
				
				if((thismonth == dateToday.getMonth() && count == dateToday.getDate() && thisyear == dateToday.getFullYear()) || (count==curDate.getDate() && thismonth == curMonth && thisyear == curYear && document.getElementById(tbName).value != '')) {
					if (count==curDate.getDate() && thismonth == curMonth && thisyear == curYear && document.getElementById(tbName).value != '') {							
						if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
							outputString = outputString + "<span " + sdStyle + ">" + count + "</span>"; 
						else
							outputString = outputString + "<a " + sdStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
					} else if(CalendarPopup_Up_IsHoliday(thismonth, count, thisyear, dateArray)) {
						if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
							outputString = outputString + "<span " + holStyle + ">" + count + "</span>"; 
						else
							outputString = outputString + "<a " + holStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
					} else if(thismonth == dateToday.getMonth() && count == dateToday.getDate() && thisyear == dateToday.getFullYear()) {
						if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
							outputString = outputString + "<span " + tdStyle + ">" + count + "</span>"; 
						else
							outputString = outputString + "<a " + tdStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
					}
				} else if(CalendarPopup_Up_IsHoliday(thismonth, count, thisyear, dateArray)) {
					if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
						outputString = outputString + "<span " + holStyle + ">" + count + "</span>"; 
					else
						outputString = outputString + "<a " + holStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
				} else if(b!=sunNum && b!=satNum && count != thisdate) {
					if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
						outputString = outputString + "<span " + wdStyle + ">" + count + "</span>"; 
					else
						outputString = outputString + "<a " + wdStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
				} else if(b!=sunNum && b!=satNum) {
					if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
						outputString = outputString + "<span " + wdStyle + ">" + count + "</span>"; 
					else
						outputString = outputString + "<a " + wdStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
				} else {
					if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
						outputString = outputString + "<span " + weStyle + ">" + count + "</span>"; 
					else
						outputString = outputString + "<a " + weStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + (thismonth + 1) + "/" + count + "/" + thisyear + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + count + "</a>";
				}
			} else {
				var month, year;
				if(thismonth == 11) {
					month = 1;
					year = thisyear + 1;
				} else {
					month = thismonth + 2;
					year = thisyear;
				}
				var theCurDate = new Date(month + "/" + (count - monthdays[thismonth]) + "/" + year);
				var lowerAmount = (lowerDate - theCurDate);
				var upperAmount = (theCurDate - upperDate);	
				if((lowerAmount > 0 && upperAmount < 0) || (upperAmount > 0 && lowerAmount < 0))
					outputString = outputString + "<span " + omStyle + ">" + (count - monthdays[thismonth]) + "</span>";
				else
					outputString = outputString + "<a " +omStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + month + "/" + (count - monthdays[thismonth]) + "/" + year + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + (count - monthdays[thismonth]) + "</a>";
			}
			outputString = outputString + '</td>';
			count++;
		}
		outputString = outputString + '</tr>';
		startspaces=0;
	}
	if(showGoToToday) {
		var shortDate = (dateToday.getMonth() + 1) + "/" + dateToday.getDate() + "/" + dateToday.getFullYear();
		outputString = outputString + "<tr><td " + gttStyle + " colspan=\"7\" align=\"center\">" + goToTodayText + " <a " + gttStyle + " href=\"javascript:CalendarPopup_Up_SelectDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "','" + shortDate + "', " + formatNum + ", " + enableHide + ", " + pad + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "')\">" + CalendarPopup_Up_DetermineDate(shortDate, formatNum, pad) + "</a>";
	}
	if(showClear)
		outputString = outputString + "<tr><td " + cdStyle + " colspan=\"7\" align=\"center\"><a " + cdStyle + " href=\"javascript:CalendarPopup_Up_ClearDate('" + tbName + "','" + lblName + /*"','" + divName + "','" + myName +*/ "', " + enableHide + ", '" + postbackFunc + "', '" + customFunc + /*"', '" + visibleKey +*/ "', '" + nullText + "');\">" + clearText + "</a></td></tr>";
	outputString = outputString + '</table>';
	//document.getElementById(divName).innerHTML = outputString;
	document.getElementById('dvCalendar').innerHTML = outputString;
}

function CalendarPopup_Up_DetermineDate(inDate, formatNum, pad) {
	var theDateArr = inDate.split("/");
	if(theDateArr.length != 3) {
		theDateArr = document.getElementById(tbName).value.split(".");
		if(theDateArr.length != 3) {
			theDateArr = document.getElementById(tbName).value.split("-");
		}		
	}	
	if(pad) {
		if(parseInt(theDateArr[0]) < 10 && theDateArr[0].length == 1)
			theDateArr[0] = '0' + theDateArr[0];
		if(parseInt(theDateArr[1]) < 10 && theDateArr[1].length == 1)
			theDateArr[1] = '0' + theDateArr[1];
		if(parseInt(theDateArr[2]) < 10 && theDateArr[2].length == 1)
			theDateArr[2] = '0' + theDateArr[2];
	}
	var theDate;
	switch(formatNum) {
		case 1: // In: MM/DD/YYYY Out: MM/DD/YYYY
			theDate = theDateArr[0].concat("/").concat(theDateArr[1]).concat("/").concat(theDateArr[2]);
			break;
		case 2: // In: MM/DD/YYYY Out: DD/MM/YYYY
			theDate = theDateArr[1].concat("/").concat(theDateArr[0]).concat("/").concat(theDateArr[2]);
			break;
		case 3: // In: MM/DD/YYYY Out: YYYY/MM/DD
			theDate = theDateArr[2].concat("/").concat(theDateArr[0]).concat("/").concat(theDateArr[1]);
			break;
		case 4: // In MM.DD.YYYY Out: MM.DD.YYYY
			theDate = theDateArr[0].concat(".").concat(theDateArr[1]).concat(".").concat(theDateArr[2]);
			break;
		case 5: // In MM.DD.YYYY Out: DD.MM.YYYY
			theDate = theDateArr[1].concat(".").concat(theDateArr[0]).concat(".").concat(theDateArr[2]);
			break;
		case 6: // In MM.DD.YYYY Out: YYYY.MM.DD
			theDate = theDateArr[2].concat(".").concat(theDateArr[0]).concat(".").concat(theDateArr[1]);
			break;
		case 7: // In MM-DD-YYYY Out: MM-DD-YYYY
			theDate = theDateArr[0].concat("-").concat(theDateArr[1]).concat("-").concat(theDateArr[2]);
			break;
			case 8: // In MM-DD-YYYY Out: DD-MM-YYYY
			theDate = theDateArr[1].concat("-").concat(theDateArr[0]).concat("-").concat(theDateArr[2]);
			break;
		case 9: // In MM-DD-YYYY Out: YYYY-MM-DD
			theDate = theDateArr[2].concat("-").concat(theDateArr[0]).concat("-").concat(theDateArr[1]);
			break;
	}
	return theDate;
}

function CalendarPopup_Up_SelectDate(tbName, lblName, /*divName, myName,*/ theDate, formatNum, enableHide, pad, postbackFunc, customFunc/*, visibleKey*/) {
	
	document.getElementById(tbName).value = CalendarPopup_Up_DetermineDate(theDate, formatNum, pad);
	//if(lblName != '')
 //   document.getElementById(lblName).innerHTML = CalendarPopup_Up_DetermineDate(theDate, formatNum, pad);
	//document.getElementById(divName).style.visibility = 'hidden';
	//document.getElementById(myName).style.visibility = 'hidden';
	document.getElementById('dvCalendar').style.visibility = 'hidden';
	document.getElementById('dvMonthYear').style.visibility = 'hidden';
	
	var aDate;
	
	aDate = theDate.split('/');
	
	theDate = aDate[0] +'/'+ aDate[1] +'/'+ aDate[2];
	
	
	if(enableHide)


		CalendarPopup_Up_ShowHideDDL('visible');
	
	if (postbackFunc != '')
		eval(postbackFunc + "();");

	if(customFunc != "")
		eval(customFunc + "('" + theDate + "', '" + tbName + "');");
	
	document.getElementById(tbName).data = theDate;
}


function CompletaComZero(numero)
  {
    if (parseInt(numero)<10)
	 {
	   numero = '0'+ numero;
	  }
    return numero;
  }

function CalendarPopup_Up_ClearDate(tbName, lblName, /*divName, myName,*/ enableHide, postbackFunc, customFunc, /*visibleKey, */nullText) {
	var todayDate = new Date();
	document.getElementById(tbName).value = '';
	//if(lblName != '')
	//	document.getElementById(lblName).innerHTML = nullText;
	//document.getElementById(divName).style.visibility = 'hidden';
	//document.getElementById(myName).style.visibility = 'hidden';
	document.getElementById('dvCalendar').style.visibility = 'hidden';
	document.getElementById('dvMonthyear').style.visibility = 'hidden';
	if (enableHide)
		CalendarPopup_Up_ShowHideDDL('visible');
	if (postbackFunc != '')
    eval(postbackFunc + "();");
	if(customFunc != "")
		eval(customFunc + "('', '" + tbName + "');");
	document.getElementById(tbName).data = (todayDate.getMonth() + 1) + '/' + todayDate.getDate() + '/' + todayDate.getFullYear();
	//eval(visibleKey + ' = \"' + (todayDate.getMonth() + 1) + '/' + todayDate.getDate() + '/' + todayDate.getFullYear() + '\";');
}

function Calendar_Up_CallClick(e, tbName, picName)
{
	if (!eval("document.getElementById('dvCalendar')"))
	{
		
		var div1;
		var div2;		
		try {
			div1 = document.createElement('<div id="dvCalendar" onmouseover="document.onmousedown = null;" onmouseout="document.onmousedown = CalendarPopup_Up_LostFocus;" style="visibility:hidden;z-index:5000;position:absolute;"></div>');
			div2 = document.createElement('<div id="dvMonthYear" onmouseover="document.onmousedown = null;" onmouseout="document.onmousedown = CalendarPopup_Up_LostFocus;" style="visibility:hidden;z-index:5001;position:absolute;"></div>');
		} catch (e) {
			div1 = document.createElement('div');
			div1.setAttribute('id','dvCalendar');
			div1.setAttribute('onmouseover','document.onmousedown = null;');
			div1.setAttribute('onmouseout','document.onmousedown = CalendarPopup_Up_LostFocus;');
			div1.setAttribute('style','visibility:hidden;z-index:5000;position:absolute;');
			
			div2 = document.createElement('div');
			div2.setAttribute('id','dvMonthYear');
			div2.setAttribute('onmouseover','document.onmousedown = null;');
			div2.setAttribute('onmouseout','document.onmousedown = CalendarPopup_Up_LostFocus;');
			div2.setAttribute('style','visibility:hidden;z-index:5001;position:absolute;');
		}
		
		var body = document.getElementsByTagName("body")[0];
		
		body.appendChild(div1);
		body.appendChild(div2);
		
		//document.body.innerHTML = document.body.innerHTML + '	<div id="dvCalendar" onmouseover="document.onmousedown = null;" onmouseout="document.onmousedown = CalendarPopup_Up_LostFocus;" style="visibility:hidden;z-index:5000;position:absolute;"></div>';
		//document.body.innerHTML = document.body.innerHTML + '<div id="dvMonthYear" onmouseover="document.onmousedown = null;" onmouseout="document.onmousedown = CalendarPopup_Up_LostFocus;" style="visibility:hidden;z-index:5001;position:absolute;"></div>';
	}
	
	var tb = document.getElementById(tbName);
	
	if (tb.value != ''){
		var dt = tb.value.split('/');
		tb.data = dt[1] + '/' + dt[0] + '/' + dt[2];
	}
	else
	{
		var dt = new Date();

		var d = dt.getDate();
		var m = dt.getMonth() + 1;
		var y = dt.getFullYear();
		
		tb.data = CompletaComZero(m) + '/' + CompletaComZero(d) + '/' + y;	
	}
	if (picName == '')
		picName = tbName;
	
	CalendarPopup_Up_DisplayCalendar(false, tbName, picName,"", "Calendar_Up_PreDisplayCalendar", "Calendar_Up_PreMonthYear", "style='color:Black;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:Black;background-color:LightSteelBlue;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:Gray;background-color:WhiteSmoke;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:White;background-color:SteelBlue;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:Navy;background-color:Gainsboro;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:White;background-color:RoyalBlue;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", "style='color:Navy;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", "style='color:Blue;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;font-weight:bold;'", "style='color:Navy;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", "style='color:Red;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", 2, 0, 0, 6, false, false, '01/01/1000', '12/31/9999','',3, true, '', 0, 0, false, 'Clear Date', false, 'Data Atual:', '', '', -1, "Select a Date", null, '', '', '', '');
}

function Calendar_Up_PreDisplayCalendar(theDate, tbName, picName)
{
	CalendarPopup_Up_DisplayCalendarByDate(tbName,picName,"Calendar_Up_PreDisplayCalendar", "Calendar_Up_PreMonthYear", theDate, "style='color:Black;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:Black;background-color:LightSteelBlue;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:Gray;background-color:WhiteSmoke;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:White;background-color:SteelBlue;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:Navy;background-color:Gainsboro;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'","style='color:White;background-color:RoyalBlue;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", "style='color:Navy;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", "style='color:Blue;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;font-weight:bold;'", "style='color:Navy;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", "style='color:Red;background-color:White;font-family:Verdana,Helvetica,Tahoma,Arial;font-size:XX-Small;'", 2, 0, 0, 6, false, false, '01/01/1000', '12/31/9999', true, '', false, 'Clear Date', false, 'Data Atual:', '', '', -1, "Select a Date", null, '', '', '', '');
}

function Calendar_Up_PreMonthYear(theDate, tbName, picName)
{
	CalendarPopup_Up_DisplayMonthYear("Calendar_Up_PreDisplayCalendar", "Calendar_Up_PreMonthYear", theDate, "01/01/1000", "12/31/9999", tbName, picName);
}

document.onmousedown = CalendarPopup_Up_LostFocus;

// -->
