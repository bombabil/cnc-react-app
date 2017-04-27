/**
 * Created by Bombassd on 26.04.2017.
 */

const initState = {
    from: false,
    lvl: 30
}

export function menu(state = initState, action) {
    switch (action.type) {
        case 'SHOW_BUILDING_MENU':
            return {
                ...state,
                from: action.from
            }
        case 'HIDE_BUILDING_MENU':
            return {
                ...state,
                from: false
            }

        default:
            return state
    }
}