import React       from 'react';
import ReactDOM    from 'react-dom';
import { connect } from 'react-redux';

//Styles
import './form.less';

import ListBox from './components/list-box.jsx';
import Api     from './services/api.js';

const mapStateToProps = (state) => {
  return { state };
}

class Form extends React.Component{

  constructor(props){

    super(props);

    //Cargo los paises.    
    this.loadCountries();

    this.handleChangeName     = this.handleChangeName.bind(this);
    this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
    this.handleChangeCountry  = this.handleChangeCountry.bind(this);    
    this.handleSave           = this.handleSave.bind(this);

  }

  loadCountries(){
    
    //Hago el request.
    Api.getCountries().then((countries)=>{

      //Parseo la estructura del array.
      if (countries!=null){

        countries = countries.map((country)=>{

          return {
            code:country.alpha3Code,
            name:country.name,
            txt:country.name
          };

        });

        this.props.dispatch({type:'get-countries',countries:countries});
      }        

    }).catch((err)=>console.log('No se pueden cargar los paises',err));

  }

  handleChangeName(e){    
    this.props.dispatch({type:'update-name',name:e.target.value});
  }

  handleChangeBirthday(e){    
    this.props.dispatch({type:'update-birthday',date:e.target.value});
  }

  handleChangeCountry(countryObj){
    this.props.dispatch({type:'update-country',country:countryObj});
  }

  //Guardo en el store la nueva visita.
  handleSave(){
     this.props.dispatch({type:'save-visitor',visitor:this.props.state.visitor});
  }

  saveOk(){
    return ((this.props.state.visitor.name!='')&&(this.props.state.visitor.country!='')&&(this.props.state.visitor.birthday!=''));
  }

  render(){    

    return (<div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="banner">
                    <h4>Ejercicio Intive</h4>
                    <span>{(this.props.state.visitor!=undefined)?"Nombre: "+this.props.state.visitor.name:<br/>}</span>
                  </div>
                </div>
              </div>
              <div className="row form-div">
                <div className="col-md-6">
                  <div className="form-bloq">
                    <label>Nombre:</label>
                    <input type="text" value={this.props.state.visitor.name} onChange={this.handleChangeName}/>
                  </div>
                  <div className="form-bloq paises">
                    <label>Pais:</label>
                    <ListBox height={"300px"} items={this.props.state.countries} title="Paises" onChange={this.handleChangeCountry}/>
                  </div>
                  <div className="form-bloq">
                    <label>Cumpleaños:<br/>(dd/mm/yyyy)</label>
                    <input type="date" onChange={this.handleChangeBirthday}/>
                  </div>
                  <div className="form-bloq">
                    <button type="button" className={this.saveOk()?'btn btn-primary':'btn btn-primary disabled'} onClick={this.handleSave}>Saludar</button>
                  </div>
                  <div className="label-date">
                    <h3>Hola nombre de pais. el dia del mes tendras años</h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <ListBox height={"555px"} items={this.props.state.lastVisitors} title="Visitantes Anteriores" onChange={(e)=>{}}/>
                </div>
              </div>
            </div>);

  }

}

export default connect(mapStateToProps)(Form);