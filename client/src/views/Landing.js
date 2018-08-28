import React,{Component} from 'react';
import Carousel from '../component/Carousel';
import LandingPageAbout from '../component/LandingPageAbout';
import Group from '../component/Group';

const images = [
    '/images/article_1.jpg',
    '/images/windy.jpg'
]

export default class Landing extends Component {

    render() {
        return <Group>
                <Carousel images={ images } />
                <LandingPageAbout />
            </Group>;
    }
}