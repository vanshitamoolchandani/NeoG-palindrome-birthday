var input = document.querySelector('#input');
var checkButton = document.querySelector('#check-button');
var output = document.querySelector('#output');

checkButton.addEventListener('click', clickButtonShow);

function clickButtonShow(e) {
    var bStr = input.value;
  
    if (bStr !== '') {
      var date = bStr.split('-');
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
  
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
      };
  
      var dateStr = revStrdateToStr(date);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;
  
      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }
  
      if (!isPalindrome) {
        const [ctr1, nextDate] = nextPalindromeDate(date);
        const [ctr2, prevDate] = previousPalindromeDate(date);
  
        if (ctr1 > ctr2) {
          output.innerText = "The nearest palindrome date is " +prevDate.day+"-"+prevDate.month+"-"+prevDate.year+", you missed by "+ctr2+" days.";
        } else {
            output.innerText = "The nearest palindrome date is " +nextDate.day+"-"+nextDate.month+"-"+nextDate.year+", you missed by "+ctr2+" days.";
        }
  
      } else {
        output.innerText = 'Congratulations! Your birthday is palindrome.';
      }
    }
  }
  

function revStr(str) {
    var listOfChars = str.split('');
    var revList = listOfChars.reverse();
    var reversedStr = revList.join('');
    return reversedStr;
  }
  
  function dateStrPalindrome(str) {
    var reversedStr = revStr(str);
    return str === reversedStr;
  }
  
  function revStrdateToStr(date) {
    var dateInStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    return dateInStr;
  }
  
  function dateForm(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var mmddyyyy = date.month + date.day + date.year;
    
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  
  function checkPalindromeForAllDateFormats(date) {

    var dateFormList = dateForm(date);

    var palindromeList = [];
  

    for (var i = 0; i < dateFormList.length; i++) {

      var result = dateStrPalindrome(dateFormList[i]);

      palindromeList.push(result);
    }
    return palindromeList;
  }
  
  function checkLeapYear(year) {
  
    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  
  function getNextDate(date) 
  {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var numOfDaysInMon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (checkLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > numOfDaysInMon[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  function getPreviousDate(date) 
  {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var numOfDaysInMon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (checkLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = numOfDaysInMon[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  function nextPalindromeDate(date) {
  
    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = revStrdateToStr(nextDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  
  
  
function previousPalindromeDate(date) {
  
    var previousDate = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = revStrdateToStr(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }
    

  
  
  