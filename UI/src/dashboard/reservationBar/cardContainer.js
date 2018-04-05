import React, { Component } from 'react'
import Card from './card'
import DateTime from '../../lib/dateTime'
import axios from 'axios'
import { CARD_ENDPOINT } from '../../config/endpoints'
import moment from 'moment'
import ChartData from './chart'
import { RESOURCES, NETWORK_TYPE } from '../../config/attributes'

const date = new DateTime()
export default class cardContainer extends Component {
    constructor(props) {
        super(props)
        const dateForCard = this.props.dashBoardContainer.state.dateForCard
        this.appContainer = this.props.dashBoardContainer.props.app
        this.currentDateStamp = (dateForCard != null) ? moment.tz(dateForCard, this.appContainer.state.authen.timezone) : moment.tz(this.appContainer.state.authen.timezone)
        this.nowDate = moment.tz(this.appContainer.state.authen.timezone)

        if (dateForCard != null) {
            this.querySiteByDate()
        } else {
            this.querySite()
        }

        this.state = {
            chart: this.setChartData(),
            chartIndex: 0,
            networkType: this.setNetworkTypeData(), 
            networkIndex: 0,
            nodeCPU: {},
            nodeMem: {},
            date: this.currentDateStamp.format('DD-MMM-YYYY').toUpperCase(),
            site: {
                allData: {},
                name: 'N/A',
                // cpuTotal: 0,
                // cpuAvailable: 0,
                // memTotal: 0,
                // memAvailable: 0,
                desc: '',
                running: 0
            },
            style: {
                ent: { backgroundColor: '#929294' },
                ipop: { backgroundColor: '#929294' },
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
        this.onNextChart = this.onNextChart.bind(this)
        this.onPreviousChart = this.onPreviousChart.bind(this)
        this.onNetworkTypeInputChange = this.onNetworkTypeInputChange.bind(this)
        this.selectCheckBox = this.selectCheckBox.bind(this)
    }

    onNetworkTypeInputChange(event){
        let {networkType} = this.state
        let siteData = this.state.site.allData

        let temp = []
        siteData.connection_type.map((data)=>{
            temp.push(data.name)
        })

        let connection = []
        try{
            if(temp.indexOf(networkType[event.target.value][0].name)!=-1){
                connection[0] = '#76FF03'
            }else{
                connection[0] = '#929294'
            }
        }catch(error){
            connection[0] = this.state.style.ent
        }
        
        try{
            if(temp.indexOf(networkType[event.target.value][1].name)!=-1){
                connection[1] = '#76FF03'
            }else{
                connection[1] = '#929294'
            }
        }catch(error){
            connection[1] = this.state.style.ipop
        }
        
        this.setState({
            networkIndex: parseInt(event.target.value),
            style: {
                ent: { backgroundColor: connection[0] },
                ipop: { backgroundColor: connection[1] },
                card: this.state.style.card,
                cardTitle: this.state.style.cardTitle
            }
        })
    }

    setNetworkTypeData(){
        let type = []
        let temp = []
        NETWORK_TYPE.map((data,key)=>{
            if(temp.length<2){
                temp.push(data)
            }
            if(temp.length>=2 || NETWORK_TYPE.length == (key+1)){
                type.push(temp)
                temp = []
            }
        })
        return type
    }

    drawChart(){
        let cpuUsedData = 0
        let memUsedData = 0
        let { chart, chartIndex } = this.state
        try {
            cpuUsedData = chart[chartIndex][0].total - chart[chartIndex][0].available
            memUsedData = chart[chartIndex][1].total - chart[chartIndex][1].available
            this.drawDoughnutChart(this.state.nodeCPU, chart[chartIndex][0].available, cpuUsedData, '#EFA430')
            this.drawDoughnutChart(this.state.nodeMem, chart[chartIndex][1].available, memUsedData, '#9CCBE5')
        } catch (error) {
            cpuUsedData = chart[chartIndex][0].total - chart[chartIndex][0].available
            this.drawDoughnutChart(this.state.nodeCPU, chart[chartIndex][0].available, cpuUsedData , '#EFA430')
        }
    }

    onNextChart() {
        let { chart, chartIndex } = this.state
        if ((chartIndex + 1) < chart.length) {
            this.setState({
                chartIndex: (chartIndex + 1)
            },()=>{
                this.drawChart()
            })
        }
    }

    onPreviousChart() {
        let { chartIndex } = this.state
        if ((chartIndex) > 0) {
            this.setState({
                chartIndex: (chartIndex - 1)
            },()=>{
                this.drawChart()
            })
        }
        this.drawChart()
    }

    setChartData(response = null) {
        let chart = []
        let temp = []
        RESOURCES.map((data, key) => {
            if (temp.length < 2) {
                let available
                let total
                try {
                    available = (response != null) ? response[data.parameter]['available'] : 0
                    total = (response != null) ? response[data.parameter]['total'] : 0
                } catch (error) {
                    available = 0
                    total = 0
                }
                let c = new ChartData(data.name, data.unit, data.parameter, total, available)
                temp.push(c)
            }
            if (temp.length >= 2 || RESOURCES.length == (key + 1)) {
                chart.push(temp)
                temp = []
            }
        })
        return chart
    }

    drawDoughnutChart(node, available, used, color = '#EFA430') {
        let myChart = new Chart(node, {
            type: 'doughnut',
            data: {
                labels: ['Available', 'Used'],
                datasets: [{
                    data: [available, used],
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
                responsive: true,
                legend: {
                    display: false
                }
            }
        })
    }

    querySite() {
        axios.get(CARD_ENDPOINT + '?site_id=' + this.props.siteId).then(response => {
            if (response.status == 200) {
                let { running, site } = response.data
                if (site.connection_type.length > 2) {
                    this.setState({
                        style: {
                            ent: { backgroundColor: '#76FF03' },
                            ipop: { backgroundColor: '#76FF03' }
                        }
                    })
                } else {
                    let type = ['','']
                    try{
                        type[0] = NETWORK_TYPE[0].name
                        type[1] = NETWORK_TYPE[1].name
                    }catch(error){
                    }
                    site.connection_type.map((data, key) => {
                        switch (data.name.toUpperCase()) {
                            case type[0]: this.setState({ style: { ent: { backgroundColor: '#76FF03' } } }); break
                            case type[1]: this.setState({ style: { ipop: { backgroundColor: '#76FF03' } } }); break
                        }
                    })
                }

                this.setState({
                    chart: this.setChartData(response.data.site),
                    site: {
                        allData: site,
                        name: site.name,
                        // cpuTotal: site.CPU.total,
                        // cpuAvailable: site.CPU.available,
                        // memTotal: site.memory.total,
                        // memAvailable: site.memory.available,
                        desc: site.description,
                        running: running
                    }
                })
                this.drawChart()

                // let cpuUsedeData = (this.state.site.cpuTotal-this.state.site.cpuAvailable)
                // let memUsedData = (this.state.site.memTotal-this.state.site.memAvailable)
                // this.drawDoughnutChart(this.state.nodeCPU,this.state.site.cpuAvailable,cpuUsedeData,'#EFA430')
                // this.drawDoughnutChart(this.state.nodeMem,this.state.site.memAvailable,memUsedData,'#9CCBE5')
            } else {
                console.warn('query card failed!')
            }
        })
    }

    querySiteByDate() {
        let dateTime = this.currentDateStamp.utc().format('YYYY-MM-DD HH:00:00')
        axios.get(CARD_ENDPOINT + '?site_id=' + this.props.siteId + '&date_req=' + dateTime).then(response => {
            if (response.status == 200) {
                let { running, site } = response.data
                this.setState({
                    chart: this.setChartData(response.data.site),
                    site: {
                        allData: site,
                        name: site.name,
                        // cpuTotal: site.CPU.total,
                        // cpuAvailable: site.CPU.available,
                        // memTotal: site.memory.total,
                        // memAvailable: site.memory.available,
                        desc: site.description,
                        running: running
                    }
                })
                this.drawChart()

                // let cpuUsedeData = (this.state.site.cpuTotal-this.state.site.cpuAvailable)
                // let memUsedData = (this.state.site.memTotal-this.state.site.memAvailable)
                // this.drawDoughnutChart(this.state.nodeCPU,this.state.site.cpuAvailable,cpuUsedeData,'#EFA430')
                // this.drawDoughnutChart(this.state.nodeMem,this.state.site.memAvailable,memUsedData,'#9CCBE5')             
            } else {
                console.warn('query site on next date failed!')
            }
        })
    }

    setChartNode(CPU, mem) {
        this.setState({
            nodeCPU: CPU,
            nodeMem: mem
        })
    }

    onCheckBoxChange(event) {
        console.log(event)
        event.stopPropagation()
        this.selectCheckBox()
    }

    selectCheckBox(){
        let entStyle = this.state.style.ent
        let ipoptyle = this.state.style.ipop
        if (this.state.select == false) {
            this.setState({
                style: {
                    ent: entStyle,
                    ipop: ipoptyle,
                    card: {
                        border: '1px solid #191E2C'
                    },
                    cardTitle: { backgroundColor: '#191E2C' }
                },
                select: true
            })
            let { id, name, connection_type } = this.state.site.allData
            this.props.dashBoardContainer.onSelectCard({ id: id, name: name, connection: connection_type })
        } else {
            this.setState({
                style: {
                    ent: entStyle,
                    ipop: ipoptyle,
                    card: {}
                },
                select: false
            })
            let { id, name, connection_type } = this.state.site.allData
            this.props.dashBoardContainer.onDeselectCard({ id: id, name: name, connection: connection_type })
        }
    }

    onCloseCard(event) {
        event.stopPropagation()
        this.props.dashBoardContainer.onCloseCard(this.props.siteId)
        // let { id, name, connection_type } = this.state.site.allData
        // this.props.dashBoardContainer.onDeselectCard({ id: id, name: name, connection: connection_type })
    }

    onNextDate() {
        this.setState({
            date: this.currentDateStamp.add(1, 'days').format('DD-MMM-YYYY').toUpperCase()
        })
        this.querySiteByDate()
    }

    onPreviousDate() {
        let now = this.nowDate.format('DD-MMM-YYYY').toUpperCase()
        let previous = this.currentDateStamp.format('DD-MMM-YYYY').toUpperCase()
        if (now != previous) {
            this.setState({
                date: this.currentDateStamp.subtract(1, 'days').format('DD-MMM-YYYY').toUpperCase()
            })
            this.querySiteByDate()
        }
    }

    onMoreInfoClick() {
        this.props.dashBoardContainer.onViewMoreInfo(this.state.site.allData)
    }

    render() {
        return (
            <section>
                <Card cardContainer={this} />
            </section>
        )
    }
}