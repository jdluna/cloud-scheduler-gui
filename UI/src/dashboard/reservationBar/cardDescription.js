import React,{Component} from 'react'
import style from './cardDescription.scss'

export default class cardDescription extends Component {
    componentDidMount(){
        this.props.dashBoardContainer.setState({
            cardDescriptionPanel:{
                modifyBtnNode: this.refs.modifyBtn
            }
        })
    }

    render(){
              return(
            <section>
                <section className={(this.props.dashBoardContainer.state.modalName=='Search') ? style.halfmodalBg : null}></section>
                <section className={style.wraper}>
                    <article className={style.article}>
                        <span className={style.title}>{this.props.dashBoardContainer.state.cardDetail.data.name}</span>
                        <img className={style.close} width='18' src='img/ic_close.svg' onClick={this.props.dashBoardContainer.onCloseMoreInfo}/>
                        <span className={style.modifybtn}>
                            <button ref='modifyBtn' className="btn" name='modify'hidden={this.props.cardDescriptionContainer.state.adminStatus} onClick={this.props.dashBoardContainer.modifyResourceInfo}>modify</button>
                        </span>
                    </article>
                    <section className={style.content}>
                        <section className={style.column}>
                            <div className={style.detail}>
                                <span className={style.title}>Notes</span>
                                <span className={style.desc}>-</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Contact</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.contact}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Location</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.location}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Resource Type</span>
                                <span className={style.desc}>-</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Latitude</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.latitude}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Longitude</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.longitude}</span>
                            </div>
                        </section>
                        <section className={style.column}>
                            <div className={style.detail}>
                                <span className={style.title}>Pragma_boot path</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.pragma_boot_path}</span>
                            </div>
                                <div className={style.detail}>
                                <span className={style.title}>Pragma_boot version</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.pragma_boot_version}</span>
                            </div>
                                <div className={style.detail}>
                                <span className={style.title}>Python path</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.python_path}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Temporary directory</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.temp_dir}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Username</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.username}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Deployment type</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.deployment_type}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.title}>Site hostname</span>
                                <span className={style.desc}>{this.props.dashBoardContainer.state.cardDetail.data.site_hostname}</span>
                            </div>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}
