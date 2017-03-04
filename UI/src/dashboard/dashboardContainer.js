import React,{Component} from 'react'
import Dashboard from './dashboard'
import CardContainer from './reservationBar/cardContainer'
import CardDescriptionContainer from './reservationBar/cardDescriptionContainer'

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
            },
            cardDetail : {
                panel: [],
                data: {}
            }
        }
        this.onSelectMarker = this.onSelectMarker.bind(this)
        this.onCloseCard = this.onCloseCard.bind(this)
        this.onViewMoreInfo = this.onViewMoreInfo.bind(this)
        this.onCloseMoreInfo = this.onCloseMoreInfo.bind(this)
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
    onCloseMoreInfo(){
        this.setState({
            cardDetail : {
                panel: [],
                data: {}
            }
        })
    }

    onViewMoreInfo(data){
        let panel = []
        panel.push(<CardDescriptionContainer dashBoardContainer={this} key={0}/>)
        this.setState({
            cardDetail : {
                panel: panel,
                data: data
            }
        })
    }

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