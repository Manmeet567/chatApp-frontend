import { useEffect,useState } from 'react'
import './FmpMainSection.css'
import {GoSearch} from 'react-icons/go'

function FmpMainSection({activeNavItem}) {

  useEffect(() => {
    console.log(activeNavItem)
  }, [activeNavItem])

  const searchBar = [{
    display:'none'
  },
  {
    display:'flex'
  },
  {
    display:'block'
  }
]

  const [titleText, setTitleText] = useState('All FRIENDS')

  useEffect(() => {
     if(activeNavItem === 'all'){
        setTitleText('All FRIENDS')
      }
      else if(activeNavItem === 'pending'){
        setTitleText('PENDING')
      }
      else if(activeNavItem === 'blocked') {
        setTitleText('BLOCK LIST')
      }
      else if(activeNavItem === 'addFriend') {
        setTitleText('ADD FRIEND')
      }
  }, [activeNavItem])

  return (
    <section className="fms-main-section">

        {/* All Friend List */}
        <div className="fms-all" style={activeNavItem === 'addFriend' ? searchBar[0] : searchBar[2]}>
          <div className="fms-search-bar" style={activeNavItem === 'all' ? searchBar[1] : searchBar[0]}>
            <input type="text" placeholder="Search" autoFocus/>
            <button><GoSearch className="fms-search-btn"/></button>
          </div>

          <div className="fms-all-friend-text">
              <p>{titleText} - 0</p>
          </div>

          <div className="fms-friend-list">
              <div className="fms-friend-info">
                  
              </div>
          </div>
        </div>

        {/* Add Friend Content */}
        <div className="fms-add-friend" style={activeNavItem === 'addFriend' ? searchBar[2] : searchBar[0]}>

          <div className="fms-all-friend-text">
              <p>{titleText} -</p>
          </div>
          
          <div className="fms-search-friend">
            <h1>Search Friend</h1>
          </div>
          
        </div>

    </section>
  )
}

export default FmpMainSection