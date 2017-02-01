import 'whatwg-fetch'

const host = '//localhost:3000/';

export const initTalks = () => {
  let url = host + 'initTalks';  
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) return false;
    else return res;
  })
  .then((res) => {return res.json()})
  .then((talks) => {
    console.log(talks);
    dispatch({ type: 'INIT_TALKS', talks})
  })
  .catch(function(error) {
    console.log(error)
  })
}

export const addTalk = (talk) => {
}