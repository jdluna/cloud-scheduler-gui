import React,{Component} from 'react'
import Style from './modify.scss'
import {NETWORK_TYPE} from '../../config/attributes'

const NetworkList = (props) => {
    let check = ''
	return(
       <td> 
		{
			NETWORK_TYPE.map((data,key)=>{
				return(
					<span className={Style.block} key={key}>
						<span className={Style.choose}>
                        {
                            Object.keys(props.value).map((item, i) =>{
                                    let details = props.value[item]
                                    if(details.name == data.name){
                                        check = 'checked'
                                    }
                            })
                        }
							<input type='checkbox' name='network' value={data.name} defaultChecked={check} onChange={props.handle}/>
                            { check = '' }
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
        <select name='image_type' className={Style.inputmulti} defaultValue={props.value.map((item, i) => {return (item.name)})}onChange={props.handle} multiple="multiple">
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

export default class modify extends Component {
    render(){
        let images = this.props.modifyContainer.dashboardContainer.state.images
        let imageTypeList = <ImageTypeList i={images} value={this.props.modifyContainer.state.image_type} handle={this.props.modifyContainer.handleImageTypeChange}/>
        let networkList = <NetworkList value={this.props.modifyContainer.state.network} handle={this.props.modifyContainer.handleNetworkChange}/>
        return (
            <section className='modal'>
            <section>
                <section className={Style.panel}>
                    <header>
                        <div>Resource Modify</div>
                        <img src='img/ic_close.svg' onClick={()=>this.props.modifyContainer.onClose()} />
                    </header>
                  <section className={Style.content}>
                    <div className={Style.bottom}>
                        <div className={Style.right}>
                            <div className={Style.width}>
                               
                                <form className={Style.table} onSubmit={this.handleSubmit}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={Style.tag} >name</td>
                                                <td><input className={Style.input} type='text' name='_name' value={this.props.modifyContainer.state._name} onChange={this.props.modifyContainer.handleInputChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>description</td>
                                                <td><input className={Style.input} type='text' name='description' value={this.props.modifyContainer.state.description} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>contact</td>
                                                <td><input className={Style.input}  type='text' name='contact' value={this.props.modifyContainer.state.contact} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>location</td>
                                                <td><input className={Style.input}  type='text' name='location' value={this.props.modifyContainer.state.location} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>pragma_boot_path</td>
                                                <td><input className={Style.input} type='text' name='pragma_boot_path' value={this.props.modifyContainer.state.pragma_boot_path} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>pragma_boot_version</td>
                                                <td><input className={Style.input} type='number' name='pragma_boot_version' value={this.props.modifyContainer.state.pragma_boot_version} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>python_path</td>
                                                <td><input className={Style.input} type='text' name='python_path' value={this.props.modifyContainer.state.python_path} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>temp_dir</td>
                                                <td><input className={Style.input} type='text' name='temp_dir' value={this.props.modifyContainer.state.temp_dir} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>username</td>
                                                <td><input className={Style.input} type='text' name='username' value={this.props.modifyContainer.state.username} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>deployment_type</td>
                                                <td><input className={Style.input} type='text' name='deployment_type' value={this.props.modifyContainer.state.deployment_type} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>site_hostname</td>
                                                <td><input className={Style.input} type='text' name='site_hostname' value={this.props.modifyContainer.state.site_hostname} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>latitute</td>
                                                <td><input className={Style.input} type='text' name='latitude' value={this.props.modifyContainer.state.latitude} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>longtitute</td>
                                                <td><input className={Style.input} type='text' name='longitude' value={this.props.modifyContainer.state.longitude} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>total_cpu</td>
                                                <td><input className={Style.input} type='number' name='total_cpu' value={this.props.modifyContainer.state.total_cpu} onChange={this.props.modifyContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>total_memory</td>
                                                <td><input className={Style.input} type='number' name='total_memory' value={this.props.modifyContainer.state.total_memory} onChange={this.props.modifyContainer.handleInputChange}/></td>
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
                                                <td className={Style.submitBtn}><button name='sendValue' className='btn--info' onClick={this.props.modifyContainer.queryConfirmReservation}>submit</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
					</section>
                </section>
            </section>
            </section>
       )
    }
}
