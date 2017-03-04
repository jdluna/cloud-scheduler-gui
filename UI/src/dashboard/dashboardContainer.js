import React,{Component} from 'react'
import Dashboard from './dashboard'
import CardContainer from './reservationBar/cardContainer'

export default class DashboardContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            map: {
                // sites: [],
                chooseSite: [],
                card: []
            },
            cardPanel: {
                notfound: {display:'block'}
            }
        }
        this.onSelectMarker = this.onSelectMarker.bind(this)
        this.onCloseCard = this.onCloseCard.bind(this)
        // this.setMapData = this.setMapData.bind(this)
    }
    
    // setMapData(data){
    //     this.setState({
    //         map: {
    //             sites: data,
    //             chooseSite: []
    //         }
    //     })
    // }

    onSelectMarker(id){
        let marker = this.state.map.chooseSite
        if(marker.indexOf(parseInt(id))==-1){
            marker.push(parseInt(id))
            let card = []
            marker.map((data,key)=>{
                card.unshift(<CardContainer dashBoardContainer={this} siteId={data} key={key}/>)
            })
            this.setState({
                map:{
                    chooseSite: marker,
                    card: card
                },
                cardPanel: {
                    notfound: {display:'none'}
                }
            })
        }
    }

   onCloseCard(id){
        let {chooseSite,card} = this.state.map
        let index = chooseSite.indexOf(parseInt(id))
        chooseSite.splice(index,1)
        card.splice(((card.length-1)-index),1)
        this.setState({
            map:{
                chooseSite: chooseSite,
                card: card
            }
        })
        if(chooseSite.length==0){
            this.setState({
                cardPanel: {
                    notfound: {display:'block'}
                }
            })
        }
    }

    render() {
        return (
            <section>
                <Dashboard dashBoardContainer={this}/>
            </section>
        )
    }
}