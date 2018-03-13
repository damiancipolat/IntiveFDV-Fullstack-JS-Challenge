import estado  from './store.js';

// Preparamos nuestra funcion reducer
const reducer = (state = estado, action) => {
  
  switch(action.type) {
    case 'get-countries':{

      return {
          visitor      : state.visitor,
          lastVisitors : state.lastVisitors,
          countries    : action.countries
      };

    }
    break;
    case 'save-visitor':{

      let newVisitor = {
        visitor : action.visitor,
        txt     : action.visitor.name+" - "+action.visitor.country.obj.txt+" - "+action.visitor.birthday
      };

      //Agrego un visitante al registro.
      return {
                visitor      : state.visitor,
                lastVisitors : [...state.lastVisitors,newVisitor],
                countries    : state.countries
            };

    }
    break;
    case 'update-country':{
      
      //Actualizo el pais.
      let obj = {
                  visitor:{
                    name     : state.visitor.name,
                    country  : action.country,
                    birthday : state.visitor.birthday
                  },
                  lastVisitors:state.lastVisitors,
                  countries   : state.countries
                };

      return obj;

    }
    break;    
    case 'update-name':{

      //Actualizo el nombre.
      let obj = {
                  visitor:{
                    name     : action.name,
                    country  : state.visitor.country,
                    birthday : state.visitor.birthday
                  },
                  lastVisitors: state.lastVisitors,
                  countries   : state.countries
                };

      return obj;

    }
    break;
    case 'update-birthday':{
      
      //Actualizo el cumpleaños.
      let obj = {
                  visitor:{
                    name     : state.visitor.name,
                    country  : state.visitor.country,
                    birthday : action.date
                  },
                  lastVisitors: state.lastVisitors,
                  countries   : state.countries
                };

      return obj;

    }
    break;
    default:
      return state;
  }

}

export default reducer;