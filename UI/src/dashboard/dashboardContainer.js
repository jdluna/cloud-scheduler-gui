import React, { Component } from 'react'
import Dashboard from './dashboard'
import CardContainer from './reservationBar/cardContainer'
import CardDescriptionContainer from './reservationBar/cardDescriptionContainer'
import SettingsContainer from './settings/settingsContainer'
import LoginContainer from './login/loginContainer'
import SearchContainer from './search/searchContainer'
import ReservationContainer from './reservation/reservationContainer'
import HistoryContainer from './history/historyContainer'
import HelpContainer from './help/helpContainer'
import SuccessDialog from './dialog/successDialog'
import ErrorDialog from './dialog/errorDialog'
import axios from 'axios'
import { GET_ALL_IMAGES_ENDPOINT, CHECK_CONNECTION_TYPE_ENDPOINT } from '../config/endpoints'

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            map: {
                // sites: [],
                marker: [],
                chooseSite: [],
                card: []
            },
            cardPanel: {
                notfound: { display: 'block' }
            },
            cardDetail: {
                panel: [],
                data: {}
            },
            modal: [],
            markerNode: [],
            selectCard: [],
            reservationPanel: {
                multipleTextNode: {},
                reserveBtnNode: {},
                reserveTooltipNode: {},
                reserveBarNode: {},
            },
            reserveMode: 'single',
            modalName: '',
            aboveSearchModal: {
                open: false,
                node: null
            },
            images: [],
            isSameConnectionType: false,
            dialogAfterLogin: null,
            dateForCard: null
        }
        this.onSelectMarker = this.onSelectMarker.bind(this)
        this.onCloseCard = this.onCloseCard.bind(this)
        this.clearRightBar = this.clearRightBar.bind(this)
        this.onViewMoreInfo = this.onViewMoreInfo.bind(this)
        this.onCloseMoreInfo = this.onCloseMoreInfo.bind(this)
        this.onSelectMenu = this.onSelectMenu.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.getUserTimeZone = this.getUserTimeZone.bind(this)
        this.setMarkerNode = this.setMarkerNode.bind(this)
        this.onSelectCard = this.onSelectCard.bind(this)
        this.onDeselectCard = this.onDeselectCard.bind(this)
        this.setAllImages = this.setAllImages.bind(this)
        this.closeAllCard = this.closeAllCard.bind(this)
        this.queryCheckConnectionType = this.queryCheckConnectionType.bind(this)
    }

    onSelectMenu(menu) {
        switch (menu) {
            case 'Search': this.onCloseMoreInfo(); this.setState({ modal: <SearchContainer dashBoardContainer={this} />, modalName: 'Search' }); break
            case 'Existing reservations': this.onCloseMoreInfo(); this.checkLogin(menu); break
            case 'Past reservations': this.onCloseMoreInfo(); this.checkLogin(menu); break
            case 'Settings': this.onCloseMoreInfo(); this.checkLogin(menu); break
            case 'Help': this.onCloseMoreInfo(); this.setState({ modal: <HelpContainer dashBoardContainer={this} />, modalName: 'Helps' }); break
            case 'ReservationSites': this.checkConnectionType(); break
        }
    }

    checkLogin(menu) {
        if (this.props.app.state.authen.isLogedIn) {
            if (menu == 'Existing reservations' || menu == 'Past reservations') {
                this.setState({
                    modal: <HistoryContainer dashBoardContainer={this} />,
                    modalName: (menu == 'Past reservations') ? 'history' : menu
                })
            } else if (menu == 'Settings') {
                this.setState({
                    modal: <SettingsContainer dashBoardContainer={this} app={this.props.app} />,
                    modalName: 'Settings'
                })
            }
        } else {
            this.setState({
                dialogAfterLogin: menu
            })
            this.props.app.setState({
                isOpenReserveModal: true
            }, this.props.app.authentication)
        }
    }

    onCloseModal() {
        this.setState({
            modal: [],
            modalName: ''
        })
    }

    onCloseMoreInfo() {
        this.setState({
            cardDetail: {
                panel: [],
                data: {}
            }
        })
    }

    checkConnectionType() {
        let { reserveMode } = this.state
        if (reserveMode == 'multiple') {
            this.queryCheckConnectionType()
        } else {
            this.openReservationPanel()
        }
    }

    openReservationPanel() {
        this.setState({
            cardDetail: {
                panel: [],
                data: {}
            },
            modalName: ''
        }, () => {
            this.setState({
                modal: <ReservationContainer dashBoardContainer={this} app={this.props.app} sites={this.state.selectCard} />
            })
        })
    }

    onViewMoreInfo(data) {
        let panel = []
        panel.push(<CardDescriptionContainer dashBoardContainer={this} key={0} />)
        this.setState({
            cardDetail: {
                panel: panel,
                data: data
            }
        })
    }

    setMarkerNode(marker) {
        this.setState({
            markerNode: marker
        })
    }

    onSelectMarker(id, markerNode, searchDate = null) {
        let { marker, chooseSite } = this.state.map
        if (chooseSite.indexOf(parseInt(id)) == -1) {
            marker.push(markerNode)
            chooseSite.push(parseInt(id))
            let card = []
            chooseSite.map((data, key) => {
                card.unshift(<CardContainer searchDate={searchDate} dashBoardContainer={this} siteId={data} key={data} />)
            })
            this.setState({
                map: {
                    marker: marker,
                    chooseSite: chooseSite,
                    card: card
                },
                cardPanel: {
                    notfound: { display: 'none' }
                }
            })
        } else {
            let { card } = this.state.map
            let index = chooseSite.indexOf(parseInt(id))
            marker.splice(index, 1)
            chooseSite.splice(index, 1)
            card.splice(((card.length - 1) - index), 1)

            marker.push(markerNode)
            chooseSite.push(parseInt(id))
            let cardTemp = []
            chooseSite.map((data, key) => {
                cardTemp.unshift(<CardContainer dashBoardContainer={this} siteId={data} key={data} />)
            })
            this.setState({
                map: {
                    marker: marker,
                    chooseSite: chooseSite,
                    card: cardTemp
                }
            })
        }
    }

    closeAllCard() {
        let { chooseSite } = this.state.map
        chooseSite.map((data, key) => {
            let { marker, chooseSite, card } = this.state.map
            let index = chooseSite.indexOf(parseInt(data))

            if (marker[index].icon == 'img/marker.png') {
                marker[index].node.setIcon('img/marker.png')
            } else if (marker[index].icon == 'img/marker_select.png') {
                marker[index].node.setIcon('img/marker.png')
            } else if (marker[index].icon == 'img/marker_ent_select.png') {
                marker[index].node.setIcon('img/marker_ent.png')
            } else {
                marker[index].node.setIcon('img/marker_ent.png')
            }
        })
        this.setState({
            map: {
                marker: [],
                chooseSite: [],
                card: []
            },
            cardPanel: {
                notfound: { display: 'block' }
            },
            selectCard: []
        })
        this.changeMultipleTextColor()
    }

    clearRightBar(){
        let { marker, chooseSite, card } = this.state.map
        if(chooseSite.length != 0){
            for(let i=chooseSite.length-1;i>=0;i--){
                this.onCloseCard(chooseSite[i])
            }
        }
    }

    onCloseCard(id) {
        let { marker, chooseSite, card } = this.state.map
        let index = chooseSite.indexOf(parseInt(id))

        this.onDeselectCard({id:parseInt(id)})

        if (marker[index].icon == 'img/marker.png') {
            marker[index].node.setIcon('img/marker.png')
        } else if (marker[index].icon == 'img/marker_select.png') {
            marker[index].node.setIcon('img/marker.png')
        } else if (marker[index].icon == 'img/marker_ent_select.png') {
            marker[index].node.setIcon('img/marker_ent.png')
        } else {
            marker[index].node.setIcon('img/marker_ent.png')
        }

        marker.splice(index, 1)
        chooseSite.splice(index, 1)
        card.splice(((card.length - 1) - index), 1)
        this.setState({
            map: {
                marker: marker,
                chooseSite: chooseSite,
                card: card
            }
        })
        if (chooseSite.length == 0) {
            this.setState({
                cardPanel: {
                    notfound: { display: 'block' }
                }
            })
        }
    }

    getUserTimeZone() {
        return this.props.app.state.authen.timezone
    }

    onSelectCard(props) {
        let { selectCard } = this.state
        let found = false
        selectCard.map((data) => {
            if (parseInt(data.id) == parseInt(props.id)) {
                found = true
            }
        })
        if (found == false) {
            selectCard.push(props)
            this.setState({
                selectCard: selectCard
            })
        }
        this.changeMultipleTextColor()
    }

    onDeselectCard(props) {
        let { selectCard } = this.state
        let index = null
        selectCard.map((data, key) => {
            if (parseInt(data.id) == parseInt(props.id)) {
                index = key
            }
        })
        if (index != null) {
            selectCard.splice(index, 1)
            this.setState({
                selectCard: selectCard
            })
        }
        this.changeMultipleTextColor()
    }

    changeMultipleTextColor() {
        let { selectCard } = this.state
        if (selectCard.length >= 2) {
            this.state.reservationPanel.multipleTextNode.style.opacity = '1'
        } else {
            this.state.reservationPanel.multipleTextNode.style.opacity = '0.5'
        }
        if (selectCard.length >= 1) {
            this.state.reservationPanel.reserveTooltipNode.className = 'tooltiptext--hide'
            this.state.reservationPanel.reserveBtnNode.className = 'btn'
        } else {
            this.state.reservationPanel.reserveTooltipNode.className = 'tooltiptext--left'
            this.state.reservationPanel.reserveBtnNode.className = 'btn--disabled'
        }
        if (selectCard.length <= 1) {
            this.setState({
                reserveMode: 'single'
            })
        }
    }

    setAllImages() {
        axios.get(GET_ALL_IMAGES_ENDPOINT).then(response => {
            let { data, status } = response
            if (status == 200) {
                this.setState({
                    images: data.image_type
                })
            }
        }).catch(error => {
            console.log('QUERY GET IMAGES ERROR: ' + error)
        })
    }

    queryCheckConnectionType() {
        let { selectCard } = this.state
        let type = ''
        selectCard.map((data, key) => {
            let subType = ''
            data.connection.map((subData, subKey) => {
                if (subKey == 0) {
                    subType += subData.name
                } else {
                    subType += ',' + subData.name
                }
            })
            if (key == 0) {
                type += (subType == '') ? '-' : subType
            } else {
                type += '|' + ((subType == '') ? '-' : subType)
            }
        })

        let params = {
            params: {
                connection_type: type
            }
        }
        axios.get(CHECK_CONNECTION_TYPE_ENDPOINT, params).then(response => {
            let { data, status } = response
            if (status == 200 && data.result) {
                if (data.result == 'False') {
                    this.setState({
                        isSameConnectionType: true
                    }, () => {
                        this.openReservationPanel()
                    })
                } else {
                    this.openReservationPanel()
                }
            }
        }).catch(error => {
            console.log('QUERRY CHECK CONNECTION TYPE ERROR: ', +error)
        })
    }

    showSessionTimeoutDialog(data) {
        // console.log(data.message)
        if(typeof(Storage)!=='undefined'){
            let appState = JSON.parse(sessionStorage.getItem('session'))
            if(appState!=null){
                if(data.message==appState.authen.session){
                    let dialog = null
                    dialog = <section className='modal'><ErrorDialog title='Session timeout' msg='Please login again.' onCloseDialog={this.onCloseModal} /></section>
                    this.setState({
                        modal: dialog,
                        modalName: 'sessionTimeout'
                    })
                    this.props.app.onLogout()
                }
            }
        }
    }

    setPusher() {
        // Pusher.logToConsole = true
        let pusher = new Pusher('43cff02ec435f9ddffa1', {
            encrypted: true
        })
        let channel = pusher.subscribe('notification');
        channel.bind('login', (data)=>this.showSessionTimeoutDialog(data))
    }

    componentWillMount() {
        this.setPusher()
    }

    componentWillUpdate() {
        let { dialogAfterLogin } = this.state
        if (this.props.app.state.authen.isLogedIn && dialogAfterLogin != null) {
            this.onSelectMenu(dialogAfterLogin)
            this.setState({
                dialogAfterLogin: null
            })
        }
    }

    render() {
        return (
            <section>
                <Dashboard dashBoardContainer={this} app={this.props.app} />
            </section>
        )
    }
}