'use strict';

const username = document.getElementById('username'),
      registerUser = document.getElementById('registerUser'),
      login = document.getElementById('login'),
      list = document.getElementById('list');


let localArr = [];

const takeLocalStorage = () => {

  if (localStorage.localJson !== undefined) {
    localArr = JSON.parse(localStorage.localJson);
    return localArr;
  }
};

const addToLocalStorage = () => {
  
  localStorage.localJson = JSON.stringify(localArr);
};

takeLocalStorage();

registerUser.addEventListener('click', () => {
  let login,
      password,
      name,
      regData;
      
      do {
        name = prompt('Введите ваше имя и фамилию', 'gtf zzd');
      } while (!name || name === '');
      name = name.trim().split(' ');

     if(name.length === 2) {

      const [firstName, lastName] = name;
      do {
        login = prompt('Введите логин');
      } while (!login || login === '');

      do {
        password = prompt('Введите пароль');
      } while (!password || password === '');

      const monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

      regData = `${new Date().getDate()} ${monthArr[new Date().getMonth()]} ${new Date().getFullYear()} г., ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

      localArr.push({firstName, lastName, login, password, regData});
    } else {
      alert('Введите имя и фамилию корректно');
      return regData();
    }
  return render();
});

login.addEventListener('click', ()=> {
  let loginReg,
      passwordReg,
      nameReg;
      
      do {
      nameReg = prompt('Введите ваше имя и фамилию', 'gtf zzd');
      } while (!nameReg || nameReg === '');
      nameReg = nameReg.trim().split(' ');

     if(nameReg.length === 2) {

      const [firstNameReg, lastNameReg] = nameReg;
      do {
        loginReg = prompt('Введите логин');
      } while (!loginReg || loginReg === '');

      do {
        passwordReg = prompt('Введите пароль');
      } while (!passwordReg || passwordReg === '');

      const regArr = localArr.filter(item => item.firstName === firstNameReg && item.lastName === lastNameReg && item.login === loginReg && item.password === passwordReg);

      if (regArr.length > 0) {
        username.innerHTML = firstNameReg;
      }
    } else {
      alert('Введите имя и фамилию корректно');
      return ;
    }
  return render();
});

const render = function() {

  list.textContent = '';
  
  addToLocalStorage();

  localArr.forEach((item) => {
    const li = document.createElement('li');
    const {firstName, lastName, regData} = item;
    li.innerHTML = `Имя: ${firstName}, Фамилия: ${lastName}, зарегистрирован ${regData}   <button class="del">Удалить</button>`;
    list.append(li);
    
    const del = li.querySelector('.del');
    del.addEventListener('click', () => {

      for (let i = 0; i < localArr.length; i++) {

        if (localArr[i] === item) {
          localArr.splice(i, 1);
          i--;
        }
      }
    render();
    });
  });
};
















