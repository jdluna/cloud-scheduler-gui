import React,{Component} from 'react'
import Style from './resource.scss'
import Style2 from './settings.scss'

export default class Resource extends Component {
	render() {
		return (
		<section className={Style2.panel}>
			<header>
				<div>Resource</div>
				<img src='img/ic_close.svg' onClick={()=>this.props.settingContainer.onClose()} />
			</header>
			<div className={Style2.content}>
			<section className={Style.wrap}>
				<section className={Style.content}>
					<div className={Style.top}><img src='img/marker.png' width='80%'/></div>
					<div className={Style.bottom}>				
					     <div className={Style.left}>

						<div className={Style.time}>{this.props.resourcesContainer.state.description}</div>
					     </div>
					     <div className={Style.right}>
						<div className={Style.width}>
						     <h2>Content</h2>
						</div>	
					     </div>
					</div>
				</section>
			</section>
			</div>
		</section>
/*
		<section>
                <section className={Style2.panel}>
                    <header>
                        <div>Resource</div>
                        <img src='img/ic_close.svg' onClick={()=>this.props.settingContainer.onClose()} />
                    </header>
		    <div className={Style2.content}>
                    <section className={Style.wrap}>
                        <section className={Style.content}>
                            <div className={Style.top}>
                                <img src='img/resource.png' width='80%'/>
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.left}>
                                    <div className={Style.time}>{this.props.resourcesContainer.state.description}</div>
                                    <div className={Style.date}>{this.props.resourcesContainer.state.description}</div>
                                </div>
                                <div className={Style.right}>
                                    <div className={Style.width}>
                                        <h2>Content</h2>
                                        <form onSubmit={this.handleSubmit}>
                                            <lable>site_id:<input type='text' name='site_id' value={this.state.site_id} onChange={this.handleInputChange}/></lable>
                                            <br/>
                                            <label>name:<input type='text' name='_name'value={this.state._name} onChange={this.handleInputChange} /></label>
                                            <br/>
                                            <label>description:<input type='text' name='description' value={this.state.description} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>contact:<input type='text' name='contact' value={this.state.contact} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>location:<input type='text' name='location' value={this.state.location} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>pragma_boot_path<input type='text' name='pragma_boot_path' value={this.state.pragma_boot_path} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>pragma_boot_version<input type='number' name='pragma_boot_version' value={this.state.pragma_boot_version} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>python_path<input type='text' name='python_path' value={this.state.python_path} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>temp_dir<input type='text' name='temp_dir' value={this.state.temp_dir} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>username<input type='text' name='username' value={this.state.username} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>deployment_type<input type='text' name='deployment_type' value={this.state.deployment_type} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>site_hostname<input type='text' name='site_hostname' value={this.state.site_hostname} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>latitute<input type='text' name='latitude' value={this.state.latitude} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>longtitute<input type='text' name='longitude' value={this.state.longitude} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>total_cpu<input type='number' name='total_cpu' value={this.state.total_cpu} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <label>total_memory<input type='number' name='total_memory' value={this.state.total_memory} onChange={this.handleInputChange}/></label>
                                            <br/>
                                            <input type='submit' value='Submit'/> 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
		    </div>
                </section>

            </section>
*/
		)
	}

}
