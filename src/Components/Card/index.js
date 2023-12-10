import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Home from '../Home'

class Card extends Component {
  state = {detailsList: [], isLoading: true}

  componentDidMount() {
    this.fetchedData()
  }

  fetchedData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    console.log(data)

    const formattedData = data.map(eachItem => ({
      description: eachItem.description,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    this.setState({detailsList: formattedData, isLoading: false})
  }

  render() {
    const {detailsList, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          detailsList.map(item => (
            <Home
              key={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              description={item.description}
            />
          ))
        )}
      </div>
    )
  }
}
export default Card
