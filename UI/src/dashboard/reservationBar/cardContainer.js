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
        const dateForCard = this.props.dashBoardContainer.state.dateForCard
        this.appContainer = this.props.dashBoardContainer.props.app
        this.currentDateStamp = (dateForCard!=null) ? moment.tz(dateForCard,this.appContainer.state.authen.timezone) : moment.tz(this.appContainer.state.authen.timezone)
        this.nowDate = moment.tz(this.appContainer.state.authen.timezone)

        if(dateForCard!=null){
            this.querySiteByDate()
        }else{
            this.querySite()
        }
        
        this.state = {
            nodeCPU: {},
            nodeMem: {},
            date: this.currentDateStamp.format('DD-MMM-YYYY').toUpperCase(),
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
                if(site.connection_type.length>1){
                    this.setState({
                        style:{
                            ent: {backgroundColor:'#76FF03'},
                            ipop: {backgroundColor:'#76FF03'}
                        }
                    })
                }else{
                    site.connection_type.map((data,key)=>{
                        switch(data.name.toUpperCase()){
                            case 'ENT' : this.setState({style:{ent:{backgroundColor:'#76FF03'}}}) ;break
                            case 'IPOP' : this.setState({style:{ipop:{backgroundColor:'#76FF03'}}}) ;break
                        }
                    })
                }
                
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
        let dateTime = this.currentDateStamp.utc().format('YYYY-MM-DD h:00:00')
        axios.get(CARD_ENDPOINT+'?site_id='+this.props.siteId+'&date_req='+dateTime).then(response =>{
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

    onCheckBoxChange(event){
        event.stopPropagation()
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
            let {id,name,connection_type} = this.state.site.allData
            this.props.dashBoardContainer.onSelectCard({id:id,name:name,connection:connection_type})
        }else{
            this.setState({
                style:{
                    ent: entStyle,
                    ipop: ipoptyle,
                    card: {}
                },
                select: false
            })
            let {id,name,connection_type} = this.state.site.allData
            this.props.dashBoardContainer.onDeselectCard({id:id,name:name,connection:connection_type})
        } 
    }

    onCloseCard(event){
        event.stopPropagation()
        this.props.dashBoardContainer.onCloseCard(this.props.siteId)
        let {id,name,connection_type} = this.state.site.allData
        this.props.dashBoardContainer.onDeselectCard({id:id,name:name,connection:connection_type})
    }

    onNextDate(){
        this.setState({
            date: this.currentDateStamp.add(1,'days').format('DD-MMM-YYYY').toUpperCase()
        })
        this.querySiteByDate()
    }

    onPreviousDate(){
        let now = this.nowDate.format('DD-MMM-YYYY').toUpperCase()
        let previous = this.currentDateStamp.format('DD-MMM-YYYY').toUpperCase()
        if(now!=previous){
            this.setState({
                date: this.currentDateStamp.subtract(1,'days').format('DD-MMM-YYYY').toUpperCase()
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