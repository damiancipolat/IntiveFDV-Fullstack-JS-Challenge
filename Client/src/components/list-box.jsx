import React     from 'react';
import ReactDOM  from 'react-dom';

//Cargo less
import './list-box.less';

//Objeto custom listbox.
class ListBox extends React.Component{

  constructor(props){

    super(props);
    this.state  = {selectIndex:null};

  }

  getItems(){

    let items = null;

    if (this.props.items!=null){

      items = this.props.items.map((value,i) =>{

        //If is active the item mark.
        if (i==this.state.selectIndex)
          return <li className="item selected" key={i} onClick={()=>{

            this.setState({selectIndex:i},()=>{
                this.props.onChange({ix:i,obj:value});
            });

          }}>{value.txt}</li>;
        else
          return <li className="item" key={i} onClick={()=>{

            this.setState({selectIndex:i},()=>{
                this.props.onChange({ix:i,obj:value});
            });

          }}>{value.txt}</li>;

      });

      return items;

    }
    else
      return null;

  }

  render(){
    
    let style = null;
    
    if (this.props.height!=null)
      style = {"height": this.props.height};

    return (<div className="list">
              <div className="title">
                {this.props.title}
              </div>
              <div className="list-div">
                <div className="list-container" style={style}>
                  <ul>
                    {this.getItems()}
                  </ul>
                </div>
              </div>
            </div>);

  }

}

ListBox.propTypes = {
  title    : React.PropTypes.string,
  items    : React.PropTypes.array,
  onChange : React.PropTypes.func
};

export default ListBox;