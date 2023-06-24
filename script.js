'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2023-05-18T21:31:17.178Z',
    '2023-04-23T07:42:02.383Z',
    '2023-05-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-06-20T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2023-05-01T13:15:33.035Z',
    '2023-05-30T09:48:16.867Z',
    '2023-04-25T06:04:23.907Z',
    '2023-05-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-19T18:49:59.371Z',
    '2023-06-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2023-05-01T13:15:33.035Z',
    '2023-05-30T09:48:16.867Z',
    '2023-04-25T06:04:23.907Z',
    '2023-05-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-19T18:49:59.371Z',
    '2023-06-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2023-05-01T13:15:33.035Z',
    '2023-05-30T09:48:16.867Z',
    '2023-04-25T06:04:23.907Z',
    '2023-05-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-19T18:49:59.371Z',
    '2023-06-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Rakesh Mondal',
  movements: [430, 1000, 700, -250, 190, -440, 220],
  interestRate: 3,
  pin: 5555,
  movementsDates: [
    '2023-05-01T13:15:33.035Z',
    '2023-05-30T09:48:16.867Z',
    '2023-04-25T06:04:23.907Z',
    '2023-05-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-19T18:49:59.371Z',
    '2023-06-20T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const calculateDateDifference = (date1, date2) => {
  const diffTimeStamp = new Date();
};

const calculateDayDifference = date => {
  const dayDiff = Math.abs(
    (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
  );
  let daystr;
  if (dayDiff > -1 && dayDiff < 1) {
    daystr = 'Today';
  } else if (dayDiff >= 1 && dayDiff < 2) {
    daystr = 'Yesterday';
  } else if (dayDiff >= 2 && dayDiff <= 30) {
    daystr = `${dayDiff.toFixed()} days ago.`;
  } else if (dayDiff > 30 && dayDiff <= 60) {
    daystr = 'a month ago';
  } else if (dayDiff > 60) {
    daystr = 'few month ago';
  }
  console.log('diffTimeStamp@@>>>>>', dayDiff, daystr);
  return daystr;
};

let currentAccount;

const formatAmount = amm => {
  const formatedAmm = new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
  }).format(amm);
  return formatedAmm;
};

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort
    ? [...movements].sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
      })
    : movements;
  movs.forEach((mov, i) => {
    const movDate = new Date(currentAccount.movementsDates[i]);
    const trnsDate = `${movDate.getDate()}`;
    const trnsMonth = `${movDate.getMonth() + 1}`;
    const transYear = movDate.getFullYear();

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${calculateDayDifference(movDate)}</div>
          <div class="movements__value">${formatAmount(mov)}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = account => {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${formatAmount(account.balance)}`;
};

const calcDisplaySummary = account => {
  const inAmount = account.movements
    .filter(val => val > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${formatAmount(inAmount)}`;

  const outAmount = account.movements
    .filter(val => val < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${formatAmount(outAmount)}`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatAmount(interest)}`;
};

const createUserName = accs => {
  accs.forEach(account => {
    const acnm = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    account.userName = acnm;
  });
};

createUserName(accounts);

console.log(accounts);

const updateBalanceUI = currentAccount => {
  displayMovements(currentAccount.movements);
  calcPrintBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

const convertTimeTo12Hours = (hours, minutes) => {
  let meridiem = hours >= 12 ? 'PM' : 'AM';
  let displayTime;
  const minuteString = `${minutes}`;
  let disPlayMinutes = minuteString.padStart(2, '0');

  if (hours > 12) {
    displayTime = hours - 12;
  } else {
    displayTime = hours;
  }
  return `${displayTime}:${disPlayMinutes} ${meridiem}`;
};

const showLoginDateTime = () => {
  const now = new Date();
  const currentDate = `${now.getDate()}`;
  const currentMonth = `${now.getMonth() + 1}`;
  const displayFormatedTime = convertTimeTo12Hours(
    now.getHours(),
    now.getMinutes()
  );
  const currentDateTime = `${currentDate.padStart(
    2,
    '0'
  )}-${currentMonth.padStart(
    2,
    '0'
  )}-${now.getFullYear()} ${displayFormatedTime} `;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
};

let logoutInterval;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN SUCCESS');
    labelWelcome.textContent = `Welecome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    showLoginDateTime();
    containerApp.style.opacity = 100;

    updateBalanceUI(currentAccount);

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    startLogoutTime();
  }
});
let logoutTime = 300;
const startLogoutTime = () => {
  logoutInterval = setInterval(() => {
    if (logoutTime >= 0) {
      const minutes = Math.floor(logoutTime / 60);
      const seconds = logoutTime - minutes * 60;
      const strMin = `${minutes}`;
      const strSec = `${seconds}`;
      labelTimer.textContent = `${strMin.padStart(2, 0)}:${strSec.padStart(
        2,
        0
      )}`;
      logoutTime--;
    } else {
      clearInterval(logoutInterval);
      containerApp.style.opacity = 0;
      currentAccount = null;
      logoutTime = 300;
    }
  }, 1000);
};

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount &&
    receiverAccount.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(new Date().toISOString());
    updateBalanceUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  } else {
    console.log("can't transfer");
  }
  console.log(amount, receiverAccount);
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.userName === inputCloseUsername.value
    );
    accounts.splice(accIndex, 1);
    containerApp.style.opacity = 0;
    console.log('Account deleted @@>>>', accounts);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  setTimeout(function () {
    const amount = Number(inputLoanAmount.value);
    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateBalanceUI(currentAccount);
    }
    inputLoanAmount.value = '';
  }, 2000);
});

/*
console.log('movements@@@', movements);

//  return <0, A, B (Keep order)
//  return >0, B, A (Switch order)
movements.sort((a, b) => {
  if (a > b) {
    return -1;
  } else {
    return 1;
  }
});

console.log('movements@@@', movements);

*/
let isSorted = false;
btnSort.addEventListener('click', e => {
  isSorted = !isSorted;
  e.preventDefault();
  displayMovements(currentAccount.movements, isSorted);
});
