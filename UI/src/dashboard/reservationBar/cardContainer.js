import React,{Component} from 'react'
import Card from './card'
import DateTime from '../../lib/dateTime'
import axios from 'axios'
import {CARD_ENDPOINT} from '../../config/endpoints'
import moment from 'moment'

const date = new DateTime()
export default class cardContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        // this.currentDateStamp = moment.tz(this.appContainer.state.authen.timezone)

        this.currentDateStamp = new Date()

        console.log(this.currentDateStamp)
        console.log(date.getDate())
        this.querySite()
        this.state = {
            nodeCPU: {},
            nodeMem: {},
            date: date.getDate(),
            // date: this.currentDateStamp.format('DD-MMM-YYYY').toUpperCase(),
            site: {
                allData: {},
                name: 'N/A',
                cpuTotal: 0,
                cpuAvailable: 0,
                memTotal: 0,
                memAvailable: 0,
                desc: '',
                running: 0
            },
            style:{
                ent: {backgroundColor:'#929294'},
                ipop: {backgroundColor:'#929294'},
                card: {},
                cardTitle: {}
            },
            select: false
        }
        this.onNextDate = this.onNextDate.bind(this)
        this.onPreviousDate = this.onPreviousDate.bind(this)
        this.querySite = this.querySite.bind(this)
        this.setChartNode = this.setChartNode.bind(this)
        this.onCloseCard = this.onCloseCard.bind(this)
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
        this.onMoreInfoClick = this.onMoreInfoClick.bind(this)
    }

    drawDoughnutChart(node,available,used,color='#EFA430'){
        let myChart = new Chart(node,{
            type: 'doughnut',
            data: {
                labels: ['Available','Used'],
                datasets: [{
                    data: [available,used],
                    backgroundColor: [
                        color,
                        '#464A5F'
                    ],
                    borderColor: [
                        color,
                        '#464A5F'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutoutPercentage: 80,
                responsive: false,
                legend: {
                    display: false
                }
            }
        })
    }

    querySite(){
        axios.get(CARD_ENDPOINT+'?site_id='+this.props.siteId).then(response =>{
            if(response.status==200){
                let {running,site} = response.data
                site.connection_type.map((data,key)=>{
                    switch(data.name.toUpperCase()){
                        case 'ENT' : this.setState({style:{ent:{backgroundColor:'#76FF03'}}}) ;break
                        case 'IPOP' : this.setState({style:{ipop:{backgroundColor:'#76FF03'}}}) ;break
                    }
                })
                this.setState({
                    site: {
                        allData: site,
                        name: site.name,
                        cpuTotal: site.CPU.total,
                        cpuAvailable: site.CPU.available,
                        memTotal: site.memory.total,
                        memAvailable: site.memory.available,
                        desc: site.description,
                        running: running
                    }
                })
                let cpuUsedeData = (this.state.site.cpuTotal-this.state.site.cpuAvailable)
                let memUsedData = (this.state.site.memTotal-this.state.site.memAvailable)
                this.drawDoughnutChart(this.state.nodeCPU,this.state.site.cpuAvailable,cpuUsedeData,'#EFA430')
                this.drawDoughnutChart(this.state.nodeMem,this.state.site.memAvailable,memUsedData,'#9CCBE5')
                
            }else{
                console.warn('query card failed!')
            }
        })
    }

    querySiteByDate(){
        let dateTime = date.getDateTimeForRequest(this.currentDateStamp)
        // let dateTime = this.currentDateStamp.format('YYYY-MM-DDh:00:00')
        console.log('request: '+dateTime)
        axios.get(CARD_ENDPOINT+'?site_id='+this.props.siteId+'&date_req='+dateTime).then(response =>{
            console.log(response)
            if(response.status==200){
                let {running,site} = response.data
                this.setState({
                    site: {
                        allData: site,
                        name: site.name,
                        cpuTotal: site.CPU.total,
                        cpuAvailable: site.CPU.available,
                        memTotal: site.memory.total,
                        memAvailable: site.memory.available,
                        desc: site.description,
                        running: running
                    }
                })
                let cpuUsedeData = (this.state.site.cpuTotal-this.state.site.cpuAvailable)
                let memUsedData = (this.state.site.memTotal-this.state.site.memAvailable)
                this.drawDoughnutChart(this.state.nodeCPU,this.state.site.cpuAvailable,cpuUsedeData,'#EFA430')
                this.drawDoughnutChart(this.state.nodeMem,this.state.site.memAvailable,memUsedData,'#9CCBE5')             
            }else{
                console.warn('query site on next date failed!')
            }
        })
    }

    setChartNode(CPU,mem){
        this.setState({
            nodeCPU: CPU,
            nodeMem: mem
        })
    }

    onCheckBoxChange(){
        let entStyle = this.state.style.ent
        let ipoptyle = this.state.style.ipop
        if(this.state.select==false){
            this.setState({
                style:{
                    ent: entStyle,
                    ipop: ipoptyle,
                    card: {
                        border:'1px solid #191E2C'
                    },
                    cardTitle: {backgroundColor: '#191E2C'}
                },
                select: true
            })
        }else{
            this.setState({
                style:{
                    ent: entStyle,
                    ipop: ipoptyle,
                    card: {}
                },
                select: false
            })
        } 
    }

    onCloseCard(){
        this.props.dashBoardContainer.onCloseCard(this.props.siteId)
    }

    onNextDate(){
        this.currentDateStamp = date.getNextDateTimeStamp(this.currentDateStamp)
        this.setState({
            date: date.getDate(this.currentDateStamp)
            // date: this.currentDateStamp.add(1,'days').format('DD-MMM-YYYY').toUpperCase()
        })
        this.querySiteByDate()
    }

    onPreviousDate(){
        let tempPreviousTimeStamp = date.getPreviousDateTimeStamp(this.currentDateStamp)
        let temp = date.getDate(tempPreviousTimeStamp)
        if(date.convertDateToTimeStamp(tempPreviousTimeStamp)>=date.getNowTimeStamp()||temp==date.getDate()){
            this.currentDateStamp = tempPreviousTimeStamp
            this.setState({
                date: date.getDate(this.currentDateStamp)
            })
            this.querySiteByDate()
        }
    }

    onMoreInfoClick(){
        this.props.dashBoardContainer.onViewMoreInfo(this.state.site.allData)
    }

    render() {
        return (
            <section>
                <Card cardContainer={this}/>
            </section>
        )
    }
}