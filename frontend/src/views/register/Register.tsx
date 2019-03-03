import * as React from "react";
import "./Register.scss";
import { UserApi } from "../../Api";
import { toast } from "react-toastify";

interface State {
  password: string;
  username: string;
  fullName: string;
}

interface Props {
  history: any
}

export class Register extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fullName: ""
    };
  }

  public submit(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    UserApi.register(this.state.username, this.state.password, this.state.fullName)
      .then(e => {
        toast("Bruker registrert", { autoClose: 2000 });
        this.props.history.push("/login");
      })
      .catch(err => {
        toast.error("Kunne ikke registrere bruker", { autoClose: 2000 });
      });
  }

  public render() {
    return (
      <div className="register__container">
        <h1 className="register__header">Registrer en ny bruker</h1>
        <form className="register__form">
          <section className="register__input-section">
            <input type="text" placeholder="Skriv fullt navn"
                   value={this.state.fullName}
                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
                     // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                     this.setState({ fullName: e.target.value });
                   }}
                   className="register__input"
            />
            <input type="text" placeholder="Skriv brukernavn"
                   value={this.state.username}
                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
                     // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                     this.setState({ username: e.target.value });
                   }}
                   className="register__input"
            />
            <input type="password" placeholder="Skriv passord"
                   value={this.state.password}
                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
                     // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                     this.setState({ password: e.target.value });
                   }}
                   className="register__input"
            />
          </section>
          <button type="submit"
                  onClick={(e) => {
                    this.submit(e);
                  }}
                  className="register__submit"
          >Registrer
          </button>
        </form>
      </div>
    );
  }

}
