import React, { Component } from 'react';

export default class Carousel extends Component {

    // taking a state variable
    state = {
        current : 0
    }

    //class level var
    timer = null;

    //slideimage is called every 1 sec
    componentDidMount() {
        this.timer = setInterval(this.slideImage, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    slideImage = () => {
        let slide = this.state.current + 1;
        if(slide >= this.props.images.length) {
            slide = 0;
        }

        this.setState({ current : slide });
    }

    render() {
        let total = this.props.images.length;
        let current = this.state.current;
        if(current >= total) {
            current = 0;
        }

        let image = this.props.images[current];
        if(!image) {
            return null;
        }

        return <div className='carousel-container'>
            <img className='carousel-image' src={ image} />
        </div>
    }

}
