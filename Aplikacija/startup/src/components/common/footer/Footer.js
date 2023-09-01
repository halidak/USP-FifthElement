import React from "react"
import { footer } from "../../data/Data"
import "./Footer.css"
import logo from '../../../assets/startupp.png';

function Footer() {
  return (
    <div className="footerChat">
      <footer>
        <div className='containerF'>
        <img src={logo} className='img'/>
          {footer.map((val) => (
            <div className='box' key={val.title}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li key={items.list}> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal'>
        <span>© 2022 StartUp. Designd By Beta.</span>
      </div>
    </div>
  )
}

export default Footer
