//Estructura del estado.
const estado ={
 count  : 0,
 visitor:{
    name     : '',
    country  : '',
    birthday : ''
 },
 lastVisitor:[]
};

// Preparamos nuestra funcion reducer
const reducer = (state = estado, action) => {
  
  switch(action.type) {
    case 'save-visitor':{

      //Agrego un visitante al registro.
      state.lastVisitor.push(action.visitor);

      return {
                visitor     : state.visitor,
                lastVisitor : state.lastVisitor
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
                  lastVisitor:state.visitor.lastVisitor
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
                  lastVisitor:state.visitor.lastVisitor
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
                  lastVisitor:state.visitor.lastVisitor                  
                };

      return obj;

    }
    break;
    default:
      return state;
  }

}

export default reducer;