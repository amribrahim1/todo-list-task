import { Store } from 'redux'
import { AppDispatch } from '../index';
import { AuthedUserAction, TodoAction } from "../actions";

const logger:any = (store: Store) => (next:AppDispatch) => (action: AuthedUserAction|TodoAction) => {
    console.group(action.type)
        console.log('The action: ', action)
        const returnValue = next(action)
        console.log('The new state: ', store.getState())
    console.groupEnd()
    return returnValue
}
  
export default logger 