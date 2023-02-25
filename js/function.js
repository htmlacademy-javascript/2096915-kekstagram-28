//Функция для проверки длины строки
const checkValidLength = (str, syms) => str.length <= syms;

checkValidLength('проверяемая строка', 18);


//Функция для проверки, является ли строка палиндромом
const isPalindrome = (str) => {
  const newStr = str.toLowerCase().replaceAll(' ', '');

  for (let i = 0; i < newStr.length / 2; i++) {
    if (newStr[i] !== newStr[newStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

isPalindrome('Лёша на полке клопа нашёл ');


//Функция, извлекающая цифры из строки
const getNumberOfString = (str) => {
  let total = '';

  if (parseFloat(str, 10) === Number(str)) {
    return Math.abs(str);
  }

  for (let i = 0; i < str.length; i++) {
    if (/[0-9]/.test(str[i])) {
      total += str[i];
    }
  }

  return parseInt(total, 10);
};

getNumberOfString('1 кефир, 0.5 батона');


//Функция, дополняющая строку указанными символами до заданной длины
const addSymsToString = (str, minLength, addition) => {
  const additionLength = minLength - str.length;

  if (additionLength <= 0) {
    return str;
  }

  return addition.slice(0, additionLength % addition.length) + addition.repeat(additionLength / addition.length) + str;
};

addSymsToString('q', 4, 'we');
