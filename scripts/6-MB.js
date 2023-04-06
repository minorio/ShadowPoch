// const prefix = "http://localhost:3003/api/6/mb/";
const prefix = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/6/mb/'

const fetchWithLog = (...args) =>
  fetch(...args).then((res) => res.json()).then(console.log);

//Создание пользователя
fetchWithLog(prefix + 'user', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    login: "login",
    password: '12345',
  })
});

// получить все записи, если нету вернет пустой массив
fetchWithLog(prefix + 'user');

// получить юзера по id
fetchWithLog(prefix + 'user' + "/1");

//изменние юзера
fetchWithLog(prefix + 'user' + "/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    avatarImg: "avatarImg"
  })
});
// Login, если надо, вернет или юзера или null
fetchWithLog(prefix + 'user' + "/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    login: "login",
    password: "password"
  })
});

// Удалить юзера
fetchWithLog(prefix + 'user' + "/1", {
  method: "DELETE"
});

//// PRODUCT

//Создание товара
fetchWithLog(prefix + 'product', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: 'title',
    price: 10,
    count: 100,
    sizes: ['L', 'M']
  })
});

/// Дальше все методы аналогичны - эдит, гет, делит и прочее

//// PRODUCT STATUS

//Создание товара
fetchWithLog(prefix + 'product-status', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    accountId: 1,
    productId: 1,
    size: 'L',
    status: 'status'
  })
});

/// Дальше все методы аналогичны - эдит, гет, делит и прочее

/// Только по гет нюанс, чтобы было проще искать, можно фильтровать записи по
// accountId
// productId
// status
// как по одному, так и по нескольким параметрам одновременно
fetchWithLog(prefix + 'product-status?status=status&productId=1&accountId=1');