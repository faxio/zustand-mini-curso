import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { custonSessionStorage } from "../storages/session-storage.storage";
import { firebaseStorage } from "../storages/firebase-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}
interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) =>
    set({
      firstName: value,
    }),
  setLastName: (value: string) =>
    set({
      lastName: value,
    }),
});

export const usePersonStore = create<PersonState & Actions>()(
  /**
   * Persist: trabaja el localstorage automáticamente,
   * hay que especificar el nombre con el cuál se guardará
   *
   * storage: crear nuestra forma de persitencia
   */
  persist(storeAPi, {
    name: "person-storage",
    //storage: firebaseStorage,
  })
);
