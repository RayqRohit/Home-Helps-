import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>


            <div class="main-footer-section">

                <div class="container">
                    <div class="main-footer-container">


                        <div class="main-footer-logo">
                            <img src={assets.logo2} alt="Logo" />
                        </div>


                        <div class="center-section">
                            <div class="center-part">
                                <h2>Company</h2>
                                <ul>
                                    <li><a href="#">
                                        About us </a></li>
                                    <li><a href="#">Terms & conditions </a></li>
                                    <li><a href="#">Privacy policy </a></li>
                                    <li><a href="#">
                                        Anti-discrimination policy </a></li>
                                    <li><a href="#">
                                        UC impact </a></li>
                                    <li><a href="#">
                                        Careers </a></li>
                                </ul>
                            </div>
                            <div class="center-part">
                                <h2>For customers</h2>
                                <ul>
                                    <li><a href="#">UC reviews </a></li>
                                    <li><a href="#">Categories near you </a></li>
                                    <li><a href="#">Blog </a></li>
                                    <li><a href="#">Contact us</a></li>
                                </ul>
                            </div>
                            <div class="center-part">
                                <h2>For partners</h2>
                                <ul>
                                    <li><a href="#">Register as a professional </a></li>
                                    <li><a href="#">For Promotions</a></li>

                                </ul>
                            </div>
                            <div class="center-part">
                                <h2>Social links</h2>
                                <ul>
                                    <div class="social-icons">
                                        <a href=""><i class="ri-twitter-x-line"></i></a>
                                        <a href=""><i class="ri-instagram-line"></i></a>
                                        <a href=""><i class="ri-facebook-circle-line"></i></a>
                                        <a href=""><i class="ri-linkedin-box-line"></i></a>
                                    </div>

                                    <li><a href=""><img src="/assets/images/social media/appstore.png" alt="" /></a></li>
                                    <li><a href=""><img src="/assets/images/social media/googleplay.png" alt="" /></a></li>
                                </ul>
                            </div>
                        </div>



                    </div>
                </div>

            </div>




            <hr />

            <p className='footer-copyright'>
                &copy; 2024 Home Helps App. All Rights Reserved.
            </p>

        </div>
    )
}

export default Footer