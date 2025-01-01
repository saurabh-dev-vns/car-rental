import React from 'react';
import './Card.css';
import image from "../../images/taxi.jpg"
const Card = () => {
    return (
        <div className="car-card">
            <div className="car-image">
                <img src={image} alt="Car" />
            </div>
            
            <div className="card-content">
                <div className="car-header">
                    <h3 className="car-name">Yellow</h3>
                    <span className="car-price">₹150/Hour</span>
                </div>
                
                <div className="car-features">
                    <div className="feature">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Auto</span>
                    </div>
                    <div className="feature">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>4 Seats</span>
                    </div>
                    <div className="feature">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Electric</span>
                    </div>
                    <div className="feature">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>GPS</span>
                    </div>
                </div>
                
                <button className="book-button">Book Now</button>
            </div>
        </div>
    );
};

export default Card;