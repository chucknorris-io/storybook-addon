import pkg from './../../package.json';

export const randomJoke = () =>
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onerror = err => reject(err);

    req.onreadystatechange = () => {
      if (4 === req.readyState && 200 === req.status)
        resolve(JSON.parse(req.responseText));
    };

    req.open('GET', 'https://api.chucknorris.io/jokes/random', true);
    req.send();
  });
