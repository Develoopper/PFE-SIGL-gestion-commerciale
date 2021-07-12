import { slugify } from '../helpers/myFunctions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'caisse/set':
      return payload;
    case 'caisse/add':
      return { ...state, [payload.type]: state[payload.type] + payload.montant };
    case 'caisse/sub':
      return { ...state, [payload.type]: state[payload.type] - payload.montant };
    case 'caisse/transfert':
      const { transfert } = payload;
      const option = slugify(transfert.option)

      if (transfert.type === 'encaissement')
        return { 
          ...state,
          [option]: state[option] - transfert.montant,
          espece: state.espece + transfert.montant
        }
      else
        return { 
          ...state,
          espece: (
            transfert.type === 'transfert' ?
              state.espece - transfert.montant
            : 
              state.espece + transfert.montant
          )
        }
    default:
      return state;
  }
}