import React,{Component} from 'react'
import Style from './resource.scss'
import Style2 from './settings.scss'
import {NETWORK_TYPE} from '../../config/attributes'

const NetworkList = (props) => {
	return(
       <td> 
		{
			NETWORK_TYPE.map((data,key)=>{
				return(
					<span className={Style.block} key={key}>
						<span className={Style.choose}>
							<input type='checkbox' name='network' value={data.name} onChange={props.handle}/>
                            <span className={Style.tag}>{data.name}</span>
                        </span>
                    </span>
                )
            })
        }
        </td>
    )
}

const ImageTypeList = (props) => {
    let images = props.i
    return(
        <select name='image_type' className={Style.inputmulti} onChange={props.handle} multiple="multiple">
        {
            images.map((data, key)=> {
                let d = data.name
                    return (
                        <option  key={key} value={d}>{d}</option>
                    )
            })
        }
        </select>
    )
}

             

export default class Resource extends Component {
    render() {
        let images = this.props.resourcesContainer.dashboardContainer.state.images
        let imageTypeList = <ImageTypeList i={images} value={this.props.resourcesContainer.state.image_type} handle={this.props.resourcesContainer.handleImageTypeChange}/>
        let networkList = <NetworkList value={this.props.resourcesContainer.state.network} handle={this.props.resourcesContainer.handleNetworkChange}/>
        return (
            <section className={Style.wrap}>
                <section className={Style.content}>
                    <div className={Style.bottom}>
                        <div className={Style.right}>
                            <div className={Style.width}>
                                <div className={Style.time}>Resource form</div>
                                <form className={Style.table} onSubmit={this.handleSubmit}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={Style.tag} >name</td>
                                                <td><input className={Style.input} type='text' name='_name' value={this.props.resourcesContainer.state._name} onChange={this.props.resourcesContainer.handleInputChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>description</td>
                                                <td><input className={Style.input} type='text' name='description' value={this.props.resourcesContainer.state.description} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>contact</td>
                                                <td><input className={Style.input}  type='text' name='contact' value={this.props.resourcesContainer.state.contact} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>location</td>
                                                <td><input className={Style.input}  type='text' name='location' value={this.props.resourcesContainer.state.location} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>pragma_boot_path</td>
                                                <td><input className={Style.input} type='text' name='pragma_boot_path' value={this.props.resourcesContainer.state.pragma_boot_path} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>pragma_boot_version</td>
                                                <td><input className={Style.input} type='number' name='pragma_boot_version' value={this.props.resourcesContainer.state.pragma_boot_version} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>python_path</td>
                                                <td><input className={Style.input} type='text' name='python_path' value={this.props.resourcesContainer.state.python_path} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>temp_dir</td>
                                                <td><input className={Style.input} type='text' name='temp_dir' value={this.props.resourcesContainer.state.temp_dir} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>username</td>
                                                <td><input className={Style.input} type='text' name='username' value={this.props.resourcesContainer.state.username} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>deployment_type</td>
                                                <td><input className={Style.input} type='text' name='deployment_type' value={this.props.resourcesContainer.state.deployment_type} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>site_hostname</td>
                                                <td><input className={Style.input} type='text' name='site_hostname' value={this.props.resourcesContainer.state.site_hostname} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>latitute</td>
                                                <td><input className={Style.input} type='text' name='latitude' value={this.props.resourcesContainer.state.latitude} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>longtitute</td>
                                                <td><input className={Style.input} type='text' name='longitude' value={this.props.resourcesContainer.state.longitude} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>total_cpu</td>
                                                <td><input className={Style.input} type='number' name='total_cpu' value={this.props.resourcesContainer.state.total_cpu} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>total_memory</td>
                                                <td><input className={Style.input} type='number' name='total_memory' value={this.props.resourcesContainer.state.total_memory} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>image_type</td>
                                                {imageTypeList} 
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>network</td>
                                                {networkList}
                                               
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className={Style.submitBtn}><button name='sendValue' className='btn--info' onClick={this.props.resourcesContainer.queryConfirmReservation}>submit</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}
