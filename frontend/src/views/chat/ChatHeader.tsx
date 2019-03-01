import * as React from 'react';
import "./ChatHeader.scss"
import Toggle from 'react-toggle'
import "react-toggle/style.css"

interface State{
    switch:boolean;
}
interface Props {
    public_id:string,
    admin:boolean,
    open:boolean,
    switchCallback:Function;
}

export default class ChatHeader extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state={
            switch:false
        }
    }


    componentDidMount(): void {
        this.setState({
            switch:this.props.open
        })
    }

    private switchEvent(e:any){
        e.preventDefault();
        this.props.switchCallback(!this.props.open);
    }
    renderHeader(){
        if(this.props.admin){
            return(
                <section className={"chat__header"}>
                    <p className={"chat__header__name"}>{this.props.public_id}</p>
                    <Toggle className={"chat__header__switch"}
                            onChange={(e)=>{this.switchEvent(e)}}
                            defaultChecked={this.props.open}

                    />
                </section>
            )
        }else{
            return(
                <section className={"chat__header"}>
                    <p className={"chat__header__name"}>{this.props.public_id}</p>
                </section>
            )
        }
    }

    render(){
        console.error(this.props.open)
        return this.renderHeader()
    }
};
