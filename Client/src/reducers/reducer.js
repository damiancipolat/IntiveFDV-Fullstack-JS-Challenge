import estado  from './store.js';
import moment  from 'moment';

// Preparamos nuestra funcion reducer
const reducer = (state = estado, action) => {
  
  switch(action.type) {
    case 'change-label':{

      return {
                visitor: state.visitor,
                lastVisitors: state.lastVisitors,
                countries : state.countries,
                label: {
                  name: action.visitor.name,
                  country : action.visitor.country.obj.name,
                  day:moment(action.visitor.birthday, 'YYYY-MM-DD').day(),
                  month:moment(action.visitor.birthday, 'YYYY-MM-DD').year(),
                  years:moment().diff(moment(action.visitor.birthday, 'YYYY-MM-DD'),'years'),
                  show:true
                }
            };

    }
    break;    
    case 'get-countries':{

      return {
          visitor: state.visitor,
          lastVisitors: state.lastVisitors,
          countries: action.countries,
          label: state.label
      };

    }
    break;
    case 'save-visitor':{

      let newVisitor = {
        visitor : action.visitor,
        txt : action.visitor.name+" - "+action.visitor.country.obj.txt+" - "+moment(action.visitor.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')
      };

      //Agrego un visitante al registro.
      return {
                visitor: state.visitor,
                lastVisitors: [...state.lastVisitors,newVisitor],
                countries : state.countries,
                label: {
                  name: state.visitor.name,
                  country : action.visitor.country.obj.name,
                  day:moment(action.visitor.birthday, 'YYYY-MM-DD').day(),
                  month:moment(action.visitor.birthday, 'YYYY-MM-DD').year(),
                  years:moment().diff(moment(action.visitor.birthday, 'YYYY-MM-DD'),'years'),
                  show:true
                }
            };

    }
    break;
    case 'update-country':{
      
      //Actualizo el pais.
      let obj = {
                  visitor:{
                    name : state.visitor.name,
                    country: action.country,
                    birthday: state.visitor.birthday
                  },
                  lastVisitors:state.lastVisitors,
                  countries: state.countries,
                  label: state.label                  
                };

      return obj;

    }
    break;    
    case 'update-name':{

      //Actualizo el nombre.
      let obj = {
                  visitor:{
                    name: action.name,
                    country: state.visitor.country,
                    birthday: state.visitor.birthday
                  },
                  lastVisitors: state.lastVisitors,
                  countries: state.countries,
                  label: state.label
                };

      return obj;

    }
    break;
    case 'update-birthday':{
      
      //Actualizo el cumpleaños.
      let obj = {
                  visitor:{
                    name : state.visitor.name,
                    country: state.visitor.country,
                    birthday: action.date
                  },
                  lastVisitors: state.lastVisitors,
                  countries: state.countries,
                  label: state.label
                };

      return obj;

    }
    break;
    default:
      return state;
  }

}

export default reducer;