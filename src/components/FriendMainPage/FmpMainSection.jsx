import './FmpMainSection.css'
import {GoSearch} from 'react-icons/go'

function FmpMainSection() {
  return (
    <section className="fms-main-section">
        <div className="fms-search-bar">
            <input type="text" placeholder='Search' autoFocus/>
            <button><GoSearch className='fms-search-btn'/></button>
        </div>

        <div className="fms-all-friend-text">
            <p>ALL FRIENDS - 0</p>
        </div>

        <div className="fms-friend-list">
            <div className="fms-friend-info">
                
            </div>
        </div>
    </section>
  )
}

export default FmpMainSection