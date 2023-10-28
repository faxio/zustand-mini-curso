import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

/**
 * Definir como queremos que sea la store
 * debe tener blackBears, polarBears y pandaBears
 * Además definimos el método para manipular la store
 */
interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  totalBears: () => number;
  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

/**
 * Crear un estado básico para typescript
 *
 * Se agrega un paréntesis después de create para que sea llamado
 * y reconocido por typescript
 *
 * Agregamos BearState para que se reconozca el tipo de dato que estamos usando
 * Este store va a ser utilizado en 01-basic/BearPage.tsx
 *
 * get: obtener acceso al dato anterior
 */
export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,

      bears: [{ id: 1, name: "Oso #1" }],

      /**
   * Cada vez que se llama se ejecuta la función
   * Tiene un problema con el guardado en el storage
   * 
   *   computed: {
    get totalBears() {
      return (
        get().blackBears +
        get().pandaBears +
        get().polarBears +
        get().bears.length
      );
    },
  },
   */

      totalBears: () => {
        return (
          get().blackBears +
          get().pandaBears +
          get().polarBears +
          get().bears.length
        );
      },

      increaseBlackBears: (by: number) =>
        set((state) => ({
          blackBears: state.blackBears + by,
        })),

      increasePolarBears: (by: number) =>
        set((state) => ({
          polarBears: state.polarBears + by,
        })),

      increasePandaBears: (by: number) =>
        set((state) => ({
          pandaBears: state.pandaBears + by,
        })),

      doNothing: () =>
        set((state) => ({
          bears: [...state.bears],
        })),
      /**
       * Agregar nuevo oso al store
       * @returns bears state
       */
      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #${state.bears.length + 1}`,
            },
          ],
        })),
      clearBears: () =>
        set(() => ({
          bears: [],
        })),
    }),

    { name: "persist-bear" }
  )
);
