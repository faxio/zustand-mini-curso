import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBear />
        <PolarBear />
        <PandaBear />
        <BearDisplay />
      </div>
    </>
  );
};

export const BlackBear = () => {
  /**
   * Obtener blackBears del store
   */
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PolarBear = () => {
  const polarBear = useBearStore((state) => state.polarBears);
  const increasePolarBear = useBearStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBear(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBear} </span>
        <button onClick={() => increasePolarBear(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBear = () => {
  const pandaBear = useBearStore((state) => state.pandaBears);
  const increasePandaBear = useBearStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBear(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBear} </span>
        <button onClick={() => increasePandaBear(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearDisplay = () => {
  const doNothing = useBearStore((state) => state.doNothing);
  const addBears = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);
  /**
   * useShallow: No re renderizar un componente que no ha cambiado
   */
  const bears = useBearStore(useShallow((state) => state.bears));

  return (
    <WhiteCard>
      <button onClick={() => doNothing()}>Click</button>
      <button className="mt-2" onClick={() => addBears()}>
        Agregar Oso
      </button>
      <button className="mt-2" onClick={() => clearBears()}>
        Eliminar Osos
      </button>

      <h1>Osos</h1>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
