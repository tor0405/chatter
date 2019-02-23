import * as React from 'react';
import './Login.scss'

interface State {
    password: string;
    username: string;
}

interface Props {
}

export class Login extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    public submit(e:React.FormEvent<HTMLButtonElement>): void{
        e.preventDefault();
    }

    public render() {
        return (
            <div className="login__container">
                <h1 className="login__header">Logg deg inn</h1>
                <form className="login__form">
                    <section className="login__input-section">
                    <input type="text" placeholder="Skriv brukernavn"
                           value={this.state.username}
                           onChange={(e:React.FormEvent<HTMLInputElement>)=>{
                               // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                               this.setState({username:e.target.value})}}
                           className="login__input"
                    />
                    <input type="text" placeholder="Skriv passord"
                           value={this.state.password}
                           onChange={(e:React.FormEvent<HTMLInputElement>)=>{
                               // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                               this.setState({password:e.target.value})}}
                           className="login__input"
                    />
                    </section>
                    <button type="submit"
                            onClick={(e)=>{this.submit(e)}}
                            className="login__submit"
                    >Logg inn</button>
                </form>
            </div>
        );
    }

}
