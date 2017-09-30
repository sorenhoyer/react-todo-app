import React/*, { Component }*/ from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({addTodo}) => {
  let input;

  return <div>
    <h3>Add Todo</h3>
    <form onSubmit={(e) => 
      {
        e.preventDefault();
        if(input.value === '') {
          alert('title is required');
        } else {
          let newTodo = {
            title: input.value,
            completed: false
          }
          addTodo(newTodo);
          input.value = '';
        }
      }
    }>
      <label>Title</label>
      <input type="text" ref={title => { input = title }}/>
      <input type="submit" value="Submit"/>
    </form>
  </div>
}

// class AddTodo extends Component {
//   constructor() {
//     super();
//     this.state = {
//       newTodo: {}
//     };
//   }

//   handleSubmit(e) {
//     if(this.refs.title.value === '') {
//       alert('title is required');
//     } else {
//       this.setState({
//         newTodo: {
//           title: this.refs.title.value,
//           completed: false
//         }
//       }, function(){
//         // console.log(this.state);
//         this.props.addTodo(this.state.newTodo);
//       });
//     }
//     e.preventDefault();
//   }

//   render() {
//     return <div>
//       <h3>Add Todo</h3>
//       <form onSubmit={this.handleSubmit.bind(this)}>
//         <label>Title</label>
//         <input type="text" ref="title"/>
//         <input type="submit" value="Submit"/>
//       </form>
//     </div>
//   }
// }

AddTodo.propTypes = {
  newTodo: PropTypes.func
}

export default AddTodo;
