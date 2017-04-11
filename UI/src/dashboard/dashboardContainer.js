import React,{Component} from 'react'
import Dashboard from './dashboard'
import CardContainer from './reservationBar/cardContainer'
import CardDescriptionContainer from './reservationBar/cardDescriptionContainer'
import SettingsContainer from './settings/settingsContainer'
import LoginContainer from './login/loginContainer'
import SearchContainer from './search/searchContainer'
import ReservationContainer from './reservation/reservationContainer'
import HistoryContainer from './history/historyContainer'

export default class DashboardContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            map: {
                // sites: [],
                marker: [],
                chooseSite: [],
                card: []
            },
            cardPanel: {
                notfound: {display:'block'}
            },
            cardDetail : {
                panel: [],
                data: {}
            },
            modal: [],
            markerNode: [],
            selectCard: [],
            reservationPanel:{
                multipleTextNode: {},
                reserveBtnNode: {},
            },
            reserveMode: 'single',
            modalName: ''
        }
        this.onSelectMarker = this.onSelectMarker.bind(this)
        this.onCloseCard = this.onCloseCard.bind(this)
        this.onViewMoreInfo = this.onViewMoreInfo.bind(this)
        this.onCloseMoreInfo = this.onCloseMoreInfo.bind(this)
        this.onSelectMenu = this.onSelectMenu.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.getUserTimeZone = this.getUserTimeZone.bind(this)
        this.setMarkerNode = this.setMarkerNode.bind(this)
        this.onSelectCard = this.onSelectCard.bind(this)
        this.onDeselectCard = this.onDeselectCard.bind(this)
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

    onSelectMenu(menu){
        switch(menu){
            case 'Search'       : this.setState({modal: <SearchContainer dashBoardContainer={this}/>});break
            case 'Existing reservations' : this.checkLogin(menu);break
            case 'Past reservations'     : this.checkLogin(menu);break
            case 'Settings'     : this.setState({modal: <SettingsContainer dashBoardContainer={this} app={this.props.app}/>});break
            case 'ReservationSites' : this.setState({modal: <ReservationContainer dashBoardContainer={this} app={this.props.app} sites={this.state.selectCard}/>});break
        }
    }

    checkLogin(menu){
        if(this.props.app.state.authen.isLogedIn){
            if(menu=='Existing reservations'||menu=='Past reservations'){
                this.setState({
                    modal: <HistoryContainer dashBoardContainer={this}/>,
                    modalName: menu
                })
            }
        }else{
            this.props.app.setState({
                isOpenReserveModal: true
            },this.props.app.authentication)
        }
    }
    
    onCloseModal(){
        this.setState({
            modal: []
        })
    }

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

    setMarkerNode(marker){
        this.setState({
            markerNode: marker
        })
    }
    
    onSelectMarker(id,markerNode){
        let {marker,chooseSite} = this.state.map
        if(chooseSite.indexOf(parseInt(id))==-1){
            marker.push(markerNode)
            chooseSite.push(parseInt(id))
            let card = []
            chooseSite.map((data,key)=>{
                card.unshift(<CardContainer dashBoardContainer={this} siteId={data} key={data}/>)
            })
            this.setState({
                map:{
                    marker: marker,
                    chooseSite: chooseSite,
                    card: card
                },
                cardPanel: {
                    notfound: {display:'none'}
                }
            })
        }else{
            let {card} = this.state.map
            let index = chooseSite.indexOf(parseInt(id))
            marker.splice(index,1)
            chooseSite.splice(index,1)
            card.splice(((card.length-1)-index),1)

            marker.push(markerNode)
            chooseSite.push(parseInt(id))
            let cardTemp = []
            chooseSite.map((data,key)=>{
                cardTemp.unshift(<CardContainer dashBoardContainer={this} siteId={data} key={data}/>)
            })
            this.setState({
                map:{
                    marker: marker,
                    chooseSite: chooseSite,
                    card: cardTemp
                }
            })
        }
    }

   onCloseCard(id){
        let {marker,chooseSite,card} = this.state.map
        let index = chooseSite.indexOf(parseInt(id))
         
        if(marker[index].icon=='img/marker.png'){
            marker[index].node.setIcon('img/marker.png')
        }else if(marker[index].icon=='img/marker_select.png'){
            marker[index].node.setIcon('img/marker.png')
        }else if(marker[index].icon=='img/marker_ent_select.png'){
            marker[index].node.setIcon('img/marker_ent.png')
        }else{
            marker[index].node.setIcon('img/marker_ent.png')
        }

        marker.splice(index,1)
        chooseSite.splice(index,1)
        card.splice(((card.length-1)-index),1)
        this.setState({
            map:{
                marker: marker,
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

    getUserTimeZone(){
        return this.props.app.state.authen.timezone
    }

    onSelectCard(props){
        let {selectCard} = this.state
        let found = false
        selectCard.map((data)=>{
            if(parseInt(data.id)==parseInt(props.id)){
                found=true
            }
        })
        if(found==false){
            selectCard.push(props)
            this.setState({
                selectCard : selectCard
            })
        }
        this.changeMultipleTextColor()
    }

    onDeselectCard(props){
         let {selectCard} = this.state
         let index = null
         selectCard.map((data,key)=>{
            if(parseInt(data.id)==parseInt(props.id)){
                index=key
            }
        })
        if(index!=null){
            selectCard.splice(index,1)
            this.setState({
                selectCard : selectCard
            })
        }
        this.changeMultipleTextColor()
    }

    changeMultipleTextColor(){
        let {selectCard} = this.state
        if(selectCard.length>=2){
            this.state.reservationPanel.multipleTextNode.style.opacity = '1'
        }else{
            this.state.reservationPanel.multipleTextNode.style.opacity = '0.5'
        }
        if(selectCard.length>=1){
            this.state.reservationPanel.reserveBtnNode.className = 'btn'
        }else{
            this.state.reservationPanel.reserveBtnNode.className = 'btn--disabled'
        }
        if(selectCard.length<=1){
            this.setState({
                reserveMode: 'single'
            })
        }
    }

    render() {
        return (
            <section>
                <Dashboard dashBoardContainer={this} app={this.props.app}/>
            </section>
        )
    }
}