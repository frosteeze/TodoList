import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo_description: '',
            todo_responsible:'',
            todo_priority:'',
            todo_completed: false,
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error){
                console.log('error')
            })
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    
    
    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e){
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e){
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        
        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id , newTodo)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h3 align='center'>Edit Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.todo_description}
                               onChange={this.onChangeTodoDescription}></input>
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input className="form-control" type="text" value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible}>
                        </input>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={this.state.todo_priority === 'Low'}
                            onChange={this.onChangeTodoPriority}></input>
                            <label className="form-check-label">Low</label>
                        </div>


                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={this.state.todo_priority === 'Medium'}
                            onChange={this.onChangeTodoPriority}></input>
                            <label className="form-check-label">Medium</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={this.state.todo_priority === 'High'}
                            onChange={this.onChangeTodoPriority}></input>
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" value="Edit Todo">Edit Todo</button>
                    </div>
                </form>
            </div>
        )
    }
}