'use strict'
import 'node-fetch'

export const initTalks = () => { (dispatch, getState) => {
  let url = '//localhost:3000/initTalks';
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(talk)  
  })
  .then((res) => {return res.json()})
  .then((talks) => {
    talks = talksSort(talks);
    dispatch({ type: 'INIT_TALKS', talk})
  })
  .catch(function(error) {
    console.log(error)
  })
}}

export const addTalk = (talk) => { (dispatch, getState) => {
  let url = '//localhost:3000/addTalk';
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(talk)  
  })
  .then((res) => {return checkStatus(res)})
  .then((res) => {return res.json()})
  .then((talks) => {
    console.log(talks);
    talks = talksSort(talks);
    dispatch({ type: 'ADD_TALKS', talk})
  })
  .catch(function(error) {
    console.log(error)
  })
}}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return false;
  } else {
    return res
  }
}

function talksSort(talks){
	newNotes.reverse();
	return newNotes;
}