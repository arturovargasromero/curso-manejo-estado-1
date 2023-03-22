import React from "react";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
      value: "",
      active: false,
      confirmed: false,
    };
  }
  componentDidUpdate() {
    if (this.state.loading === true) {
      setTimeout(() => {
        this.state.value === SECURITY_CODE
          ? this.setState({ loading: false, error: false, active: true })
          : this.setState({ loading: false, error: true });
      }, 4000);
    }
  }
  render() {
    if (!this.state.active && !this.state.confirmed) {
      return (
        <div>
          <h2>Eliminar {this.props.name}</h2>
          <p>Por favor, escribe el codigo de seguridad </p>

          {this.state.error && !this.state.loading && (
            <p>Error: el código es incorrecto</p>
          )}
          {this.state.loading && <p>Cargando...</p>}

          <input
            disabled={this.state.loading}
            placeholder="Código de seguridad"
            value={this.state.value}
            onChange={(event) => {
              this.setState({ value: event.target.value });
            }}
          />
          <button
            disabled={this.state.loading}
            onClick={() =>
              this.setState((prevState) => ({ loading: !prevState.loading }))
            }
          >
            Comprobar
          </button>
        </div>
      );
    } else if (this.state.active && !this.state.confirmed) {
      return (
        <>
          <h2>Eliminar {this.props.name}</h2>
          <p>¿Seguro que quieres eliminar {this.props.name}?</p>
          <button onClick={() => this.setState({ confirmed: true })}>
            Confirmar
          </button>
          <button onClick={() => this.setState({ active: false, value: "" })}>
            Cancelar
          </button>
        </>
      );
    } else {
      return (
        <>
          <h2>{this.props.name} fue eliminado</h2>
          <button
            onClick={() =>
              this.setState({ active: false, confirmed: false, value: "" })
            }
          >
            Recuperar {this.props.name}
          </button>
        </>
      );
    }
  }
}
export { ClassState };
