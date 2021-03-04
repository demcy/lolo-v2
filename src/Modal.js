import React from 'react';
import Mercury from "@postlight/mercury-parser";

export default class Modal extends React.Component {

    state = {
        link: this.props.link
    }

    componentDidMount() {
        const url =  this.props.link;
            Mercury.parse(url).then(result => console.log(result));
        // const user = {
        //     firstName: 'John',
        //     lastName: 'Doe',
        //     email: 'john.doe@example.com',
        // }
        // const user = "https://curity.io/product"
        // const handler = {
        //     get(target, property) {
        //         console.log(`Property ${property} has been read.`);
        //         return target[property];
        //     }
        // }
        //let proxy = new Proxy(user, handler);
        // let proxy = new Proxy(user, {});
        // console.log(proxy.firstName);
        // //'https://cors-anywhere.herokuapp.com/'
        // //https://curity.io/product
        // const p = new Proxy("https://curity.io",  {
        //     get: function("product", ) {
        //     console.log('lalla')
        //     const url =  this.props.link;
        //     //Mercury.parse(url).then(result => console.log(result));
        // }})
        // const url =  this.props.link;
        // //console.log(url)
        // //Mercury.parse(url).then(result => console.log(result));
    }

    render() {
        return (
            <div className="Modal-body">
                <div className="Modal-x">
                    <button onClick={this.props.onCloseModal.bind(this)}>x</button>
                </div>
                <div>
                    {this.state.link}
                </div>

            </div>
        );
    }
}