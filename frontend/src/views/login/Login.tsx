import * as React from "react";
import "./Login.scss";
import { UserApi } from "../../Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface State {
  password: string;
  username: string;
}

interface Props {
  history: any,
}

export class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  public submit(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (this.state.username.length == 0 || this.state.password.length == 0) {
      toast.error("Skriv inn brukernavn og passord", { autoClose: 2000 });
    } else {
      UserApi.login(this.state.username, this.state.password).then(e => {
        toast("Logget inn", { autoClose: 2000 });
        this.props.history.push("/");
      })
        .catch(err => {
          toast.error("Kunne ikke logge inn", { autoClose: 2000 });
        });
    }
  }


  public render() {
    return (
      <div className="login__container">
        <h1 className="login__header">Logg deg inn</h1>
        <form className="login__form">
          <section className="login__input-section">
            <input type="text" placeholder="Skriv brukernavn"
                   value={this.state.username}
                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
                     // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                     this.setState({ username: e.target.value });
                   }}
                   className="login__input"
                   required
            />
            <input type="password" placeholder="Skriv passord"
                   value={this.state.password}

                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
                     // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                     this.setState({ password: e.target.value });
                   }}
                   className="login__input"
                   required
            />
          </section>
          <button type="submit"
                  onClick={(e) => {
                    this.submit(e);
                  }}
                  className="login__submit"
          >Logg inn
          </button>
        </form>

      </div>
    );
  }

}


