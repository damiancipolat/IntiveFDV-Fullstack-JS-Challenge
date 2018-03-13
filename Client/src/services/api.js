class Api{

  getCountries(){

    return new Promise((resolve,reject)=>{

      const url = 'https://restcountries.eu/rest/v2/all';

      //Hago el request.
      fetch(url)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch((err)=>reject(err));

    });

  }

}

export default new Api();