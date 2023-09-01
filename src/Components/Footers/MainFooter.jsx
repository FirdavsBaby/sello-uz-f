import React from 'react'
import Img from '../../../public/footer_start.png'
import LogoFooter from '../../../public/logo2.svg'
import Payment1 from '../../../public/sellopay.svg'
import Payment2 from '../../../public/humo.svg'
import Payment3 from '../../../public/zoomrad.svg'
import Payment4 from '../../../public/uzcard.svg'
import App from '../../../public/iphone.svg'
import { Link } from 'react-router-dom';

const MainFooter = () => {

  return (
    <footer id='footer'>
      <img src={Img} alt="" />
      <div id='nofitications'>
        <h4>
        Subscribe and be the first to know about discounts and promotions!
        </h4>
        <form>
        <input type="text" name="code" id="" placeholder='Enter your email address'/>
        <button>Send</button>
        </form>
      </div>
      <div id='links'>
        <div className="link">
            <img src={LogoFooter} alt="" />
            <p>© 2022 OOO «Marketplace Trading»</p>
            <h6>Payment systems</h6>
            <div className='payments'>
                <img src={Payment1} alt="" />
                <img src={Payment2} alt="" />
                <img src={Payment3} alt="" />
                <img src={Payment4} alt="" />
            </div>
        </div>
        <div className="link">
            <h6>Why choose us</h6>
            <ul>
                <li><Link className='li-link'>Payment</Link></li>
                <li><Link className='li-link'>Return and exchange of goods</Link></li>
                <li><Link className='li-link'>Delivery</Link></li>
                <li><Link className='li-link'>Requisites</Link></li>
                <li><Link className='li-link'>Pickup points</Link></li>
                <li><Link className='li-link'>Applications</Link></li>
            </ul>
        </div>
        <div className="link">
            <h6>About company</h6>
            <ul>
                <li><Link className='li-link'>About Us</Link></li>
                <li><Link className='li-link'>Contacts</Link></li>
                <li><Link className='li-link'>Personal data processing policy</Link></li>
                <li><Link className='li-link'>Public offer</Link></li>
                <li><Link className='li-link'>Terms of use</Link></li>
                <li><Link className='li-link'>FAQ</Link></li>
                <li><Link className='li-link'>General conditions for holding promotions</Link></li>
            </ul>
        </div>
        <div className="link">
            <h6>Contacts</h6>
            <ul>
                <li><Link className='li-2-link'>Call us: <span>+998 (78) 113 09 00</span></Link></li>
                <li><Link className='li-2-link'>Write to us: <span>support@sello.uz</span></Link></li>
                <li><Link className='li-2-link'>Telegram: <span>@sellouz</span></Link></li>
                <li>
                    <p>Social media:</p>
                    <div className='social-medias'>
                        <Link><i className="fa-brands fa-facebook-f"></i></Link>
                        <Link><i className="fa-brands fa-telegram"></i></Link>
                        <Link><i className="fa-brands fa-instagram"></i></Link>
                    </div>
                </li>
            </ul>
        </div>
        <div className="link">
            <h6>Download app</h6>
            <ul id='apps'>
                <li><a target='_blank' href='https://apps.apple.com/uz/app/sello-uz/id1603818062' className='li-3-link'><i className="fa-brands fa-apple"></i><span>AppStore</span></a></li>
                <li><a target='_blank' href='https://play.google.com/store/apps/details?id=com.tune.sello' className='li-3-link'><i className="fa-brands fa-google-play"></i> <span>Google play</span></a></li>
                <li><a href='https://appgallery.huawei.com/app/C106203671?sharePrepath=ag&locale=en_US&source=appshare&subsource=C106203671&shareTo=org.telegram.messenger&shareFrom=appmarket&shareIds=f8e6ff09f4f94eed9e6b587a881a8d80_org.telegram.messenger&callType=SHARE' target='_blank' className='li-3-link'><span>App Gallery</span></a></li>
            </ul>
            <img src={App} alt="" />
        </div>
      </div>
    </footer>
  )
}

export default MainFooter
