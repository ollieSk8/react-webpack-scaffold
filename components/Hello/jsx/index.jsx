/**
 * Created by ollie on 2017/12/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/index.scss';
class Hello extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React</h1>
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('hello'));