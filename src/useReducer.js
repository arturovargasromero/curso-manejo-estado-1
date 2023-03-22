import React from "react";

const SECURITY_CODE = "paradigma";

const UseReducer = ({ name }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onWrite = (event) => {
    dispatch({ type: actionTypes.write, payload: event.target.value });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
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
          onChange={onWrite}
        />
        <button disabled={state.loading} onClick={onCheck}>
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.active && !state.confirmed) {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>¿Seguro quieres eliminar {name}?</p>
        <button onClick={onDelete}>Confirmar</button>
        <button onClick={onReset}>Cancelar</button>
      </>
    );
  } else {
    return (
      <>
        <h2>{name} fue eliminado</h2>
        <button onClick={onReset}>Recuperar {name}</button>
      </>
    );
  }
};

const initialState = {
  value: "",
  error: false,
  loading: false,
  active: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  write: "WRITE",
  delete: "DELETE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    active: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    confirmed: true,
  },
  [actionTypes.reset]: {
    ...state,
    active: false,
    confirmed: false,
    value: "",
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { UseReducer };
