import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public storage = {
    events: []
  };

  constructor() { }

  public add = (key, value) => {
    let list: any = [];
    if(typeof value === 'object' && value.length){      
      list = value;
    } else {
      list.push(value);
    }

    if (!localStorage || !localStorage[key]) {
        localStorage.setItem(key, JSON.stringify(list));
    } else {
      list = list.concat(JSON.parse(localStorage[key]));
      localStorage.setItem(key, JSON.stringify(list));
    }
  }

  public remove = (index, key) => {
    let list: any = [];
    if (localStorage && localStorage[key]) {
        list = JSON.parse(localStorage[key]);
        list.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(list));
    }
    return list;
  }
  public update = (index, key, value) => {
    let list: any = [];
    if (localStorage && localStorage[key]) {
        list = JSON.parse(localStorage[key]);
        list[index] = value;
        localStorage.setItem(key, JSON.stringify(list));
    }
    return list;
  }

  public getValue = (key) => {
    if (localStorage && localStorage[key]) {
        let value = JSON.parse(localStorage[key]);
        return value;
    } else {
        return false;
    }
  }

  public getValueAt = (index, key) => {
    if (localStorage && localStorage[key]) {
        let value = JSON.parse(localStorage[key]);
        return value[index] || null;
    } else {
        return false;
    }
  }

  clearLocalStorage = () => {
    localStorage.clear();
  }

}
