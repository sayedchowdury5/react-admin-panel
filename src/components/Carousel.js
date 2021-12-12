import React from 'react'
import Carousel, { autoplayPlugin, slidesToShowPlugin, slidesToScrollPlugin, arrowsPlugin } from '@brainhubeu/react-carousel';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CarouselComponent = () => {
    return (
        <div>
            <Carousel 
                plugins={
                    [
                        'infinite',
                        {
                            resolve: slidesToShowPlugin,
                            options: 
                            {
                                numberOfSlides: 3,
                            }
                        },
                        // {
                        //     resolve: arrowsPlugin,
                        //     options: 
                        //     {
                        //       numberOfSlides: 3,
                        //       arrowLeft: <button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} /></button>,
                        //       arrowLeftDisabled:<button><FontAwesomeIcon icon={['fas', 'angle-double-left']} /></button>,
                        //       arrowRight: <button><FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></button>,
                        //       arrowRightDisabled: <button><FontAwesomeIcon icon={['fas', 'angle-double-right']} /></button>,
                        //       addArrowClickHandler: true,
                        //     }
                        // },
                        {
                            resolve: slidesToScrollPlugin,
                            options: {
                             numberOfSlides: 2,
                            },
                        },
                        {
                            resolve: autoplayPlugin,
                            options: {
                                interval: 2000,
                            },
                        },

                    ]
                }
                animationSpeed={1000}
            >
                <div className="text-center">
                    <Image src={window.location.origin+'/images/bible.jpeg'} alt="bible image" width="100px" height="100px" rounded fluid /><br/>
                    <h6><small>The Book of Genesis</small></h6>
                    <small>Writer: Robert Lucas</small>
                </div>
                <div className="text-center">
                    <Image src={window.location.origin+'/images/bible.jpeg'} alt="bible image" width="100px" height="100px" rounded fluid /><br/>
                    <h6><small>The Book of Genesis</small></h6>
                    <small>Writer: Robert Lucas</small>
                </div>
                <div className="text-center">
                    <Image src={window.location.origin+'/images/bible.jpeg'} alt="bible image" width="100px" height="100px" rounded fluid /><br/>
                    <h6><small>The Book of Genesis</small></h6>
                    <small>Writer: Robert Lucas</small>
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComponent
