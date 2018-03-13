import React     from 'react';
import ReactDOM  from 'react-dom';

//Styles
import './list-box.less';

//ListBox
class ListBox extends React.Component{

  constructor(props){

    super(props);
    this.state  = {selectIndex:null};

  }

  render(){
    
    return (<div className="list">
              <div className="title">
                {this.props.title}
              </div>
              <div className="list-div">
                <ul>
                  {this.props.items.map((value,i) =>{

                    //If is active the item mark.
                    if (i==this.state.selectIndex)
                      return <li className="item selected" key={i} onClick={()=>{                        
                        this.setState({selectIndex:i},()=>{
                            this.props.onChange({ix:i,obj:value});
                        });
                      }}>{value}</li>;
                    else
                      return <li className="item" key={i} onClick={()=>{
                        this.setState({selectIndex:i},()=>{
                            this.props.onChange({ix:i,obj:value});
                        });
                      }}>{value}</li>;

                  })}
                </ul>
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