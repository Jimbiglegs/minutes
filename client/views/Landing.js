import React,{Component} from 'react';
import Carousel from '../component/Carousel';
import LandingPageAbout from '../component/LandingPageAbout';
import Group from '../component/Group';

const images = [
    'https://via.placeholder.com/350x150',
    '/images/car1.jpg',
    '/images/japan.jpg',
    '/images/car.jpg',
    '/images/birds-gg.jpg',
    '/images/sfo.jpg'
]

export default class Landing extends Component {

    render() {
        return <Group>
                <Carousel images={ images } />
                <LandingPageAbout />
            </Group>;
    }
}