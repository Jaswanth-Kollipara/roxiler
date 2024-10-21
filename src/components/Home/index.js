import { Component } from 'react';
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class Home  extends Component{
    state={
        data: [],
        apiStatus: apiStatusConstants.initial,
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const apiUrl = " https://s3.amazonaws.com/roxiler.com/product_transaction.json"
        const response = await fetch(apiUrl)
        if (response.ok) {
          const fetchedData = await response.json()
          const updatedData = fetchedData.map(val=>({
            id: val.id,
            title: val.title,
            price: val.price,
            description: val.description,
            category: val.category,
            image: val.image,
            sold: val.sold,
            dateOfSale: val.dateOfSale,
          }))
          this.setState({
            data: updatedData,
            apiStatus: apiStatusConstants.success,
          })
        }
        if (response.status === 404) {
          this.setState({
            apiStatus: apiStatusConstants.failure,
          })
        }
    }

    renderDetailsView=()=>{
        const {data} = this.state

        return(
            <div>
                {data}
            </div>
        )
    }

    renderLoadingView = () => (
        <div>
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    
      renderFailureView = () => (
        <div className="products-error-view-container">
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png" alt="all-products-error" className="products-failure-img" />
          <h1 className="product-failure-heading-text">Oops! Something Went Wrong</h1>
          <p className="products-failure-description">We are having some trouble processing your request. Please try again.</p>
        </div>
      )

    renderDetails = () => {
        const {apiStatus} = this.state
    
        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderDetailsView()
          case apiStatusConstants.failure:
            return this.renderFailureView()
          case apiStatusConstants.inProgress:
            return this.renderLoadingView()
          default:
            return null
        }
      }

    render() {
        return(    
            <div>
                {this.renderDetails()}
            </div>
        )
    }
}
  
export default Home