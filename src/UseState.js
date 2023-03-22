import React from "react";

const SECURITY_CODE = "paradigma";

const UseState = ({ name }) => {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    active: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      active: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      confirmed: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      active: false,
      confirmed: false,
      value: "",
    });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        state.value === SECURITY_CODE ? onConfirm() : onError();
      }, 4000);
    }
  }, [state.loading]);

  if (!state.active && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad </p>

        {state.error && !state.loading && <p>Error: el código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}

        <input
          disabled={state.loading}
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event) => onWrite(event.target.value)}
        />
        <button disabled={state.loading} onClick={() => onCheck()}>
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.active && !state.confirmed) {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>¿Seguro quieres eliminar {name}?</p>
        <button onClick={() => onDelete()}>Confirmar</button>
        <button onClick={() => onReset()}>Cancelar</button>
      </>
    );
  } else {
    return (
      <>
        <h2>{name} fue eliminado</h2>
        <button onClick={() => onReset()}>Recuperar {name}</button>
      </>
    );
  }
};

export { UseState };
